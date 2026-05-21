export function buildAppointmentDescription(request: {
	body_zone: string | null;
	size_estimate: string | null;
	client_instagram: string | null;
	client_phone: string | null;
	preferred_time_text: string | null;
}) {
	const parts: string[] = [];
	if (request.body_zone) parts.push(`Zona: ${request.body_zone}`);
	if (request.size_estimate) parts.push(`Tamaño: ${request.size_estimate}`);
	if (request.client_instagram)
		parts.push(`Instagram: ${request.client_instagram}`);
	if (request.client_phone) parts.push(`Teléfono: ${request.client_phone}`);
	if (request.preferred_time_text)
		parts.push(`Disponibilidad: ${request.preferred_time_text}`);
	return parts.join("\n") || null;
}

export function resolveStartsAt(preferredDate: string | null): string {
	if (preferredDate) {
		const parsed = new Date(preferredDate);
		if (!Number.isNaN(parsed.getTime())) {
			return parsed.toISOString();
		}
	}
	const fallback = new Date();
	fallback.setDate(fallback.getDate() + 7);
	return fallback.toISOString();
}

export function addHours(iso: string, hours: number): string {
	const date = new Date(iso);
	date.setHours(date.getHours() + hours);
	return date.toISOString();
}
