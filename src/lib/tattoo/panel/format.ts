/** Supabase a veces tipa relaciones 1:1 como objeto o como array. */
export function unwrapSupabaseJoin<T>(
	value: T | T[] | null | undefined
): T | null {
	if (value == null) return null;
	return Array.isArray(value) ? (value[0] ?? null) : value;
}

export function toLocalDatetime(iso: string) {
	const d = new Date(iso);
	const pad = (n: number) => String(n).padStart(2, "0");
	return `${d.getFullYear()}-${pad(d.getMonth() + 1)}-${pad(d.getDate())}T${pad(d.getHours())}:${pad(d.getMinutes())}`;
}

export function formatDateTime(iso: string | null) {
	if (!iso) return "—";
	try {
		return new Date(iso).toLocaleString("es-ES", {
			dateStyle: "short",
			timeStyle: "short",
		});
	} catch {
		return iso;
	}
}

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
	return parts.length > 0 ? parts.join("\n") : null;
}
