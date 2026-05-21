"use client";

import { useEffect, useState, useTransition } from "react";
import { useRouter } from "next/navigation";
import { useFormState, useFormStatus } from "react-dom";
import {
	TattooCard,
	StatusBadge,
	TattooLabel,
	TattooInput,
	TattooTextarea,
	TattooSelect,
} from "@/app/tattoo/components/tattoo-shell";
import {
	formatDateTime,
	toLocalDatetime,
} from "@/lib/tattoo/panel/format";
import type { Appointment } from "@/lib/tattoo/panel/types";
import {
	cancelPanelAppointmentAction,
	deletePanelAppointmentAction,
	updatePanelAppointmentAction,
	type UpdatePanelAppointmentState,
} from "@/app/tattoo/panel/citas/actions";

const CANCEL_APPOINTMENT_MESSAGE =
	"¿Seguro que quieres cancelar esta cita? Si está en Google Calendar, se eliminará el evento.";
const DELETE_APPOINTMENT_MESSAGE =
	"¿Eliminar esta cita cancelada? Esta acción no se puede deshacer.";

function SaveButton() {
	const { pending } = useFormStatus();
	return (
		<button
			type="submit"
			disabled={pending}
			className="border border-black bg-black px-4 py-2 font-sans text-sm text-white hover:bg-neutral-800 disabled:opacity-50"
		>
			{pending ? "Guardando…" : "Guardar cambios"}
		</button>
	);
}

function AppointmentEditForm({
	appointment,
	onCancel,
	onSaved,
}: {
	appointment: Appointment;
	onCancel: () => void;
	onSaved: (patch: NonNullable<UpdatePanelAppointmentState["appointment"]>) => void;
}) {
	const bound = updatePanelAppointmentAction.bind(null, appointment.id);
	const [state, action] = useFormState(bound, {} as UpdatePanelAppointmentState);
	const router = useRouter();

	useEffect(() => {
		if (state?.success && state.appointment) {
			onSaved(state.appointment);
			router.refresh();
		}
	}, [state, onSaved, router]);

	return (
		<form id={`edit-apt-${appointment.id}`} action={action} className="space-y-4">
			{state?.error && (
				<p className="font-sans text-sm text-red-600">{state.error}</p>
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
						min="0"
						defaultValue={
							appointment.price_estimate != null
								? appointment.price_estimate
								: ""
						}
					/>
				</div>
				<div className="flex items-end pb-1">
					<label className="flex cursor-pointer items-center gap-2 font-sans text-sm text-black">
						<input
							type="checkbox"
							name="deposit_paid"
							defaultChecked={appointment.deposit_paid}
							className="h-4 w-4 border border-neutral-300"
						/>
						Señal pagada
					</label>
				</div>
			</div>
			<div className="flex flex-wrap gap-2">
				<SaveButton />
				<button
					type="button"
					onClick={onCancel}
					className="border border-neutral-300 bg-white px-4 py-2 font-sans text-sm text-black hover:border-black"
				>
					Cancelar
				</button>
			</div>
		</form>
	);
}

export function AppointmentCard({ appointment: initial }: { appointment: Appointment }) {
	const [appointment, setAppointment] = useState(initial);
	const [editing, setEditing] = useState(false);
	const [removed, setRemoved] = useState(false);
	const [cancelError, setCancelError] = useState<string | null>(null);
	const [deleteError, setDeleteError] = useState<string | null>(null);
	const [isCancelling, startCancelTransition] = useTransition();
	const [isDeleting, startDeleteTransition] = useTransition();
	const router = useRouter();

	const canCancelAppointment =
		appointment.status !== "cancelled" && appointment.status !== "completed";
	const isCancelled = appointment.status === "cancelled";

	useEffect(() => {
		setAppointment(initial);
	}, [initial]);

	function handleCancelAppointment() {
		if (!window.confirm(CANCEL_APPOINTMENT_MESSAGE)) {
			return;
		}
		setCancelError(null);
		startCancelTransition(() => {
			void cancelPanelAppointmentAction(appointment.id).then((result) => {
				if (result.error) {
					setCancelError(result.error);
					return;
				}
				setAppointment((prev) => ({
					...prev,
					status: "cancelled",
					google_calendar_event_id: null,
				}));
				setEditing(false);
				router.refresh();
			});
		});
	}

	function handleDeleteAppointment() {
		if (!window.confirm(DELETE_APPOINTMENT_MESSAGE)) {
			return;
		}
		setDeleteError(null);
		startDeleteTransition(() => {
			void deletePanelAppointmentAction(appointment.id).then((result) => {
				if (result.error) {
					setDeleteError(result.error);
					return;
				}
				setRemoved(true);
				router.refresh();
			});
		});
	}

	if (removed) {
		return null;
	}

	return (
		<TattooCard className="space-y-3">
			<div className="flex flex-wrap items-start justify-between gap-2">
				<p className="font-sans font-semibold text-black">{appointment.title}</p>
				<div className="flex flex-wrap items-center gap-2">
					<StatusBadge status={appointment.status} />
					{!editing && canCancelAppointment && (
						<>
							<button
								type="button"
								onClick={() => setEditing(true)}
								className="border border-neutral-300 px-3 py-1 font-sans text-xs text-black hover:border-black"
							>
								Modificar
							</button>
							<button
								type="button"
								onClick={handleCancelAppointment}
								disabled={isCancelling}
								className="border border-neutral-300 px-3 py-1 font-sans text-xs text-black hover:border-red-600 disabled:opacity-50"
							>
								{isCancelling ? "Cancelando…" : "Cancelar cita"}
							</button>
						</>
					)}
					{!editing && isCancelled && (
						<button
							type="button"
							onClick={handleDeleteAppointment}
							disabled={isDeleting}
							className="border border-neutral-300 px-3 py-1 font-sans text-xs text-black hover:border-red-600 disabled:opacity-50"
						>
							{isDeleting ? "Borrando…" : "Borrar"}
						</button>
					)}
				</div>
			</div>
			{(cancelError || deleteError) && (
				<p className="font-sans text-sm text-red-600">
					{cancelError ?? deleteError}
				</p>
			)}

			{editing ? (
				<AppointmentEditForm
					appointment={appointment}
					onCancel={() => setEditing(false)}
					onSaved={(patch) => {
						setAppointment((prev) => ({ ...prev, ...patch }));
						setEditing(false);
					}}
				/>
			) : (
				<>
					<p className="font-sans text-sm text-neutral-500">
						{appointment.clients?.name ?? "—"} ·{" "}
						{appointment.clients?.email ?? "—"} ·{" "}
						{appointment.clients?.phone ?? "—"}
					</p>
					{appointment.description && (
						<p className="whitespace-pre-wrap font-sans text-sm text-neutral-700">
							{appointment.description}
						</p>
					)}
					<dl className="grid gap-2 font-sans text-sm sm:grid-cols-2">
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
						<div>
							<dt className="text-neutral-500">Señal pagada</dt>
							<dd>{appointment.deposit_paid ? "Sí" : "No"}</dd>
						</div>
						<div className="sm:col-span-2">
							<dt className="text-neutral-500">Google Calendar</dt>
							<dd>{appointment.google_calendar_event_id ?? "—"}</dd>
						</div>
					</dl>
				</>
			)}
		</TattooCard>
	);
}
