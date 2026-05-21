"use server";

import { revalidatePath } from "next/cache";
import { getPanelDb } from "@/lib/tattoo/panel/db";
import { buildAppointmentDescription } from "@/lib/tattoo/panel/format";
import {
	FIRST_CONTACT_APPOINTMENT_TITLE,
	FIRST_CONTACT_SUBTITLE,
} from "@/lib/tattoo/panel/first-contact";
import type { AppointmentRequest } from "@/lib/tattoo/panel/types";
import { addHours } from "@/lib/tattoo/utils";
import {
	sendTattooAppointmentConfirmedEmails,
	sendTattooAppointmentRejectedEmails,
	persistTattooEmailLogs,
} from "@/lib/tattoo/emails";
import { createTattooCalendarEvent } from "@/lib/tattoo/googleCalendar";

/** Duración por defecto de la primera cita (reunión de proyecto). */
const FIRST_APPOINTMENT_DURATION_HOURS = 1;

export type ConfirmRequestState = { error?: string; success?: boolean };
export type RejectRequestState = { error?: string; success?: boolean };

async function findOrCreatePanelClient(
	supabase: ReturnType<typeof getPanelDb>,
	req: AppointmentRequest
): Promise<{ id: string } | { error: string }> {
	const email = req.client_email.trim();
	if (email) {
		const { data: existing, error: lookupError } = await supabase
			.from("clients")
			.select("id, name, phone, instagram")
			.eq("email", email)
			.maybeSingle();

		if (lookupError) {
			return { error: lookupError.message };
		}

		if (existing) {
			const updates: Record<string, string> = {};
			if (!existing.phone?.trim() && req.client_phone?.trim()) {
				updates.phone = req.client_phone.trim();
			}
			if (!existing.instagram?.trim() && req.client_instagram?.trim()) {
				updates.instagram = req.client_instagram.trim();
			}
			if (!existing.name?.trim() && req.client_name.trim()) {
				updates.name = req.client_name.trim();
			}
			if (Object.keys(updates).length > 0) {
				updates.updated_at = new Date().toISOString();
				const { error: updateError } = await supabase
					.from("clients")
					.update(updates)
					.eq("id", existing.id);
				if (updateError) {
					console.error(
						"[tattoo/panel] No se pudieron actualizar datos del cliente:",
						updateError.message
					);
				}
			}
			return { id: existing.id };
		}
	}

	const { data: created, error: insertError } = await supabase
		.from("clients")
		.insert({
			name: req.client_name,
			email: req.client_email,
			phone: req.client_phone,
			instagram: req.client_instagram,
		})
		.select("id")
		.single();

	if (insertError || !created) {
		return {
			error: insertError?.message ?? "No se pudo crear el cliente.",
		};
	}

	return { id: created.id };
}

export async function confirmAppointmentRequestAction(
	_prev: ConfirmRequestState,
	formData: FormData
): Promise<ConfirmRequestState> {
	const requestId = String(formData.get("request_id") ?? "");
	const startsAtRaw = String(formData.get("starts_at") ?? "");
	const priceRaw = String(formData.get("price_estimate") ?? "").trim();
	const internalNotes =
		String(formData.get("internal_notes") ?? "").trim() || null;

	if (!requestId || !startsAtRaw) {
		return { error: "Indica la fecha y hora de la primera cita." };
	}

	const startsAt = new Date(startsAtRaw);
	if (Number.isNaN(startsAt.getTime())) {
		return { error: "Fecha u hora no válidas." };
	}

	const endsAtIso = addHours(
		startsAt.toISOString(),
		FIRST_APPOINTMENT_DURATION_HOURS
	);

	const supabase = getPanelDb();

	const { data: request, error: fetchError } = await supabase
		.from("appointment_requests")
		.select("*")
		.eq("id", requestId)
		.single();

	if (fetchError || !request) {
		return { error: fetchError?.message ?? "Solicitud no encontrada." };
	}

	const req = request as AppointmentRequest;

	if (req.status !== "pending") {
		return { error: "Solo se pueden confirmar solicitudes pendientes." };
	}

	const clientResult = await findOrCreatePanelClient(supabase, req);
	if ("error" in clientResult) {
		return { error: clientResult.error };
	}
	const client = { id: clientResult.id };

	const priceEstimate = priceRaw ? parseFloat(priceRaw) : null;

	const { data: appointment, error: appointmentError } = await supabase
		.from("appointments")
		.insert({
			client_id: client.id,
			title: FIRST_CONTACT_APPOINTMENT_TITLE,
			description: [
				FIRST_CONTACT_SUBTITLE,
				req.tattoo_idea ? `Idea: ${req.tattoo_idea}` : null,
				buildAppointmentDescription(req),
			]
				.filter(Boolean)
				.join("\n"),
			starts_at: startsAt.toISOString(),
			ends_at: endsAtIso,
			status: "confirmed",
			price_estimate: Number.isNaN(priceEstimate as number)
				? null
				: priceEstimate,
			deposit_paid: false,
			created_from_request_id: req.id,
		})
		.select("id")
		.single();

	if (appointmentError || !appointment) {
		return {
			error: appointmentError?.message ?? "No se pudo crear la cita.",
		};
	}

	const { error: updateError } = await supabase
		.from("appointment_requests")
		.update({
			status: "accepted",
			created_client_id: client.id,
			created_appointment_id: appointment.id,
			internal_notes: internalNotes,
			updated_at: new Date().toISOString(),
		})
		.eq("id", requestId);

	if (updateError) {
		return { error: updateError.message };
	}

	try {
		const emailResults = await sendTattooAppointmentConfirmedEmails({
			request: {
				...req,
				status: "accepted",
				internal_notes: internalNotes,
				created_client_id: client.id,
				created_appointment_id: appointment.id,
			},
			client: {
				id: client.id,
				name: req.client_name,
				email: req.client_email,
				phone: req.client_phone,
			},
			appointment: {
				id: appointment.id,
				title: req.tattoo_idea,
				starts_at: startsAt.toISOString(),
				ends_at: endsAtIso,
				price_estimate: Number.isNaN(priceEstimate as number)
					? null
					: priceEstimate,
			},
		});
		await persistTattooEmailLogs(emailResults, {
			appointment_request_id: requestId,
			appointment_id: appointment.id,
			client_id: client.id,
		});
	} catch (err) {
		console.error("[tattoo/panel] Error email o email_logs:", err);
	}

	try {
		const calendarResult = await createTattooCalendarEvent({
			request: {
				id: req.id,
				tattoo_idea: req.tattoo_idea,
				body_zone: req.body_zone,
				size_estimate: req.size_estimate,
				client_instagram: req.client_instagram,
			},
			client: {
				name: req.client_name,
				email: req.client_email,
				phone: req.client_phone,
				instagram: req.client_instagram,
			},
			appointment: {
				id: appointment.id,
				title: FIRST_CONTACT_APPOINTMENT_TITLE,
				starts_at: startsAt.toISOString(),
				ends_at: endsAtIso,
				price_estimate: Number.isNaN(priceEstimate as number)
					? null
					: priceEstimate,
			},
		});

		if (calendarResult.success && calendarResult.eventId) {
			const { error: calendarUpdateError } = await supabase
				.from("appointments")
				.update({
					google_calendar_event_id: calendarResult.eventId,
					updated_at: new Date().toISOString(),
				})
				.eq("id", appointment.id);

			if (calendarUpdateError) {
				console.error(
					"[tattoo/panel] No se pudo guardar google_calendar_event_id:",
					calendarUpdateError.message
				);
			} else {
				console.log(
					"[tattoo/panel] Google Calendar eventId guardado:",
					calendarResult.eventId
				);
				if (calendarResult.htmlLink) {
					console.log(
						"[tattoo/panel] Google Calendar htmlLink:",
						calendarResult.htmlLink
					);
				}
			}
		} else if (!calendarResult.success) {
			console.error(
				"[tattoo/panel] Google Calendar falló (la cita sí se creó):",
				calendarResult.error
			);
		}
	} catch (err) {
		console.error(
			"[tattoo/panel] Google Calendar excepción (la cita sí se creó):",
			err instanceof Error ? err.message : err
		);
	}

	revalidatePath("/tattoo/panel/solicitudes");
	revalidatePath("/tattoo/panel/citas");
	revalidatePath("/tattoo/panel/clientes");
	revalidatePath("/tattoo/panel");

	return { success: true };
}

export async function rejectAppointmentRequestAction(
	_prev: RejectRequestState,
	formData: FormData
): Promise<RejectRequestState> {
	const requestId = String(formData.get("request_id") ?? "");
	const rejectionReason =
		String(formData.get("rejection_reason") ?? "").trim() ||
		String(formData.get("internal_notes") ?? "").trim() ||
		null;

	if (!requestId) {
		return { error: "Falta el identificador de la solicitud." };
	}

	const supabase = getPanelDb();

	const { data: request, error: fetchError } = await supabase
		.from("appointment_requests")
		.select("*")
		.eq("id", requestId)
		.single();

	if (fetchError || !request) {
		return { error: fetchError?.message ?? "Solicitud no encontrada." };
	}

	const req = request as AppointmentRequest;

	if (req.status !== "pending") {
		return { error: "Solo se pueden rechazar solicitudes pendientes." };
	}

	const { error: updateError } = await supabase
		.from("appointment_requests")
		.update({
			status: "rejected",
			internal_notes: rejectionReason,
			updated_at: new Date().toISOString(),
		})
		.eq("id", requestId);

	if (updateError) {
		return { error: updateError.message };
	}

	try {
		const emailResults = await sendTattooAppointmentRejectedEmails({
			request: {
				...req,
				status: "rejected",
				internal_notes: rejectionReason,
			},
			reason: rejectionReason,
		});
		await persistTattooEmailLogs(emailResults, {
			appointment_request_id: requestId,
		});
	} catch (err) {
		console.error("[tattoo/panel] Error email rechazo o email_logs:", err);
	}

	revalidatePath("/tattoo/panel/solicitudes");
	revalidatePath("/tattoo/panel");

	return { success: true };
}
