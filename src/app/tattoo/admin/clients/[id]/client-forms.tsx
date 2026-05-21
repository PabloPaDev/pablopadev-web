"use client";

import { useFormState, useFormStatus } from "react-dom";
import {
	updateClientAction,
	addClientNoteAction,
	uploadClientFileAction,
} from "@/app/tattoo/admin/clients/[id]/actions";
import {
	TattooLabel,
	TattooInput,
	TattooTextarea,
	TattooCard,
} from "@/app/tattoo/components/tattoo-shell";
import type { Client } from "@/lib/tattoo/types";
import type { ClientFormState } from "@/app/tattoo/admin/clients/[id]/actions";

function SaveButton({ label }: { label: string }) {
	const { pending } = useFormStatus();
	return (
		<button
			type="submit"
			disabled={pending}
			className="bg-black px-4 py-2 font-sans text-sm font-medium text-white hover:bg-neutral-800 disabled:opacity-50"
		>
			{pending ? "Guardando…" : label}
		</button>
	);
}

export function EditClientForm({ client }: { client: Client }) {
	const boundUpdate = updateClientAction.bind(null, client.id);
	const [state, action] = useFormState(boundUpdate, {} as ClientFormState);

	return (
		<TattooCard>
			<h3 className="mb-4 font-sans font-semibold text-black">Editar cliente</h3>
			{state?.success && (
				<p className="mb-3 font-sans text-sm text-neutral-700">Guardado correctamente.</p>
			)}
			{state?.error && (
				<p className="mb-3 text-sm text-red-400">{state.error}</p>
			)}
			<form action={action} className="space-y-3">
				<div>
					<TattooLabel>Nombre</TattooLabel>
					<TattooInput name="name" defaultValue={client.name} required />
				</div>
				<div>
					<TattooLabel>Email</TattooLabel>
					<TattooInput name="email" type="email" defaultValue={client.email ?? ""} />
				</div>
				<div>
					<TattooLabel>Teléfono</TattooLabel>
					<TattooInput name="phone" defaultValue={client.phone ?? ""} />
				</div>
				<div>
					<TattooLabel>Instagram</TattooLabel>
					<TattooInput name="instagram" defaultValue={client.instagram ?? ""} />
				</div>
				<div>
					<TattooLabel>Notas generales</TattooLabel>
					<TattooTextarea name="notes" rows={3} defaultValue={client.notes ?? ""} />
				</div>
				<SaveButton label="Guardar cambios" />
			</form>
		</TattooCard>
	);
}

export function AddNoteForm({ clientId }: { clientId: string }) {
	const bound = addClientNoteAction.bind(null, clientId);
	const [state, action] = useFormState(bound, {} as ClientFormState);

	return (
		<TattooCard>
			<h3 className="mb-4 font-sans font-semibold text-black">Añadir nota interna</h3>
			{state?.success && (
				<p className="mb-3 font-sans text-sm text-neutral-700">Nota añadida.</p>
			)}
			<form action={action} className="space-y-3">
				<TattooTextarea name="note" rows={3} required placeholder="Nota interna…" />
				<SaveButton label="Añadir nota" />
			</form>
		</TattooCard>
	);
}

export function UploadFileForm({
	clientId,
	appointmentIds,
}: {
	clientId: string;
	appointmentIds: { id: string; title: string }[];
}) {
	const bound = uploadClientFileAction.bind(null, clientId);
	const [state, action] = useFormState(bound, {} as ClientFormState);

	return (
		<TattooCard>
			<h3 className="mb-4 font-sans font-semibold text-black">Subir archivo / foto</h3>
			{state?.error && (
				<p className="mb-3 text-sm text-red-400">{state.error}</p>
			)}
			{state?.success && (
				<p className="mb-3 font-sans text-sm text-neutral-700">Archivo subido.</p>
			)}
			<form action={action} className="space-y-3">
				<div>
					<TattooLabel>Archivo</TattooLabel>
					<input
						type="file"
						name="file"
						accept="image/*,.pdf"
						required
						className="block w-full font-sans text-sm text-neutral-600 file:mr-4 file:border file:border-neutral-300 file:bg-white file:px-4 file:py-2 file:text-black"
					/>
				</div>
				{appointmentIds.length > 0 && (
					<div>
						<TattooLabel>Cita (opcional)</TattooLabel>
						<select
							name="appointment_id"
							className="w-full border border-neutral-300 bg-white px-3 py-2 font-sans text-sm"
						>
							<option value="">— Ninguna —</option>
							{appointmentIds.map((a) => (
								<option key={a.id} value={a.id}>
									{a.title}
								</option>
							))}
						</select>
					</div>
				)}
				<div>
					<TattooLabel>Descripción</TattooLabel>
					<TattooInput name="description" placeholder="Referencia, boceto…" />
				</div>
				<SaveButton label="Subir" />
			</form>
		</TattooCard>
	);
}
