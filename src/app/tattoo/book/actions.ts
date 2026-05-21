"use server";

import { revalidatePath } from "next/cache";
import { createClient } from "@/lib/supabase/server";
import { sendTattooEmail, getTattooerEmail } from "@/lib/email/sendTattooEmail";
import {
	requestReceivedClientHtml,
	requestReceivedTattooerHtml,
} from "@/lib/tattoo/emails";

export type BookFormState = {
	success?: boolean;
	error?: string;
};

export async function submitBookingRequest(
	_prev: BookFormState,
	formData: FormData
): Promise<BookFormState> {
	const client_name = String(formData.get("client_name") ?? "").trim();
	const client_email = String(formData.get("client_email") ?? "").trim();
	const client_phone = String(formData.get("client_phone") ?? "").trim() || null;
	const client_instagram =
		String(formData.get("client_instagram") ?? "").trim() || null;
	const tattoo_idea = String(formData.get("tattoo_idea") ?? "").trim();
	const body_zone = String(formData.get("body_zone") ?? "").trim() || null;
	const size_estimate =
		String(formData.get("size_estimate") ?? "").trim() || null;
	const preferred_date =
		String(formData.get("preferred_date") ?? "").trim() || null;
	const preferred_time_text =
		String(formData.get("preferred_time_text") ?? "").trim() || null;

	if (!client_name || !client_email || !tattoo_idea) {
		return { error: "Nombre, email e idea del tatuaje son obligatorios." };
	}

	const supabase = await createClient();

	const { data, error } = await supabase
		.from("appointment_requests")
		.insert({
			client_name,
			client_email,
			client_phone,
			client_instagram,
			tattoo_idea,
			body_zone,
			size_estimate,
			preferred_date: preferred_date || null,
			preferred_time_text,
			status: "pending",
		})
		.select("id, client_name, client_email, tattoo_idea, body_zone, preferred_date")
		.single();

	if (error || !data) {
		return { error: error?.message ?? "No se pudo guardar la solicitud." };
	}

	const logContext = { appointment_request_id: data.id };
	const tattooerEmail = getTattooerEmail();

	await Promise.all([
		sendTattooEmail({
			to: client_email,
			subject: "Hemos recibido tu solicitud de cita",
			html: requestReceivedClientHtml(client_name),
			emailType: "request_received_client",
			logContext,
		}),
		tattooerEmail
			? sendTattooEmail({
					to: tattooerEmail,
					subject: `Nueva solicitud de ${client_name}`,
					html: requestReceivedTattooerHtml(data),
					emailType: "request_received_tattooer",
					logContext,
				})
			: Promise.resolve(),
	]);

	revalidatePath("/tattoo/admin");
	return { success: true };
}
