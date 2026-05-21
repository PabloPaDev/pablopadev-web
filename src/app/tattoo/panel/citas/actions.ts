"use server";

import { revalidatePath } from "next/cache";
import { getPanelDb } from "@/lib/tattoo/panel/db";
import type { Client } from "@/lib/tattoo/panel/types";
import {
	sendTattooManualAppointmentCreatedEmails,
	sendTattooAppointmentUpdatedEmails,
	sendTattooAppointmentCancelledEmails,
	persistTattooEmailLogs,
} from "@/lib/tattoo/emails";
import {
	createTattooCalendarEvent,
	deleteTattooCalendarEvent,
} from "@/lib/tattoo/googleCalendar";
import { unwrapSupabaseJoin } from "@/lib/tattoo/panel/format";

type ClientContactRow = {
	name: string;
	email: string | null;
	phone: string | null;
};

/** Mismo status que al aceptar una solicitud (appointments). */
const NEW_APPOINTMENT_STATUS = "confirmed";

const MANUAL_CALENDAR_REQUEST_ID = "manual";

export type CreateManualAppointmentState = {
	error?: string;
	success?: boolean;
};

export type UpdatePanelAppointmentState = {
	error?: string;
	success?: boolean;
	appointment?: {
		title: string;
		description: string | null;
		starts_at: string;
		ends_at: string;
		status: string;
		price_estimate: number | null;
		deposit_paid: boolean;
	};
};

export async function createManualAppointmentAction(
	_prev: CreateManualAppointmentState,
	formData: FormData
): Promise<CreateManualAppointmentState> {
	const clientId = String(formData.get("client_id") ?? "").trim();
	const title = String(formData.get("title") ?? "").trim();
	const description =
		String(formData.get("description") ?? "").trim() || null;
	const startsAtRaw = String(formData.get("starts_at") ?? "");
	const endsAtRaw = String(formData.get("ends_at") ?? "");
	const priceRaw = String(formData.get("price_estimate") ?? "").trim();
	const depositPaid = formData.get("deposit_paid") === "on";

	if (!clientId || !title || !startsAtRaw || !endsAtRaw) {
		return { error: "Cliente, título y fechas son obligatorios." };
	}

	const startsAt = new Date(startsAtRaw);
	const endsAt = new Date(endsAtRaw);
	if (Number.isNaN(startsAt.getTime()) || Number.isNaN(endsAt.getTime())) {
		return { error: "Fechas no válidas." };
	}

	if (endsAt.getTime() <= startsAt.getTime()) {
		return { error: "La hora de fin debe ser posterior al inicio." };
	}

	const priceEstimate = priceRaw ? parseFloat(priceRaw) : null;
	const supabase = getPanelDb();

	const { data: client, error: clientError } = await supabase
		.from("clients")
		.select("id, name, email, phone, instagram")
		.eq("id", clientId)
		.single();

	if (clientError || !client) {
		return { error: clientError?.message ?? "Cliente no encontrado." };
	}

	const row = client as Pick<
		Client,
		"id" | "name" | "email" | "phone" | "instagram"
	>;

	const { data: appointment, error: appointmentError } = await supabase
		.from("appointments")
		.insert({
			client_id: row.id,
			title,
			description,
			starts_at: startsAt.toISOString(),
			ends_at: endsAt.toISOString(),
			status: NEW_APPOINTMENT_STATUS,
			price_estimate: Number.isNaN(priceEstimate as number)
				? null
				: priceEstimate,
			deposit_paid: depositPaid,
			created_from_request_id: null,
			updated_at: new Date().toISOString(),
		})
		.select("id, title, description, starts_at, ends_at, price_estimate")
		.single();

	if (appointmentError || !appointment) {
		return {
			error: appointmentError?.message ?? "No se pudo crear la cita.",
		};
	}

	try {
		const emailResults = await sendTattooManualAppointmentCreatedEmails({
			client: row,
			appointment,
		});
		await persistTattooEmailLogs(emailResults, {
			appointment_id: appointment.id,
			client_id: row.id,
		});
	} catch (err) {
		console.error("[tattoo/panel] Error email cita manual o email_logs:", err);
	}

	try {
		const calendarResult = await createTattooCalendarEvent({
			request: {
				id: MANUAL_CALENDAR_REQUEST_ID,
				tattoo_idea: title,
				body_zone: null,
				size_estimate: null,
				client_instagram: row.instagram,
			},
			client: {
				name: row.name,
				email: row.email,
				phone: row.phone,
				instagram: row.instagram,
			},
			appointment: {
				id: appointment.id,
				title,
				starts_at: appointment.starts_at,
				ends_at: appointment.ends_at,
				price_estimate: appointment.price_estimate,
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
					"[tattoo/panel] Google Calendar eventId guardado (cita manual):",
					calendarResult.eventId
				);
				if (calendarResult.htmlLink) {
					console.log(
						"[tattoo/panel] Google Calendar htmlLink (cita manual):",
						calendarResult.htmlLink
					);
				}
			}
		} else if (!calendarResult.success) {
			console.error(
				"[tattoo/panel] Google Calendar falló (cita manual sí creada):",
				calendarResult.error
			);
		}
	} catch (err) {
		console.error(
			"[tattoo/panel] Google Calendar excepción (cita manual sí creada):",
			err instanceof Error ? err.message : err
		);
	}

	revalidatePath("/tattoo/panel/citas");
	revalidatePath("/tattoo/panel");

	return { success: true };
}

export async function updatePanelAppointmentAction(
	appointmentId: string,
	_prev: UpdatePanelAppointmentState,
	formData: FormData
): Promise<UpdatePanelAppointmentState> {
	const title = String(formData.get("title") ?? "").trim();
	const description =
		String(formData.get("description") ?? "").trim() || null;
	const startsAtRaw = String(formData.get("starts_at") ?? "");
	const endsAtRaw = String(formData.get("ends_at") ?? "");
	const status = String(formData.get("status") ?? "confirmed").trim();
	const priceRaw = String(formData.get("price_estimate") ?? "").trim();
	const depositPaid = formData.get("deposit_paid") === "on";

	if (!title || !startsAtRaw || !endsAtRaw) {
		return { error: "Título y fechas son obligatorios." };
	}

	const startsAt = new Date(startsAtRaw);
	const endsAt = new Date(endsAtRaw);
	if (Number.isNaN(startsAt.getTime()) || Number.isNaN(endsAt.getTime())) {
		return { error: "Fechas no válidas." };
	}

	if (endsAt.getTime() <= startsAt.getTime()) {
		return { error: "La hora de fin debe ser posterior al inicio." };
	}

	const priceEstimate = priceRaw ? parseFloat(priceRaw) : null;

	const supabase = getPanelDb();

	const { data: existing, error: fetchError } = await supabase
		.from("appointments")
		.select("id, client_id, clients(name, email, phone)")
		.eq("id", appointmentId)
		.single();

	if (fetchError || !existing) {
		return { error: fetchError?.message ?? "Cita no encontrada." };
	}

	const clientRow = unwrapSupabaseJoin(
		existing.clients as ClientContactRow | ClientContactRow[] | null
	);

	const { error } = await supabase
		.from("appointments")
		.update({
			title,
			description,
			starts_at: startsAt.toISOString(),
			ends_at: endsAt.toISOString(),
			status,
			price_estimate: Number.isNaN(priceEstimate as number)
				? null
				: priceEstimate,
			deposit_paid: depositPaid,
			updated_at: new Date().toISOString(),
		})
		.eq("id", appointmentId);

	if (error) {
		return { error: error.message };
	}

	const appointmentPayload = {
		id: appointmentId,
		title,
		description,
		starts_at: startsAt.toISOString(),
		ends_at: endsAt.toISOString(),
		status,
		price_estimate: Number.isNaN(priceEstimate as number)
			? null
			: priceEstimate,
	};

	if (clientRow) {
		try {
			const emailResults =
				status === "cancelled"
					? await sendTattooAppointmentCancelledEmails({
							client: {
								id: existing.client_id,
								name: clientRow.name,
								email: clientRow.email,
								phone: clientRow.phone,
							},
							appointment: appointmentPayload,
						})
					: await sendTattooAppointmentUpdatedEmails({
							client: {
								id: existing.client_id,
								name: clientRow.name,
								email: clientRow.email,
								phone: clientRow.phone,
							},
							appointment: appointmentPayload,
						});
			await persistTattooEmailLogs(emailResults, {
				appointment_id: appointmentId,
				client_id: existing.client_id,
			});
		} catch (err) {
			console.error("[tattoo/panel] Error email actualizar cita:", err);
		}
	}

	revalidatePath("/tattoo/panel/citas");
	revalidatePath("/tattoo/panel");
	revalidatePath("/tattoo/panel/solicitudes");

	return {
		success: true,
		appointment: {
			title,
			description,
			starts_at: startsAt.toISOString(),
			ends_at: endsAt.toISOString(),
			status,
			price_estimate: Number.isNaN(priceEstimate as number)
				? null
				: priceEstimate,
			deposit_paid: depositPaid,
		},
	};
}

export type CancelPanelAppointmentState = {
	error?: string;
	success?: boolean;
};

export async function cancelPanelAppointmentAction(
	appointmentId: string
): Promise<CancelPanelAppointmentState> {
	if (!appointmentId) {
		return { error: "Cita no válida." };
	}

	const supabase = getPanelDb();

	const { data: appointment, error: fetchError } = await supabase
		.from("appointments")
		.select(
			"id, status, google_calendar_event_id, title, starts_at, ends_at, client_id, clients(name, email, phone)"
		)
		.eq("id", appointmentId)
		.single();

	if (fetchError || !appointment) {
		return { error: fetchError?.message ?? "Cita no encontrada." };
	}

	if (appointment.status === "cancelled") {
		return { success: true };
	}

	if (appointment.status === "completed") {
		return { error: "No se puede cancelar una cita ya completada." };
	}

	const { error: updateError } = await supabase
		.from("appointments")
		.update({
			status: "cancelled",
			updated_at: new Date().toISOString(),
		})
		.eq("id", appointmentId);

	if (updateError) {
		return { error: updateError.message };
	}

	const clientRow = unwrapSupabaseJoin(
		appointment.clients as ClientContactRow | ClientContactRow[] | null
	);

	if (clientRow) {
		try {
			const emailResults = await sendTattooAppointmentCancelledEmails({
				client: {
					id: appointment.client_id,
					name: clientRow.name,
					email: clientRow.email,
					phone: clientRow.phone,
				},
				appointment: {
					id: appointment.id,
					title: appointment.title,
					starts_at: appointment.starts_at,
					ends_at: appointment.ends_at,
				},
			});
			await persistTattooEmailLogs(emailResults, {
				appointment_id: appointmentId,
				client_id: appointment.client_id,
			});
		} catch (err) {
			console.error("[tattoo/panel] Error email cancelar cita:", err);
		}
	}

	const eventId = appointment.google_calendar_event_id;
	if (eventId) {
		try {
			const deleted = await deleteTattooCalendarEvent(eventId);
			if (!deleted.success) {
				console.error(
					"[tattoo/panel] Google Calendar (cancelar):",
					deleted.error
				);
			} else {
				const { error: clearError } = await supabase
					.from("appointments")
					.update({
						google_calendar_event_id: null,
						updated_at: new Date().toISOString(),
					})
					.eq("id", appointmentId);
				if (clearError) {
					console.error(
						"[tattoo/panel] No se pudo limpiar google_calendar_event_id:",
						clearError.message
					);
				}
			}
		} catch (err) {
			console.error("[tattoo/panel] Google Calendar (cancelar):", err);
		}
	}

	revalidatePath("/tattoo/panel/citas");
	revalidatePath("/tattoo/panel");

	return { success: true };
}

export type DeletePanelAppointmentState = {
	error?: string;
	success?: boolean;
};

export async function deletePanelAppointmentAction(
	appointmentId: string
): Promise<DeletePanelAppointmentState> {
	if (!appointmentId) {
		return { error: "Cita no válida." };
	}

	const supabase = getPanelDb();

	const { data: appointment, error: fetchError } = await supabase
		.from("appointments")
		.select("id, status")
		.eq("id", appointmentId)
		.single();

	if (fetchError || !appointment) {
		return { error: fetchError?.message ?? "Cita no encontrada." };
	}

	if (appointment.status !== "cancelled") {
		return { error: "Solo se pueden borrar citas canceladas." };
	}

	await supabase
		.from("appointment_requests")
		.update({
			created_appointment_id: null,
			updated_at: new Date().toISOString(),
		})
		.eq("created_appointment_id", appointmentId);

	const { error: deleteError } = await supabase
		.from("appointments")
		.delete()
		.eq("id", appointmentId);

	if (deleteError) {
		return { error: deleteError.message };
	}

	revalidatePath("/tattoo/panel/citas");
	revalidatePath("/tattoo/panel");

	return { success: true };
}
