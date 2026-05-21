"use client";

import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import { useFormState, useFormStatus } from "react-dom";
import {
	TattooCard,
	TattooLabel,
	TattooInput,
	TattooTextarea,
	TattooSelect,
} from "@/app/tattoo/components/tattoo-shell";
import type { Client } from "@/lib/tattoo/panel/types";
import {
	createManualAppointmentAction,
	type CreateManualAppointmentState,
} from "@/app/tattoo/panel/citas/actions";

function SubmitButton() {
	const { pending } = useFormStatus();
	return (
		<button
			type="submit"
			disabled={pending}
			className="border border-black bg-black px-4 py-2 font-sans text-sm text-white hover:bg-neutral-800 disabled:opacity-50"
		>
			{pending ? "Creando…" : "Crear cita"}
		</button>
	);
}

export function CreateManualAppointmentForm({
	clients,
}: {
	clients: Pick<Client, "id" | "name" | "email">[];
}) {
	const router = useRouter();
	const [open, setOpen] = useState(false);
	const [state, action] = useFormState(
		createManualAppointmentAction,
		{} as CreateManualAppointmentState
	);

	useEffect(() => {
		if (state?.success) {
			setOpen(false);
			router.refresh();
		}
	}, [state?.success, router]);

	if (clients.length === 0) {
		return (
			<TattooCard className="font-sans text-sm text-neutral-600">
				<p className="mb-2 text-xs font-medium uppercase tracking-wide text-black">
					Crear cita
				</p>
				<p>No hay clientes. Acepta una solicitud o crea un cliente antes.</p>
			</TattooCard>
		);
	}

	return (
		<TattooCard className={open ? "space-y-4" : undefined}>
			<div className="flex flex-wrap items-center justify-between gap-2">
				<p className="text-xs font-medium uppercase tracking-wide text-black">
					Crear cita
				</p>
				<button
					type="button"
					onClick={() => setOpen((value) => !value)}
					className="border border-neutral-300 px-3 py-1 font-sans text-xs text-black hover:border-black"
				>
					{open ? "Ocultar" : "Nueva cita"}
				</button>
			</div>
			{open && (
			<form action={action} className="space-y-4 font-sans text-sm">
				{state?.error && (
					<p className="text-sm text-red-600">{state.error}</p>
				)}
				{state?.success && (
					<p className="text-sm text-neutral-700">
						Cita creada correctamente.
					</p>
				)}
				<div>
					<TattooLabel>Cliente</TattooLabel>
					<TattooSelect name="client_id" required defaultValue="">
						<option value="" disabled>
							Selecciona un cliente
						</option>
						{clients.map((c) => (
							<option key={c.id} value={c.id}>
								{c.name}
								{c.email ? ` · ${c.email}` : ""}
							</option>
						))}
					</TattooSelect>
				</div>
				<div>
					<TattooLabel>Título</TattooLabel>
					<TattooInput name="title" required />
				</div>
				<div>
					<TattooLabel>Descripción</TattooLabel>
					<TattooTextarea name="description" rows={3} />
				</div>
				<div className="grid gap-4 sm:grid-cols-2">
					<div>
						<TattooLabel>Inicio</TattooLabel>
						<TattooInput
							name="starts_at"
							type="datetime-local"
							required
						/>
					</div>
					<div>
						<TattooLabel>Fin</TattooLabel>
						<TattooInput name="ends_at" type="datetime-local" required />
					</div>
				</div>
				<div className="grid gap-4 sm:grid-cols-2">
					<div>
						<TattooLabel>Precio estimado (€)</TattooLabel>
						<TattooInput
							name="price_estimate"
							type="number"
							step="0.01"
							min="0"
						/>
					</div>
					<div className="flex items-end pb-1">
						<label className="flex cursor-pointer items-center gap-2 font-sans text-sm text-black">
							<input
								type="checkbox"
								name="deposit_paid"
								className="h-4 w-4 border border-neutral-300"
							/>
							Señal pagada
						</label>
					</div>
				</div>
				<SubmitButton />
			</form>
			)}
		</TattooCard>
	);
}
