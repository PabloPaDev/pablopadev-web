"use server";

import { redirect } from "next/navigation";
import { createClient } from "@/lib/supabase/server";

export type LoginFormState = {
	error?: string;
};

export async function loginAction(
	_prev: LoginFormState,
	formData: FormData
): Promise<LoginFormState> {
	const email = String(formData.get("email") ?? "").trim();
	const password = String(formData.get("password") ?? "");

	if (!email || !password) {
		return { error: "Email y contraseña son obligatorios." };
	}

	const supabase = await createClient();
	const { error } = await supabase.auth.signInWithPassword({ email, password });

	if (error) {
		return { error: "Credenciales incorrectas." };
	}

	redirect("/tattoo/admin");
}

export async function logoutAction() {
	const supabase = await createClient();
	await supabase.auth.signOut();
	redirect("/tattoo/login");
}
