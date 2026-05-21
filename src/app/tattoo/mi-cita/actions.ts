"use server";

import { revalidatePath } from "next/cache";
import { getPanelDb } from "@/lib/tattoo/panel/db";
import { formatDateTime } from "@/lib/tattoo/panel/format";
import type { AppointmentRequest, Client } from "@/lib/tattoo/panel/types";
import { instagramMatches, normalizeInstagram } from "@/lib/tattoo/instagram";
import {
	sendTattooRequestReceivedEmails,
	persistTattooEmailLogs,
} from "@/lib/tattoo/emails";

export type MiCitaAppointment = {
	id: string;
	title: string;
	description: string | null;
	starts_at: string;
	ends_at: string;
	status: string;
	price_estimate: number | null;
};

export type LookupMiCitaState = {
	error?: string;
	clientName?: string;
	instagram?: string;
	appointments?: MiCitaAppointment[];
};

export type RequestChangeState = {
	error?: string;
	success?: boolean;
};

export async function lookupMiCitaByInstagramAction(
	_prev: LookupMiCitaState,
	formData: FormData
): Promise<LookupMiCitaState> {
	const instagramRaw = String(formData.get("instagram") ?? "").trim();
	if (!instagramRaw) {
		return { error: "Indica tu usuario de Instagram." };
	}

	const handle = normalizeInstagram(instagramRaw);
	if (!handle) {
		return { error: "Usuario de Instagram no válido." };
	}

	const supabase = getPanelDb();

	const { data: clients, error: clientsError } = await supabase
		.from("clients")
		.select("id, name, email, phone, instagram")
		.not("instagram", "is", null);

	if (clientsError) {
		return { error: clientsError.message };
	}

	const client = (clients ?? []).find((row) =>
		instagramMatches((row as Client).instagram, instagramRaw)
	) as Client | undefined;

	if (!client) {
		return {
			error: "No encontramos ninguna cita con ese Instagram. Comprueba el usuario o solicita una cita nueva.",
		};
	}

	const { data: appointments, error: appointmentsError } = await supabase
		.from("appointments")
		.select(
			"id, title, description, starts_at, ends_at, status, price_estimate"
		)
		.eq("client_id", client.id)
		.neq("status", "cancelled")
		.order("starts_at", { ascending: false });

	if (appointmentsError) {
		return { error: appointmentsError.message };
	}

	const list = (appointments ?? []) as MiCitaAppointment[];

	if (list.length === 0) {
		return {
			error: "No tienes citas activas asociadas a ese Instagram.",
		};
	}

	return {
		clientName: client.name,
		instagram: client.instagram ?? `@${handle}`,
		appointments: list,
	};
}

export async function requestAppointmentChangeAction(
	_prev: RequestChangeState,
	formData: FormData
): Promise<RequestChangeState> {
	const appointmentId = String(formData.get("appointment_id") ?? "").trim();
	const instagramRaw = String(formData.get("instagram") ?? "").trim();
	const message = String(formData.get("message") ?? "").trim();
	const newDateRaw = String(formData.get("preferred_new_date") ?? "").trim();

	if (!appointmentId || !instagramRaw) {
		return { error: "Faltan datos de la cita." };
	}

	if (!message && !newDateRaw) {
		return {
			error: "Indica una nueva fecha propuesta o describe el cambio que necesitas.",
		};
	}

	let preferredNewDate: string | null = null;
	if (newDateRaw) {
		const parsed = new Date(newDateRaw);
		if (Number.isNaN(parsed.getTime())) {
			return { error: "Nueva fecha no válida." };
		}
		preferredNewDate = parsed.toISOString();
	}

	const supabase = getPanelDb();

	const { data: appointment, error: appointmentError } = await supabase
		.from("appointments")
		.select(
			"id, title, starts_at, ends_at, status, client_id, clients(name, email, phone, instagram)"
		)
		.eq("id", appointmentId)
		.single();

	if (appointmentError || !appointment) {
		return { error: "Cita no encontrada." };
	}

	if (appointment.status === "cancelled") {
		return { error: "Esta cita está cancelada." };
	}

	const client = appointment.clients as Client | null;
	if (!client || !instagramMatches(client.instagram, instagramRaw)) {
		return { error: "Instagram no coincide con esta cita." };
	}

	if (!client.email?.trim()) {
		return {
			error: "No tenemos un email asociado a tu ficha. Contacta con el estudio.",
		};
	}

	const startsFormatted = formatDateTime(appointment.starts_at);
	const newDateFormatted = preferredNewDate
		? formatDateTime(preferredNewDate)
		: null;
	const tattooIdeaParts = [
		"[Solicitud de cambio de cita]",
		`Cita actual: ${appointment.title} — ${startsFormatted}`,
	];
	if (newDateFormatted) {
		tattooIdeaParts.push(`Nueva fecha propuesta: ${newDateFormatted}`);
	}
	if (message) {
		tattooIdeaParts.push(`Mensaje: ${message}`);
	}
	const tattooIdea = tattooIdeaParts.join("\n");

	const { data: created, error: insertError } = await supabase
		.from("appointment_requests")
		.insert({
			client_name: client.name,
			client_email: client.email ?? "",
			client_phone: client.phone,
			client_instagram: client.instagram,
			tattoo_idea: tattooIdea,
			body_zone: "Cambio de cita existente",
			size_estimate: null,
			preferred_date: preferredNewDate ?? appointment.starts_at,
			preferred_time_text:
				message ||
				(newDateFormatted ? `Nueva fecha: ${newDateFormatted}` : null),
			status: "pending",
			internal_notes: `Cambio solicitado para appointment_id: ${appointment.id}`,
		})
		.select("*")
		.single();

	if (insertError || !created) {
		return { error: insertError?.message ?? "No se pudo enviar la solicitud." };
	}

	try {
		const emailResults = await sendTattooRequestReceivedEmails(
			created as AppointmentRequest
		);
		await persistTattooEmailLogs(emailResults, {
			appointment_request_id: created.id,
			appointment_id: appointment.id,
			client_id: client.id,
		});
	} catch (err) {
		console.error("[tattoo/mi-cita] Error email solicitud de cambio:", err);
	}

	revalidatePath("/tattoo/panel/solicitudes");
	revalidatePath("/tattoo/panel");

	return { success: true };
}
