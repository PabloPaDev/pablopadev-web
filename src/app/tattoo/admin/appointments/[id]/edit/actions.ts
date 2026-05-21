"use server";

import { revalidatePath } from "next/cache";
import { redirect } from "next/navigation";
import { createClient } from "@/lib/supabase/server";
import { sendTattooEmail, getTattooerEmail } from "@/lib/email/sendTattooEmail";
import {
	appointmentUpdatedClientHtml,
	appointmentUpdatedTattooerHtml,
	formatDateTime,
} from "@/lib/tattoo/emails";
import { unwrapSupabaseJoin } from "@/lib/tattoo/panel/format";

export type EditAppointmentState = {
	error?: string;
	success?: boolean;
};

export async function updateAppointmentAction(
	appointmentId: string,
	_prev: EditAppointmentState,
	formData: FormData
): Promise<EditAppointmentState> {
	const supabase = await createClient();

	const title = String(formData.get("title") ?? "").trim();
	const description = String(formData.get("description") ?? "").trim() || null;
	const starts_at = String(formData.get("starts_at") ?? "");
	const ends_at = String(formData.get("ends_at") ?? "");
	const status = String(formData.get("status") ?? "confirmed");
	const price_estimate = parseFloat(String(formData.get("price_estimate") ?? "")) || null;
	const deposit_paid = parseFloat(String(formData.get("deposit_paid") ?? "")) || null;

	if (!title || !starts_at || !ends_at) {
		return { error: "Título y fechas son obligatorios." };
	}

	const { data: appointment, error } = await supabase
		.from("appointments")
		.update({
			title,
			description,
			starts_at: new Date(starts_at).toISOString(),
			ends_at: new Date(ends_at).toISOString(),
			status,
			price_estimate,
			deposit_paid,
		})
		.eq("id", appointmentId)
		.select("*, clients(name, email)")
		.single();

	if (error || !appointment) {
		return { error: error?.message ?? "No se pudo actualizar" };
	}

	const client = unwrapSupabaseJoin(
		appointment.clients as
			| { name: string; email: string | null }
			| { name: string; email: string | null }[]
			| null
	);
	const startsFormatted = formatDateTime(appointment.starts_at);
	const logContext = {
		appointment_id: appointmentId,
		client_id: appointment.client_id,
	};
	const tattooerEmail = getTattooerEmail();

	await Promise.all([
		client?.email
			? sendTattooEmail({
					to: client.email,
					subject: "Tu cita ha sido actualizada",
					html: appointmentUpdatedClientHtml(
						client.name,
						title,
						startsFormatted
					),
					emailType: "appointment_updated_client",
					logContext,
				})
			: Promise.resolve(),
		tattooerEmail
			? sendTattooEmail({
					to: tattooerEmail,
					subject: `Cita actualizada: ${title}`,
					html: appointmentUpdatedTattooerHtml(title, startsFormatted),
					emailType: "appointment_updated_tattooer",
					logContext,
				})
			: Promise.resolve(),
	]);

	revalidatePath("/tattoo/admin/appointments");
	revalidatePath(`/tattoo/admin/appointments/${appointmentId}/edit`);

	redirect("/tattoo/admin/appointments");
}
