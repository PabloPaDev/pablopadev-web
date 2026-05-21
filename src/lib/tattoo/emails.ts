import { Resend } from "resend";
import { createAdminClient } from "@/lib/supabase/admin";
import { formatDateTime as formatPanelDateTime } from "@/lib/tattoo/panel/format";
import type {
	Appointment,
	AppointmentRequest,
	Client,
} from "@/lib/tattoo/panel/types";

const resend = new Resend(process.env.RESEND_API_KEY);

export type TattooEmailSendResult = {
	recipient_email: string;
	recipient_type: "artist" | "client";
	subject: string;
	email_type: string;
	success: boolean;
	error?: string;
};

type SendTattooEmailParams = {
	to: string;
	subject: string;
	html: string;
	emailType: string;
	recipientType: "artist" | "client";
};

function escapeHtml(text: string) {
	return text
		.replace(/&/g, "&amp;")
		.replace(/</g, "&lt;")
		.replace(/>/g, "&gt;")
		.replace(/"/g, "&quot;");
}

function htmlWrap(content: string) {
	return `<div style="font-family: Georgia, serif; max-width: 560px; margin: 0 auto; color: #171717; background: #fff; padding: 32px; line-height: 1.6;">${content}</div>`;
}

async function sendTattooEmail(
	params: SendTattooEmailParams
): Promise<{ success: boolean; error?: string }> {
	const from = process.env.TATTOO_FROM_EMAIL;
	if (!process.env.RESEND_API_KEY) {
		return { success: false, error: "RESEND_API_KEY no configurada" };
	}
	if (!from) {
		return { success: false, error: "TATTOO_FROM_EMAIL no configurada" };
	}

	try {
		const { error } = await resend.emails.send({
			from,
			to: params.to,
			subject: params.subject,
			html: params.html,
		});
		if (error) {
			return { success: false, error: error.message };
		}
		return { success: true };
	} catch (err) {
		const message =
			err instanceof Error ? err.message : "Error desconocido al enviar email";
		return { success: false, error: message };
	}
}

function studioEmail() {
	return process.env.TATTOO_STUDIO_EMAIL?.trim() ?? "";
}

function line(label: string, value: string | null | undefined) {
	if (!value) return "";
	return `<p><strong>${escapeHtml(label)}:</strong> ${escapeHtml(value)}</p>`;
}

export async function sendTattooRequestReceivedEmails(
	request: AppointmentRequest
): Promise<TattooEmailSendResult[]> {
	const results: TattooEmailSendResult[] = [];
	const artistTo = studioEmail();
	const artistSubject = "Nueva solicitud de cita";

	const artistHtml = htmlWrap(`
		<h1 style="font-size: 20px; font-weight: normal;">Nueva solicitud de cita</h1>
		${line("Nombre", request.client_name)}
		${line("Email", request.client_email)}
		${line("Teléfono", request.client_phone)}
		${line("Instagram", request.client_instagram)}
		${line("Idea del tatuaje", request.tattoo_idea)}
		${line("Zona", request.body_zone)}
		${line("Tamaño", request.size_estimate)}
		${line(
			"Fecha preferida",
			request.preferred_date
				? formatPanelDateTime(request.preferred_date)
				: null
		)}
		${line("Hora preferida", request.preferred_time_text)}
	`);

	if (artistTo) {
		const sent = await sendTattooEmail({
			to: artistTo,
			subject: artistSubject,
			html: artistHtml,
			emailType: "request_received",
			recipientType: "artist",
		});
		results.push({
			recipient_email: artistTo,
			recipient_type: "artist",
			subject: artistSubject,
			email_type: "request_received",
			success: sent.success,
			error: sent.error,
		});
	} else {
		results.push({
			recipient_email: "",
			recipient_type: "artist",
			subject: artistSubject,
			email_type: "request_received",
			success: false,
			error: "TATTOO_STUDIO_EMAIL no configurada",
		});
	}

	const clientSubject = "Hemos recibido tu solicitud";
	const clientHtml = htmlWrap(`
		<p>Hola ${escapeHtml(request.client_name)},</p>
		<p>Hemos recibido tu solicitud. Revisaremos tu idea y te responderemos por email para concretar la sesión.</p>
	`);

	const clientSent = await sendTattooEmail({
		to: request.client_email,
		subject: clientSubject,
		html: clientHtml,
		emailType: "request_received",
		recipientType: "client",
	});
	results.push({
		recipient_email: request.client_email,
		recipient_type: "client",
		subject: clientSubject,
		email_type: "request_received",
		success: clientSent.success,
		error: clientSent.error,
	});

	return results;
}

export async function sendTattooAppointmentConfirmedEmails({
	request,
	client,
	appointment,
}: {
	request: AppointmentRequest;
	client: Pick<Client, "id" | "name" | "email" | "phone">;
	appointment: Pick<
		Appointment,
		"id" | "starts_at" | "ends_at" | "price_estimate" | "title"
	>;
}): Promise<TattooEmailSendResult[]> {
	const results: TattooEmailSendResult[] = [];
	const clientEmail = client.email ?? request.client_email;
	const starts = formatPanelDateTime(appointment.starts_at);
	const price =
		appointment.price_estimate != null
			? `${appointment.price_estimate} €`
			: null;

	const clientSubject = "Tu primera cita ha sido confirmada";
	const clientHtml = htmlWrap(`
		<h1 style="font-size: 20px; font-weight: normal;">Tu primera cita ha sido confirmada</h1>
		<p>Hola ${escapeHtml(client.name)},</p>
		<p><strong>Charlemos sobre tu tattoo</strong> — primera toma de contacto para hablar de tu proyecto.</p>
		${line("Fecha y hora", starts)}
		${line("Idea del tatuaje", appointment.title)}
		${line("Zona", request.body_zone)}
		${price ? line("Precio estimado", price) : ""}
	`);

	const clientSent = await sendTattooEmail({
		to: clientEmail,
		subject: clientSubject,
		html: clientHtml,
		emailType: "appointment_confirmed",
		recipientType: "client",
	});
	results.push({
		recipient_email: clientEmail,
		recipient_type: "client",
		subject: clientSubject,
		email_type: "appointment_confirmed",
		success: clientSent.success,
		error: clientSent.error,
	});

	const artistTo = studioEmail();
	const artistSubject = "Primera cita confirmada";
	const artistHtml = htmlWrap(`
		<h1 style="font-size: 20px; font-weight: normal;">Primera cita confirmada</h1>
		<p><strong>Charlemos sobre tu tattoo</strong> — primera toma de contacto.</p>
		${line("Cliente", client.name)}
		${line("Email", clientEmail)}
		${line("Teléfono", client.phone ?? request.client_phone)}
		${line("Fecha y hora", starts)}
		${line("Idea", appointment.title)}
		${price ? line("Precio estimado", price) : ""}
	`);

	if (artistTo) {
		const artistSent = await sendTattooEmail({
			to: artistTo,
			subject: artistSubject,
			html: artistHtml,
			emailType: "appointment_confirmed",
			recipientType: "artist",
		});
		results.push({
			recipient_email: artistTo,
			recipient_type: "artist",
			subject: artistSubject,
			email_type: "appointment_confirmed",
			success: artistSent.success,
			error: artistSent.error,
		});
	} else {
		results.push({
			recipient_email: "",
			recipient_type: "artist",
			subject: artistSubject,
			email_type: "appointment_confirmed",
			success: false,
			error: "TATTOO_STUDIO_EMAIL no configurada",
		});
	}

	return results;
}

export async function sendTattooManualAppointmentCreatedEmails({
	client,
	appointment,
}: {
	client: Pick<Client, "id" | "name" | "email" | "phone" | "instagram">;
	appointment: Pick<
		Appointment,
		"id" | "title" | "description" | "starts_at" | "ends_at" | "price_estimate"
	>;
}): Promise<TattooEmailSendResult[]> {
	const results: TattooEmailSendResult[] = [];
	const clientEmail = client.email?.trim();
	const starts = formatPanelDateTime(appointment.starts_at);
	const ends = formatPanelDateTime(appointment.ends_at);
	const price =
		appointment.price_estimate != null
			? `${appointment.price_estimate} €`
			: null;

	const clientSubject = "Tu cita ha sido creada";
	const clientHtml = htmlWrap(`
		<h1 style="font-size: 20px; font-weight: normal;">Tu cita ha sido creada</h1>
		<p>Hola ${escapeHtml(client.name)},</p>
		<p>Hemos programado una cita en el estudio.</p>
		${line("Título", appointment.title)}
		${line("Inicio", starts)}
		${line("Fin", ends)}
		${appointment.description ? line("Descripción", appointment.description) : ""}
		${price ? line("Precio estimado", price) : ""}
	`);

	if (clientEmail) {
		const clientSent = await sendTattooEmail({
			to: clientEmail,
			subject: clientSubject,
			html: clientHtml,
			emailType: "manual_appointment_created",
			recipientType: "client",
		});
		results.push({
			recipient_email: clientEmail,
			recipient_type: "client",
			subject: clientSubject,
			email_type: "manual_appointment_created",
			success: clientSent.success,
			error: clientSent.error,
		});
	} else {
		results.push({
			recipient_email: "",
			recipient_type: "client",
			subject: clientSubject,
			email_type: "manual_appointment_created",
			success: false,
			error: "El cliente no tiene email",
		});
	}

	const artistTo = studioEmail();
	const artistSubject = "Nueva cita creada";
	const artistHtml = htmlWrap(`
		<h1 style="font-size: 20px; font-weight: normal;">Nueva cita creada</h1>
		<p>Cita creada manualmente desde el panel.</p>
		${line("Cliente", client.name)}
		${line("Email", clientEmail ?? undefined)}
		${line("Teléfono", client.phone)}
		${line("Instagram", client.instagram)}
		${line("Título", appointment.title)}
		${line("Inicio", starts)}
		${line("Fin", ends)}
		${price ? line("Precio estimado", price) : ""}
	`);

	if (artistTo) {
		const artistSent = await sendTattooEmail({
			to: artistTo,
			subject: artistSubject,
			html: artistHtml,
			emailType: "manual_appointment_created",
			recipientType: "artist",
		});
		results.push({
			recipient_email: artistTo,
			recipient_type: "artist",
			subject: artistSubject,
			email_type: "manual_appointment_created",
			success: artistSent.success,
			error: artistSent.error,
		});
	} else {
		results.push({
			recipient_email: "",
			recipient_type: "artist",
			subject: artistSubject,
			email_type: "manual_appointment_created",
			success: false,
			error: "TATTOO_STUDIO_EMAIL no configurada",
		});
	}

	return results;
}

export async function sendTattooAppointmentUpdatedEmails({
	client,
	appointment,
}: {
	client: Pick<Client, "id" | "name" | "email" | "phone">;
	appointment: Pick<
		Appointment,
		| "id"
		| "title"
		| "description"
		| "starts_at"
		| "ends_at"
		| "price_estimate"
		| "status"
	>;
}): Promise<TattooEmailSendResult[]> {
	const results: TattooEmailSendResult[] = [];
	const clientEmail = client.email?.trim();
	const starts = formatPanelDateTime(appointment.starts_at);
	const ends = formatPanelDateTime(appointment.ends_at);
	const price =
		appointment.price_estimate != null
			? `${appointment.price_estimate} €`
			: null;

	const clientSubject = "Tu cita ha sido actualizada";
	const clientHtml = htmlWrap(`
		<h1 style="font-size: 20px; font-weight: normal;">Tu cita ha sido actualizada</h1>
		<p>Hola ${escapeHtml(client.name)},</p>
		<p>Te confirmamos los datos actualizados de tu cita:</p>
		${line("Título", appointment.title)}
		${line("Inicio", starts)}
		${line("Fin", ends)}
		${appointment.description ? line("Descripción", appointment.description) : ""}
		${price ? line("Precio estimado", price) : ""}
	`);

	if (clientEmail) {
		const clientSent = await sendTattooEmail({
			to: clientEmail,
			subject: clientSubject,
			html: clientHtml,
			emailType: "appointment_updated",
			recipientType: "client",
		});
		results.push({
			recipient_email: clientEmail,
			recipient_type: "client",
			subject: clientSubject,
			email_type: "appointment_updated",
			success: clientSent.success,
			error: clientSent.error,
		});
	} else {
		results.push({
			recipient_email: "",
			recipient_type: "client",
			subject: clientSubject,
			email_type: "appointment_updated",
			success: false,
			error: "El cliente no tiene email",
		});
	}

	const artistTo = studioEmail();
	const artistSubject = "Cita actualizada";
	const artistHtml = htmlWrap(`
		<h1 style="font-size: 20px; font-weight: normal;">Cita actualizada</h1>
		${line("Cliente", client.name)}
		${line("Email", clientEmail ?? undefined)}
		${line("Teléfono", client.phone)}
		${line("Título", appointment.title)}
		${line("Inicio", starts)}
		${line("Fin", ends)}
		${price ? line("Precio estimado", price) : ""}
	`);

	if (artistTo) {
		const artistSent = await sendTattooEmail({
			to: artistTo,
			subject: artistSubject,
			html: artistHtml,
			emailType: "appointment_updated",
			recipientType: "artist",
		});
		results.push({
			recipient_email: artistTo,
			recipient_type: "artist",
			subject: artistSubject,
			email_type: "appointment_updated",
			success: artistSent.success,
			error: artistSent.error,
		});
	} else {
		results.push({
			recipient_email: "",
			recipient_type: "artist",
			subject: artistSubject,
			email_type: "appointment_updated",
			success: false,
			error: "TATTOO_STUDIO_EMAIL no configurada",
		});
	}

	return results;
}

export async function sendTattooAppointmentCancelledEmails({
	client,
	appointment,
}: {
	client: Pick<Client, "id" | "name" | "email" | "phone">;
	appointment: Pick<
		Appointment,
		"id" | "title" | "starts_at" | "ends_at"
	>;
}): Promise<TattooEmailSendResult[]> {
	const results: TattooEmailSendResult[] = [];
	const clientEmail = client.email?.trim();
	const starts = formatPanelDateTime(appointment.starts_at);
	const ends = formatPanelDateTime(appointment.ends_at);

	const clientSubject = "Tu cita ha sido cancelada";
	const clientHtml = htmlWrap(`
		<h1 style="font-size: 20px; font-weight: normal;">Tu cita ha sido cancelada</h1>
		<p>Hola ${escapeHtml(client.name)},</p>
		<p>Te informamos de que la siguiente cita ha sido cancelada:</p>
		${line("Título", appointment.title)}
		${line("Inicio", starts)}
		${line("Fin", ends)}
		<p>Si necesitas reprogramar, contáctanos.</p>
	`);

	if (clientEmail) {
		const clientSent = await sendTattooEmail({
			to: clientEmail,
			subject: clientSubject,
			html: clientHtml,
			emailType: "appointment_cancelled",
			recipientType: "client",
		});
		results.push({
			recipient_email: clientEmail,
			recipient_type: "client",
			subject: clientSubject,
			email_type: "appointment_cancelled",
			success: clientSent.success,
			error: clientSent.error,
		});
	} else {
		results.push({
			recipient_email: "",
			recipient_type: "client",
			subject: clientSubject,
			email_type: "appointment_cancelled",
			success: false,
			error: "El cliente no tiene email",
		});
	}

	const artistTo = studioEmail();
	const artistSubject = "Cita cancelada";
	const artistHtml = htmlWrap(`
		<h1 style="font-size: 20px; font-weight: normal;">Cita cancelada</h1>
		${line("Cliente", client.name)}
		${line("Email", clientEmail ?? undefined)}
		${line("Teléfono", client.phone)}
		${line("Título", appointment.title)}
		${line("Inicio", starts)}
		${line("Fin", ends)}
	`);

	if (artistTo) {
		const artistSent = await sendTattooEmail({
			to: artistTo,
			subject: artistSubject,
			html: artistHtml,
			emailType: "appointment_cancelled",
			recipientType: "artist",
		});
		results.push({
			recipient_email: artistTo,
			recipient_type: "artist",
			subject: artistSubject,
			email_type: "appointment_cancelled",
			success: artistSent.success,
			error: artistSent.error,
		});
	} else {
		results.push({
			recipient_email: "",
			recipient_type: "artist",
			subject: artistSubject,
			email_type: "appointment_cancelled",
			success: false,
			error: "TATTOO_STUDIO_EMAIL no configurada",
		});
	}

	return results;
}

export async function sendTattooAppointmentRejectedEmails({
	request,
	reason,
}: {
	request: AppointmentRequest;
	reason?: string | null;
}): Promise<TattooEmailSendResult[]> {
	const results: TattooEmailSendResult[] = [];
	const clientSubject = "Sobre tu solicitud de cita";
	const reasonText = reason?.trim();
	const reasonParagraph = reasonText
		? `<p>${escapeHtml(reasonText)}</p>`
		: "";

	const clientHtml = htmlWrap(`
		<p>Hola ${escapeHtml(request.client_name)},</p>
		<p>Gracias por enviarnos tu idea. En este caso no podremos aceptar la solicitud.</p>
		${reasonParagraph}
		<p>Gracias por pensar en nosotros.</p>
	`);

	const clientSent = await sendTattooEmail({
		to: request.client_email,
		subject: clientSubject,
		html: clientHtml,
		emailType: "appointment_rejected",
		recipientType: "client",
	});

	results.push({
		recipient_email: request.client_email,
		recipient_type: "client",
		subject: clientSubject,
		email_type: "appointment_rejected",
		success: clientSent.success,
		error: clientSent.error,
	});

	return results;
}

export type TattooEmailLogContext = {
	appointment_request_id?: string;
	appointment_id?: string;
	client_id?: string;
};

export async function persistTattooEmailLogs(
	results: TattooEmailSendResult[],
	context: TattooEmailLogContext
) {
	const rows = results
		.filter((r) => r.recipient_email)
		.map((r) => ({
			appointment_request_id: context.appointment_request_id ?? null,
			appointment_id: context.appointment_id ?? null,
			client_id: context.client_id ?? null,
			recipient_email: r.recipient_email,
			recipient_type: r.recipient_type,
			subject: r.subject,
			email_type: r.email_type,
			status: r.success ? "sent" : "error",
			error_message: r.error ?? null,
		}));

	if (rows.length === 0) return;

	const supabase = createAdminClient();
	const { error } = await supabase.from("email_logs").insert(rows);
	if (error) {
		throw error;
	}
}

/* --- Legacy: rutas /tattoo/admin y /tattoo/book (no modificar imports) --- */

const legacyWrapper = (content: string) => `
<div style="font-family: sans-serif; max-width: 560px; margin: 0 auto; color: #e4e4e7; background: #18181b; padding: 32px; border-radius: 12px;">
	${content}
</div>
`;

export function requestReceivedClientHtml(name: string) {
	return legacyWrapper(`
		<h1 style="color: #fafafa; margin-top: 0;">Solicitud recibida</h1>
		<p>Hola <strong>${escapeHtml(name)}</strong>,</p>
		<p>Hemos recibido tu solicitud de cita. La revisaremos y te contactaremos pronto.</p>
	`);
}

export function requestReceivedTattooerHtml(request: {
	client_name: string;
	client_email: string;
	tattoo_idea: string;
	body_zone: string | null;
	preferred_date: string | null;
}) {
	const zone = request.body_zone
		? `<p><strong>Zona:</strong> ${escapeHtml(request.body_zone)}</p>`
		: "";
	const date = request.preferred_date
		? `<p><strong>Fecha preferida:</strong> ${escapeHtml(request.preferred_date)}</p>`
		: "";

	return legacyWrapper(`
		<h1 style="color: #fafafa; margin-top: 0;">Nueva solicitud de cita</h1>
		<p><strong>Cliente:</strong> ${escapeHtml(request.client_name)}</p>
		<p><strong>Email:</strong> ${escapeHtml(request.client_email)}</p>
		<p><strong>Idea:</strong> ${escapeHtml(request.tattoo_idea)}</p>
		${zone}
		${date}
	`);
}

export function requestAcceptedClientHtml(name: string, startsAt: string) {
	return legacyWrapper(`
		<h1 style="color: #fafafa; margin-top: 0;">¡Cita confirmada!</h1>
		<p>Hola <strong>${escapeHtml(name)}</strong>,</p>
		<p>Tu cita está programada para el <strong>${escapeHtml(startsAt)}</strong>.</p>
	`);
}

export function requestAcceptedTattooerHtml(clientName: string, startsAt: string) {
	return legacyWrapper(`
		<h1 style="color: #fafafa; margin-top: 0;">Solicitud aceptada</h1>
		<p>Cita de <strong>${escapeHtml(clientName)}</strong> — <strong>${escapeHtml(startsAt)}</strong>.</p>
	`);
}

export function requestRejectedClientHtml(name: string) {
	return legacyWrapper(`
		<h1 style="color: #fafafa; margin-top: 0;">Sobre tu solicitud</h1>
		<p>Hola <strong>${escapeHtml(name)}</strong>,</p>
		<p>En este momento no podemos aceptar tu solicitud de cita.</p>
	`);
}

export function requestNeedsInfoClientHtml(name: string) {
	return legacyWrapper(`
		<h1 style="color: #fafafa; margin-top: 0;">Necesitamos más información</h1>
		<p>Hola <strong>${escapeHtml(name)}</strong>,</p>
		<p>Para valorar tu solicitud necesitamos más detalles.</p>
	`);
}

export function appointmentUpdatedClientHtml(
	name: string,
	title: string,
	startsAt: string
) {
	return legacyWrapper(`
		<h1 style="color: #fafafa; margin-top: 0;">Cita actualizada</h1>
		<p>Hola <strong>${escapeHtml(name)}</strong>,</p>
		<p>Cita "<strong>${escapeHtml(title)}</strong>" — <strong>${escapeHtml(startsAt)}</strong>.</p>
	`);
}

export function appointmentUpdatedTattooerHtml(title: string, startsAt: string) {
	return legacyWrapper(`
		<h1 style="color: #fafafa; margin-top: 0;">Cita modificada</h1>
		<p>Cita "<strong>${escapeHtml(title)}</strong>" (${escapeHtml(startsAt)}).</p>
	`);
}

export function formatDateTime(iso: string) {
	try {
		return new Date(iso).toLocaleString("es-ES", {
			dateStyle: "long",
			timeStyle: "short",
		});
	} catch {
		return iso;
	}
}
