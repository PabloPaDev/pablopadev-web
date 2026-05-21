import { google } from "googleapis";
import type { AppointmentRequest } from "@/lib/tattoo/panel/types";

const CALENDAR_TIME_ZONE = "Europe/Madrid";
const LOG_PREFIX = "[tattoo/googleCalendar]";

const REQUIRED_OAUTH_ENV = [
	"GOOGLE_CLIENT_ID",
	"GOOGLE_CLIENT_SECRET",
	"GOOGLE_REFRESH_TOKEN",
] as const;

export type CreateTattooCalendarEventParams = {
	request: Pick<
		AppointmentRequest,
		| "id"
		| "tattoo_idea"
		| "body_zone"
		| "size_estimate"
		| "client_instagram"
	>;
	client: {
		name: string;
		email: string | null;
		phone: string | null;
		instagram?: string | null;
	};
	appointment: {
		id: string;
		title: string;
		starts_at: string;
		ends_at: string;
		price_estimate?: number | null;
	};
};

export type CreateTattooCalendarEventResult = {
	success: boolean;
	eventId?: string;
	htmlLink?: string;
	error?: string;
};

function getCalendarId(): string {
	return process.env.GOOGLE_CALENDAR_ID?.trim() || "primary";
}

function getMissingOAuthEnvKeys(): string[] {
	return REQUIRED_OAUTH_ENV.filter((key) => !process.env[key]?.trim());
}

function formatCalendarError(err: unknown): string {
	if (err instanceof Error) {
		const GaxiosLike = err as {
			code?: number | string;
			response?: { status?: number; data?: unknown };
		};
		const parts = [err.message];
		if (GaxiosLike.code != null) {
			parts.push(`code=${String(GaxiosLike.code)}`);
		}
		if (GaxiosLike.response?.status != null) {
			parts.push(`status=${GaxiosLike.response.status}`);
		}
		if (GaxiosLike.response?.data != null) {
			try {
				parts.push(`data=${JSON.stringify(GaxiosLike.response.data)}`);
			} catch {
				parts.push("data=[unserializable]");
			}
		}
		return parts.join(" | ");
	}
	return String(err);
}

function buildEventDescription(
	params: CreateTattooCalendarEventParams
): string {
	const { request, client, appointment } = params;
	const lines: string[] = [
		`Cliente: ${client.name}`,
		`Email: ${client.email ?? "—"}`,
		`Teléfono: ${client.phone ?? "—"}`,
		`Instagram: ${client.instagram ?? request.client_instagram ?? "—"}`,
		`Idea del tatuaje: ${request.tattoo_idea}`,
		`Zona: ${request.body_zone ?? "—"}`,
		`Tamaño: ${request.size_estimate ?? "—"}`,
	];

	if (appointment.price_estimate != null) {
		lines.push(`Precio estimado: ${appointment.price_estimate} €`);
	}

	if (request.id === "manual") {
		lines.push("Origen: Cita manual");
	} else {
		lines.push(`ID de solicitud: ${request.id}`);
	}
	lines.push(`ID de cita: ${appointment.id}`);

	return lines.join("\n");
}

export async function createTattooCalendarEvent(
	params: CreateTattooCalendarEventParams
): Promise<CreateTattooCalendarEventResult> {
	const missing = getMissingOAuthEnvKeys();
	if (missing.length > 0) {
		const error = `Faltan variables de entorno: ${missing.join(", ")}`;
		console.error(`${LOG_PREFIX} ${error}`);
		return { success: false, error };
	}

	const calendarId = getCalendarId();
	const clientId = process.env.GOOGLE_CLIENT_ID!.trim();
	const clientSecret = process.env.GOOGLE_CLIENT_SECRET!.trim();
	const refreshToken = process.env.GOOGLE_REFRESH_TOKEN!.trim();

	const summary =
		params.appointment.title || `Tatuaje - ${params.client.name}`;
	const startDateTime = params.appointment.starts_at;
	const endDateTime = params.appointment.ends_at;

	console.log(`${LOG_PREFIX} Insertando evento`, {
		calendarId,
		summary,
		startDateTime,
		endDateTime,
		timeZone: CALENDAR_TIME_ZONE,
		appointmentId: params.appointment.id,
	});

	try {
		const oauth2Client = new google.auth.OAuth2(clientId, clientSecret);
		oauth2Client.setCredentials({ refresh_token: refreshToken });

		const calendar = google.calendar({ version: "v3", auth: oauth2Client });

		const response = await calendar.events.insert({
			calendarId,
			requestBody: {
				summary,
				description: buildEventDescription(params),
				start: {
					dateTime: startDateTime,
					timeZone: CALENDAR_TIME_ZONE,
				},
				end: {
					dateTime: endDateTime,
					timeZone: CALENDAR_TIME_ZONE,
				},
			},
		});

		const eventId = response.data.id ?? undefined;
		const htmlLink = response.data.htmlLink ?? undefined;

		console.log(`${LOG_PREFIX} Respuesta API`, {
			eventId: eventId ?? null,
			htmlLink: htmlLink ?? null,
			status: response.status,
		});

		if (htmlLink) {
			console.log(`${LOG_PREFIX} Abrir evento: ${htmlLink}`);
		}

		if (!eventId) {
			const error = "Google Calendar no devolvió el ID del evento.";
			console.error(`${LOG_PREFIX} ${error}`, {
				responseStatus: response.status,
			});
			return { success: false, error };
		}

		return { success: true, eventId, htmlLink };
	} catch (err) {
		const error = formatCalendarError(err);
		console.error(`${LOG_PREFIX} Error al insertar evento`, {
			calendarId,
			summary,
			startDateTime,
			endDateTime,
			error,
		});
		return { success: false, error };
	}
}

export async function deleteTattooCalendarEvent(
	eventId: string
): Promise<{ success: boolean; error?: string }> {
	const missing = getMissingOAuthEnvKeys();
	if (missing.length > 0) {
		return {
			success: false,
			error: `Faltan variables de entorno: ${missing.join(", ")}`,
		};
	}

	const calendarId = getCalendarId();
	const clientId = process.env.GOOGLE_CLIENT_ID!.trim();
	const clientSecret = process.env.GOOGLE_CLIENT_SECRET!.trim();
	const refreshToken = process.env.GOOGLE_REFRESH_TOKEN!.trim();

	try {
		const oauth2Client = new google.auth.OAuth2(clientId, clientSecret);
		oauth2Client.setCredentials({ refresh_token: refreshToken });

		const calendar = google.calendar({ version: "v3", auth: oauth2Client });
		await calendar.events.delete({
			calendarId,
			eventId,
		});

		return { success: true };
	} catch (err) {
		const message = formatCalendarError(err);
		console.error(`${LOG_PREFIX} Error al eliminar evento`, {
			calendarId,
			eventId,
			error: message,
		});
		return { success: false, error: message };
	}
}
