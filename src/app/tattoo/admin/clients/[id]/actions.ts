"use server";

import { revalidatePath } from "next/cache";
import { createClient } from "@/lib/supabase/server";

export type ClientFormState = { error?: string; success?: boolean };

export async function updateClientAction(
	clientId: string,
	_prev: ClientFormState,
	formData: FormData
): Promise<ClientFormState> {
	const supabase = await createClient();

	const { error } = await supabase
		.from("clients")
		.update({
			name: String(formData.get("name") ?? "").trim(),
			email: String(formData.get("email") ?? "").trim() || null,
			phone: String(formData.get("phone") ?? "").trim() || null,
			instagram: String(formData.get("instagram") ?? "").trim() || null,
			notes: String(formData.get("notes") ?? "").trim() || null,
		})
		.eq("id", clientId);

	if (error) return { error: error.message };

	revalidatePath(`/tattoo/admin/clients/${clientId}`);
	return { success: true };
}

export async function addClientNoteAction(
	clientId: string,
	_prev: ClientFormState,
	formData: FormData
): Promise<ClientFormState> {
	const note = String(formData.get("note") ?? "").trim();
	if (!note) return { error: "La nota no puede estar vacía" };

	const supabase = await createClient();
	const { error } = await supabase.from("client_notes").insert({
		client_id: clientId,
		note,
	});

	if (error) return { error: error.message };

	revalidatePath(`/tattoo/admin/clients/${clientId}`);
	return { success: true };
}

export async function uploadClientFileAction(
	clientId: string,
	_prev: ClientFormState,
	formData: FormData
): Promise<ClientFormState> {
	const file = formData.get("file") as File | null;
	if (!file || file.size === 0) {
		return { error: "Selecciona un archivo" };
	}

	const supabase = await createClient();
	const ext = file.name.split(".").pop() ?? "bin";
	const path = `${clientId}/${Date.now()}.${ext}`;

	const { error: uploadError } = await supabase.storage
		.from("tattoo-files")
		.upload(path, file, { upsert: false });

	if (uploadError) {
		return { error: uploadError.message };
	}

	const {
		data: { publicUrl },
	} = supabase.storage.from("tattoo-files").getPublicUrl(path);

	const appointmentId =
		String(formData.get("appointment_id") ?? "").trim() || null;
	const description =
		String(formData.get("description") ?? "").trim() || null;

	const { error } = await supabase.from("tattoo_files").insert({
		client_id: clientId,
		appointment_id: appointmentId,
		file_url: publicUrl,
		file_type: file.type || ext,
		description,
	});

	if (error) return { error: error.message };

	revalidatePath(`/tattoo/admin/clients/${clientId}`);
	return { success: true };
}
