"use client";

import { useFormState, useFormStatus } from "react-dom";
import { loginAction, type LoginFormState } from "@/app/tattoo/login/actions";
import { TattooLabel, TattooInput } from "@/app/tattoo/components/tattoo-shell";

const initialState: LoginFormState = {};

function SubmitButton() {
	const { pending } = useFormStatus();
	return (
		<button
			type="submit"
			disabled={pending}
			className="w-full bg-black py-3 font-sans text-sm font-medium text-white hover:bg-neutral-800 disabled:opacity-50"
		>
			{pending ? "Entrando…" : "Entrar"}
		</button>
	);
}

export function LoginForm() {
	const [state, formAction] = useFormState(loginAction, initialState);

	return (
		<form action={formAction} className="space-y-4">
			{state.error && (
				<p className="rounded-lg border border-red-500/30 bg-red-500/10 px-3 py-2 text-sm text-red-400">
					{state.error}
				</p>
			)}
			<div>
				<TattooLabel>Email</TattooLabel>
				<TattooInput name="email" type="email" required autoComplete="email" />
			</div>
			<div>
				<TattooLabel>Contraseña</TattooLabel>
				<TattooInput
					name="password"
					type="password"
					required
					autoComplete="current-password"
				/>
			</div>
			<SubmitButton />
		</form>
	);
}
