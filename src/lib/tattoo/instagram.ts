/** Normaliza @usuario → usuario en minúsculas para comparar. */
export function normalizeInstagram(value: string): string {
	return value.trim().replace(/^@+/, "").toLowerCase();
}

export function instagramMatches(
	stored: string | null | undefined,
	input: string
): boolean {
	if (!stored?.trim()) return false;
	return normalizeInstagram(stored) === normalizeInstagram(input);
}
