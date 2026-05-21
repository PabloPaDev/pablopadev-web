"use client";

import { useFormState, useFormStatus } from "react-dom";
import {
	submitSolicitudAction,
	type SolicitudFormState,
} from "@/app/tattoo/solicitud/actions";
import {
	tattooDisplayClass,
	TattooLabel,
	TattooInput,
	TattooTextarea,
} from "@/app/tattoo/components/tattoo-shell";

const initialState: SolicitudFormState = {};

function SubmitButton() {
	const { pending } = useFormStatus();
	return (
		<button
			type="submit"
			disabled={pending}
			className="w-full border border-black bg-black py-3 font-sans text-sm font-medium text-white transition hover:bg-neutral-800 disabled:opacity-50"
		>
			{pending ? "Enviando…" : "Enviar solicitud"}
		</button>
	);
}

export function SolicitudForm() {
	const [state, formAction] = useFormState(submitSolicitudAction, initialState);

	if (state.success) {
		return (
			<div className="py-10 text-center">
				<p
					className={tattooDisplayClass(
						"text-2xl font-normal sm:text-3xl"
					)}
				>
					Solicitud enviada
				</p>
				<p className="mx-auto mt-4 max-w-sm font-sans text-sm leading-relaxed text-neutral-600">
					Revisaremos tu idea y te responderemos por email.
				</p>
			</div>
		);
	}

	return (
		<form action={formAction} className="space-y-4">
			{state.error && (
				<p className="font-sans text-sm text-red-600">{state.error}</p>
			)}
			<div>
				<TattooLabel>Nombre *</TattooLabel>
				<TattooInput name="client_name" required />
			</div>
			<div>
				<TattooLabel>Email *</TattooLabel>
				<TattooInput name="client_email" type="email" required />
			</div>
			<div>
				<TattooLabel>Teléfono</TattooLabel>
				<TattooInput name="client_phone" type="tel" />
			</div>
			<div>
				<TattooLabel>Instagram</TattooLabel>
				<TattooInput name="client_instagram" placeholder="@usuario" />
			</div>
			<div>
				<TattooLabel>Idea del tatuaje *</TattooLabel>
				<TattooTextarea name="tattoo_idea" rows={4} required />
			</div>
			<div className="grid gap-4 sm:grid-cols-2">
				<div>
					<TattooLabel>Zona del cuerpo</TattooLabel>
					<TattooInput name="body_zone" />
				</div>
				<div>
					<TattooLabel>Tamaño estimado</TattooLabel>
					<TattooInput name="size_estimate" placeholder="ej. 10×15 cm" />
				</div>
			</div>
			<div className="grid gap-4 sm:grid-cols-2">
				<div>
					<TattooLabel>Fecha preferida</TattooLabel>
					<TattooInput name="preferred_date" type="date" />
				</div>
				<div>
					<TattooLabel>Hora preferida / disponibilidad</TattooLabel>
					<TattooInput
						name="preferred_time_text"
						placeholder="Mañanas, tardes…"
					/>
				</div>
			</div>
			<SubmitButton />
		</form>
	);
}
