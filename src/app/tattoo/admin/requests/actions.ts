"use server";

import { revalidatePath } from "next/cache";
import { createClient } from "@/lib/supabase/server";
import { sendTattooEmail, getTattooerEmail } from "@/lib/email/sendTattooEmail";
import {
	requestAcceptedClientHtml,
	requestAcceptedTattooerHtml,
	requestRejectedClientHtml,
	requestNeedsInfoClientHtml,
	formatDateTime,
} from "@/lib/tattoo/emails";
import {
	buildAppointmentDescription,
	resolveStartsAt,
	addHours,
} from "@/lib/tattoo/utils";
import type { AppointmentRequest } from "@/lib/tattoo/types";

async function findOrCreateClient(
	supabase: Awaited<ReturnType<typeof createClient>>,
	request: AppointmentRequest
) {
	if (request.client_email) {
		const { data: byEmail } = await supabase
			.from("clients")
			.select("id")
			.eq("email", request.client_email)
			.maybeSingle();
		if (byEmail) return byEmail.id;
	}

	if (request.client_instagram) {
		const { data: byIg } = await supabase
			.from("clients")
			.select("id")
			.eq("instagram", request.client_instagram)
			.maybeSingle();
		if (byIg) return byIg.id;
	}

	const { data: created, error } = await supabase
		.from("clients")
		.insert({
			name: request.client_name,
			email: request.client_email,
			phone: request.client_phone,
			instagram: request.client_instagram,
		})
		.select("id")
		.single();

	if (error || !created) {
		throw new Error(error?.message ?? "No se pudo crear el cliente");
	}

	return created.id;
}

export async function acceptRequestAction(requestId: string) {
	const supabase = await createClient();

	const { data: request, error } = await supabase
		.from("appointment_requests")
		.select("*")
		.eq("id", requestId)
		.single();

	if (error || !request) {
		return { error: "Solicitud no encontrada" };
	}

	const clientId = await findOrCreateClient(supabase, request as AppointmentRequest);
	const startsAt = resolveStartsAt(request.preferred_date);
	const endsAt = addHours(startsAt, 2);

	const { data: appointment, error: aptError } = await supabase
		.from("appointments")
		.insert({
			client_id: clientId,
			title: request.tattoo_idea,
			description: buildAppointmentDescription(request),
			starts_at: startsAt,
			ends_at: endsAt,
			status: "confirmed",
			created_from_request_id: request.id,
		})
		.select("id")
		.single();

	if (aptError || !appointment) {
		return { error: aptError?.message ?? "No se pudo crear la cita" };
	}

	await supabase
		.from("appointment_requests")
		.update({
			status: "accepted",
			created_client_id: clientId,
			created_appointment_id: appointment.id,
		})
		.eq("id", requestId);

	const startsFormatted = formatDateTime(startsAt);
	const logContext = {
		appointment_request_id: requestId,
		appointment_id: appointment.id,
		client_id: clientId,
	};
	const tattooerEmail = getTattooerEmail();

	await Promise.all([
		sendTattooEmail({
			to: request.client_email,
			subject: "Tu cita ha sido confirmada",
			html: requestAcceptedClientHtml(request.client_name, startsFormatted),
			emailType: "request_accepted_client",
			logContext,
		}),
		tattooerEmail
			? sendTattooEmail({
					to: tattooerEmail,
					subject: `Cita confirmada: ${request.client_name}`,
					html: requestAcceptedTattooerHtml(
						request.client_name,
						startsFormatted
					),
					emailType: "request_accepted_tattooer",
					logContext,
				})
			: Promise.resolve(),
	]);

	revalidatePath("/tattoo/admin");
	revalidatePath("/tattoo/admin/requests");
	return { success: true };
}

export async function rejectRequestAction(requestId: string) {
	const supabase = await createClient();

	const { data: request } = await supabase
		.from("appointment_requests")
		.select("client_name, client_email")
		.eq("id", requestId)
		.single();

	await supabase
		.from("appointment_requests")
		.update({ status: "rejected" })
		.eq("id", requestId);

	if (request?.client_email) {
		await sendTattooEmail({
			to: request.client_email,
			subject: "Sobre tu solicitud de cita",
			html: requestRejectedClientHtml(request.client_name),
			emailType: "request_rejected_client",
			logContext: { appointment_request_id: requestId },
		});
	}

	revalidatePath("/tattoo/admin/requests");
	return { success: true };
}

export async function needsMoreInfoRequestAction(requestId: string) {
	const supabase = await createClient();

	const { data: request } = await supabase
		.from("appointment_requests")
		.select("client_name, client_email")
		.eq("id", requestId)
		.single();

	await supabase
		.from("appointment_requests")
		.update({ status: "needs_more_info" })
		.eq("id", requestId);

	if (request?.client_email) {
		await sendTattooEmail({
			to: request.client_email,
			subject: "Necesitamos más información sobre tu solicitud",
			html: requestNeedsInfoClientHtml(request.client_name),
			emailType: "request_needs_info_client",
			logContext: { appointment_request_id: requestId },
		});
	}

	revalidatePath("/tattoo/admin/requests");
	return { success: true };
}
