"use client";

import { useFormState, useFormStatus } from "react-dom";
import {
	submitBookingRequest,
	type BookFormState,
} from "@/app/tattoo/book/actions";
import {
	TattooLabel,
	TattooInput,
	TattooTextarea,
} from "@/app/tattoo/components/tattoo-shell";

const initialState: BookFormState = {};

function SubmitButton() {
	const { pending } = useFormStatus();
	return (
		<button
			type="submit"
			disabled={pending}
			className="w-full bg-black py-3 font-sans text-sm font-medium text-white transition hover:bg-neutral-800 disabled:opacity-50"
		>
			{pending ? "Enviando…" : "Enviar solicitud"}
		</button>
	);
}

export function BookingForm() {
	const [state, formAction] = useFormState(submitBookingRequest, initialState);

	if (state.success) {
		return (
			<div className="py-8 text-center">
				<p className="font-sans text-lg font-medium text-black">
					¡Solicitud enviada!
				</p>
				<p className="mt-2 text-sm text-neutral-600">
					Te hemos enviado un email de confirmación. Revisaremos tu
					petición pronto.
				</p>
			</div>
		);
	}

	return (
		<form action={formAction} className="space-y-4">
			{state.error && (
				<p className="rounded-lg border border-red-500/30 bg-red-500/10 px-3 py-2 text-sm text-red-400">
					{state.error}
				</p>
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
					<TattooLabel>Disponibilidad horaria</TattooLabel>
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
