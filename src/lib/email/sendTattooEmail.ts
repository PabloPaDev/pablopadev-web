import { Resend } from "resend";
import { createAdminClient } from "@/lib/supabase/admin";

export type TattooEmailLogContext = {
	appointment_request_id?: string;
	appointment_id?: string;
	client_id?: string;
};

export type SendTattooEmailParams = {
	to: string;
	subject: string;
	html: string;
	emailType: string;
	logContext?: TattooEmailLogContext;
};

async function logEmail(
	params: SendTattooEmailParams & {
		status: "sent" | "failed";
		error_message?: string;
	}
) {
	try {
		const admin = createAdminClient();
		await admin.from("email_logs").insert({
			recipient_email: params.to,
			subject: params.subject,
			email_type: params.emailType,
			status: params.status,
			error_message: params.error_message ?? null,
			appointment_request_id:
				params.logContext?.appointment_request_id ?? null,
			appointment_id: params.logContext?.appointment_id ?? null,
			client_id: params.logContext?.client_id ?? null,
		});
	} catch {
		// No romper el flujo si falla el log
	}
}

export async function sendTattooEmail(params: SendTattooEmailParams) {
	const apiKey = process.env.RESEND_API_KEY;
	const from =
		process.env.EMAIL_FROM ?? "Tattoo Manager <onboarding@resend.dev>";

	if (!apiKey) {
		await logEmail({
			...params,
			status: "failed",
			error_message: "RESEND_API_KEY no configurada",
		});
		return { success: false as const, error: "Email no configurado" };
	}

	const resend = new Resend(apiKey);

	try {
		const { error } = await resend.emails.send({
			from,
			to: params.to,
			subject: params.subject,
			html: params.html,
		});

		if (error) {
			await logEmail({
				...params,
				status: "failed",
				error_message: error.message,
			});
			return { success: false as const, error: error.message };
		}

		await logEmail({ ...params, status: "sent" });
		return { success: true as const };
	} catch (err) {
		const message =
			err instanceof Error ? err.message : "Error desconocido al enviar email";
		await logEmail({
			...params,
			status: "failed",
			error_message: message,
		});
		return { success: false as const, error: message };
	}
}

export function getTattooerEmail() {
	return process.env.TATTOOER_EMAIL ?? "";
}
