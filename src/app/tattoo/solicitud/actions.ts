"use server";

import { revalidatePath } from "next/cache";
import { getPanelDb } from "@/lib/tattoo/panel/db";
import {
	sendTattooRequestReceivedEmails,
	persistTattooEmailLogs,
} from "@/lib/tattoo/emails";
import type { AppointmentRequest } from "@/lib/tattoo/panel/types";

export type SolicitudFormState = {
	success?: boolean;
	error?: string;
};

export async function submitSolicitudAction(
	_prev: SolicitudFormState,
	formData: FormData
): Promise<SolicitudFormState> {
	const client_name = String(formData.get("client_name") ?? "").trim();
	const client_email = String(formData.get("client_email") ?? "").trim();
	const client_phone = String(formData.get("client_phone") ?? "").trim() || null;
	const client_instagram =
		String(formData.get("client_instagram") ?? "").trim() || null;
	const tattoo_idea = String(formData.get("tattoo_idea") ?? "").trim();
	const body_zone = String(formData.get("body_zone") ?? "").trim() || null;
	const size_estimate =
		String(formData.get("size_estimate") ?? "").trim() || null;
	const preferred_date_raw =
		String(formData.get("preferred_date") ?? "").trim() || null;
	const preferred_time_text =
		String(formData.get("preferred_time_text") ?? "").trim() || null;

	if (!client_name || !client_email || !tattoo_idea) {
		return { error: "Nombre, email e idea del tatuaje son obligatorios." };
	}

	let preferred_date: string | null = null;
	if (preferred_date_raw) {
		const parsed = new Date(preferred_date_raw);
		if (!Number.isNaN(parsed.getTime())) {
			preferred_date = parsed.toISOString();
		}
	}

	const supabase = getPanelDb();
	const { data: created, error } = await supabase
		.from("appointment_requests")
		.insert({
			client_name,
			client_email,
			client_phone,
			client_instagram,
			tattoo_idea,
			body_zone,
			size_estimate,
			preferred_date,
			preferred_time_text,
			status: "pending",
		})
		.select("*")
		.single();

	if (error || !created) {
		return { error: error?.message ?? "No se pudo guardar la solicitud." };
	}

	try {
		const emailResults = await sendTattooRequestReceivedEmails(
			created as AppointmentRequest
		);
		await persistTattooEmailLogs(emailResults, {
			appointment_request_id: created.id,
		});
	} catch (err) {
		console.error("[tattoo/solicitud] Error email o email_logs:", err);
	}

	revalidatePath("/tattoo/panel");
	revalidatePath("/tattoo/panel/solicitudes");

	return { success: true };
}
