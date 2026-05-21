"use client";

import { useFormState, useFormStatus } from "react-dom";
import {
	lookupMiCitaByInstagramAction,
	requestAppointmentChangeAction,
	type LookupMiCitaState,
	type MiCitaAppointment,
	type RequestChangeState,
} from "@/app/tattoo/mi-cita/actions";
import {
	StatusBadge,
	TattooLabel,
	TattooInput,
	TattooTextarea,
	tattooDisplayClass,
} from "@/app/tattoo/components/tattoo-shell";
import { formatDateTime } from "@/lib/tattoo/panel/format";

function LookupButton() {
	const { pending } = useFormStatus();
	return (
		<button
			type="submit"
			disabled={pending}
			className="w-full border border-black bg-black py-3 font-sans text-sm font-medium text-white transition hover:bg-neutral-800 disabled:opacity-50"
		>
			{pending ? "Buscando…" : "Ver mis citas"}
		</button>
	);
}

function ChangeSubmitButton() {
	const { pending } = useFormStatus();
	return (
		<button
			type="submit"
			disabled={pending}
			className="border border-black bg-black px-4 py-2 font-sans text-sm text-white hover:bg-neutral-800 disabled:opacity-50"
		>
			{pending ? "Enviando…" : "Solicitar cambio"}
		</button>
	);
}

function AppointmentChangeForm({
	appointment,
	instagram,
}: {
	appointment: MiCitaAppointment;
	instagram: string;
}) {
	const bound = requestAppointmentChangeAction;
	const [state, action] = useFormState(bound, {} as RequestChangeState);

	if (state.success) {
		return (
			<p className="font-sans text-sm text-neutral-700">
				Solicitud enviada. Te responderemos por email.
			</p>
		);
	}

	return (
		<form action={action} className="mt-4 space-y-3 border-t border-neutral-200 pt-4">
			<input type="hidden" name="appointment_id" value={appointment.id} />
			<input type="hidden" name="instagram" value={instagram} />
			{state.error && (
				<p className="font-sans text-sm text-red-600">{state.error}</p>
			)}
			<div>
				<TattooLabel>Nueva fecha propuesta</TattooLabel>
				<TattooInput
					name="preferred_new_date"
					type="datetime-local"
				/>
				<p className="mt-1 text-xs text-neutral-500">
					Opcional si solo quieres comentar otro cambio.
				</p>
			</div>
			<div>
				<TattooLabel>Motivo del cambio</TattooLabel>
				<TattooTextarea
					name="message"
					rows={3}
					placeholder="Dudas sobre el diseño, horario alternativo, etc."
				/>
			</div>
			<ChangeSubmitButton />
		</form>
	);
}

function AppointmentCardView({
	appointment,
	instagram,
}: {
	appointment: MiCitaAppointment;
	instagram: string;
}) {
	return (
		<div className="border border-neutral-200 bg-white p-5 font-sans text-sm">
			<div className="flex flex-wrap items-start justify-between gap-2">
				<p className="font-semibold text-black">{appointment.title}</p>
				<StatusBadge status={appointment.status} />
			</div>
			<dl className="mt-3 grid gap-2 sm:grid-cols-2">
				<div>
					<dt className="text-neutral-500">Inicio</dt>
					<dd>{formatDateTime(appointment.starts_at)}</dd>
				</div>
				<div>
					<dt className="text-neutral-500">Fin</dt>
					<dd>{formatDateTime(appointment.ends_at)}</dd>
				</div>
				<div>
					<dt className="text-neutral-500">Precio estimado</dt>
					<dd>
						{appointment.price_estimate != null
							? `${appointment.price_estimate} €`
							: "—"}
					</dd>
				</div>
			</dl>
			{appointment.description && (
				<p className="mt-3 whitespace-pre-wrap text-neutral-700">
					{appointment.description}
				</p>
			)}
			<AppointmentChangeForm
				appointment={appointment}
				instagram={instagram}
			/>
		</div>
	);
}

export function MiCitaFlow() {
	const [lookup, lookupAction] = useFormState(
		lookupMiCitaByInstagramAction,
		{} as LookupMiCitaState
	);

	const hasResults =
		lookup.appointments && lookup.appointments.length > 0 && lookup.instagram;

	return (
		<div className="space-y-8">
			<form action={lookupAction} className="space-y-4">
				{lookup.error && !hasResults && (
					<p className="font-sans text-sm text-red-600">{lookup.error}</p>
				)}
				<div>
					<TattooLabel>Instagram</TattooLabel>
					<TattooInput
						name="instagram"
						placeholder="@tu_usuario"
						required
						defaultValue={lookup.instagram ?? ""}
					/>
				</div>
				<LookupButton />
			</form>

			{hasResults && (
				<div className="space-y-4">
					<p className="font-sans text-neutral-600">
						Hola <span className="text-black">{lookup.clientName}</span> (
						{lookup.instagram})
					</p>
					<h2
						className={tattooDisplayClass(
							"text-xl font-normal sm:text-2xl"
						)}
					>
						Tus citas
					</h2>
					{lookup.appointments!.map((apt) => (
						<AppointmentCardView
							key={apt.id}
							appointment={apt}
							instagram={lookup.instagram!}
						/>
					))}
				</div>
			)}
		</div>
	);
}
