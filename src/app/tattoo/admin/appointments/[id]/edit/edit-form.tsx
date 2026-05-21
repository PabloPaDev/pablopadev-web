"use client";

import { useFormState, useFormStatus } from "react-dom";
import {
	updateAppointmentAction,
	type EditAppointmentState,
} from "@/app/tattoo/admin/appointments/[id]/edit/actions";
import {
	TattooLabel,
	TattooInput,
	TattooTextarea,
	TattooSelect,
} from "@/app/tattoo/components/tattoo-shell";
import type { Appointment } from "@/lib/tattoo/types";

function toLocalDatetime(iso: string) {
	const d = new Date(iso);
	const pad = (n: number) => String(n).padStart(2, "0");
	return `${d.getFullYear()}-${pad(d.getMonth() + 1)}-${pad(d.getDate())}T${pad(d.getHours())}:${pad(d.getMinutes())}`;
}

function SubmitButton() {
	const { pending } = useFormStatus();
	return (
		<button
			type="submit"
			disabled={pending}
			className="bg-black px-6 py-2 font-sans text-sm font-medium text-white hover:bg-neutral-800 disabled:opacity-50"
		>
			{pending ? "Guardando…" : "Guardar cita"}
		</button>
	);
}

export function EditAppointmentForm({ appointment }: { appointment: Appointment }) {
	const bound = updateAppointmentAction.bind(null, appointment.id);
	const [state, action] = useFormState(bound, {} as EditAppointmentState);

	return (
		<form action={action} className="space-y-4">
			{state?.error && (
				<p className="text-sm text-red-400">{state.error}</p>
			)}
			<div>
				<TattooLabel>Título</TattooLabel>
				<TattooInput name="title" defaultValue={appointment.title} required />
			</div>
			<div>
				<TattooLabel>Descripción</TattooLabel>
				<TattooTextarea
					name="description"
					rows={4}
					defaultValue={appointment.description ?? ""}
				/>
			</div>
			<div className="grid gap-4 sm:grid-cols-2">
				<div>
					<TattooLabel>Inicio</TattooLabel>
					<TattooInput
						name="starts_at"
						type="datetime-local"
						defaultValue={toLocalDatetime(appointment.starts_at)}
						required
					/>
				</div>
				<div>
					<TattooLabel>Fin</TattooLabel>
					<TattooInput
						name="ends_at"
						type="datetime-local"
						defaultValue={toLocalDatetime(appointment.ends_at)}
						required
					/>
				</div>
			</div>
			<div>
				<TattooLabel>Estado</TattooLabel>
				<TattooSelect name="status" defaultValue={appointment.status}>
					<option value="pending">Pendiente</option>
					<option value="confirmed">Confirmada</option>
					<option value="completed">Completada</option>
					<option value="cancelled">Cancelada</option>
				</TattooSelect>
			</div>
			<div className="grid gap-4 sm:grid-cols-2">
				<div>
					<TattooLabel>Precio estimado (€)</TattooLabel>
					<TattooInput
						name="price_estimate"
						type="number"
						step="0.01"
						defaultValue={appointment.price_estimate ?? ""}
					/>
				</div>
				<div>
					<TattooLabel>Señal pagada (€)</TattooLabel>
					<TattooInput
						name="deposit_paid"
						type="number"
						step="0.01"
						defaultValue={appointment.deposit_paid ?? ""}
					/>
				</div>
			</div>
			<SubmitButton />
		</form>
	);
}
