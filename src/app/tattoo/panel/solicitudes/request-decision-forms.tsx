"use client";

import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import { useFormState } from "react-dom";
import {
	confirmAppointmentRequestAction,
	rejectAppointmentRequestAction,
	type ConfirmRequestState,
	type RejectRequestState,
} from "@/app/tattoo/panel/solicitudes/actions";
import {
	TattooCard,
	TattooInput,
	TattooTextarea,
} from "@/app/tattoo/components/tattoo-shell";
import { FIRST_CONTACT_APPOINTMENT_TITLE } from "@/lib/tattoo/panel/first-contact";

const CONFIRM_MESSAGE =
	"¿Seguro que quieres aceptar y confirmar esta cita? Se enviará un email al cliente.";
const REJECT_MESSAGE =
	"¿Seguro que quieres rechazar esta solicitud? Se avisará al cliente por email.";

export function RequestDecisionForms({
	requestId,
	onResolved,
}: {
	requestId: string;
	onResolved?: (status: "accepted" | "rejected") => void;
}) {
	const router = useRouter();
	const rejectFormId = `reject-request-${requestId}`;

	const [confirmState, confirmAction] = useFormState(
		confirmAppointmentRequestAction,
		{} as ConfirmRequestState
	);
	const [rejectState, rejectAction] = useFormState(
		rejectAppointmentRequestAction,
		{} as RejectRequestState
	);

	const [actionPending, setActionPending] = useState(false);

	useEffect(() => {
		if (confirmState?.success) {
			setActionPending(false);
			onResolved?.("accepted");
			router.refresh();
		} else if (rejectState?.success) {
			setActionPending(false);
			onResolved?.("rejected");
			router.refresh();
		} else if (confirmState?.error || rejectState?.error) {
			setActionPending(false);
		}
	}, [
		confirmState,
		rejectState,
		onResolved,
		router,
	]);

	return (
		<div className="font-sans text-sm">
			{(confirmState?.error || rejectState?.error) && (
				<p className="mb-2 text-red-600">
					{confirmState?.error ?? rejectState?.error}
				</p>
			)}
			{(confirmState?.success || rejectState?.success) && (
				<p className="mb-2 text-neutral-700">
					{confirmState?.success
						? "Primera cita confirmada. Se ha avisado al cliente."
						: "Solicitud rechazada. Se ha avisado al cliente."}
				</p>
			)}

			<form
				action={confirmAction}
				onSubmit={(e) => {
					if (!window.confirm(CONFIRM_MESSAGE)) {
						e.preventDefault();
						return;
					}
					setActionPending(true);
				}}
				className="mb-8"
			>
				<input type="hidden" name="request_id" value={requestId} />
				<p className="mb-3 text-xs font-medium uppercase tracking-wide text-black">
					Aceptar solicitud
				</p>

				<TattooCard className="mb-4 border-black p-4">
					<p className="font-sans text-base font-medium text-black">
						{FIRST_CONTACT_APPOINTMENT_TITLE}
					</p>
					<p className="mt-1 font-sans text-xs uppercase tracking-wide text-neutral-500">
						Primera toma de contacto
					</p>
				</TattooCard>

				<table className="mb-4 w-full border-collapse">
					<tbody>
						<tr className="border-b border-neutral-100 sm:border-0">
							<th className="w-36 py-2 pr-3 text-left align-top font-medium text-neutral-600">
								Primera cita
							</th>
							<td className="py-2">
								<TattooInput
									type="datetime-local"
									name="starts_at"
									required
								/>
								<p className="mt-1 text-xs text-neutral-500">
									Reunión para hablar del proyecto (aprox. 1 h).
								</p>
							</td>
						</tr>
						<tr className="border-b border-neutral-100 sm:border-0">
							<th className="py-2 pr-3 text-left align-top font-medium text-neutral-600">
								Precio (€)
							</th>
							<td className="py-2">
								<TattooInput
									type="number"
									name="price_estimate"
									step="0.01"
									min="0"
								/>
							</td>
						</tr>
						<tr>
							<th className="py-2 pr-3 text-left align-top font-medium text-neutral-600">
								Notas
							</th>
							<td className="py-2">
								<TattooTextarea name="internal_notes" rows={2} />
							</td>
						</tr>
					</tbody>
				</table>

				<button
					type="submit"
					disabled={actionPending}
					className="border border-black bg-black px-4 py-2 font-sans text-sm text-white hover:bg-neutral-800 disabled:opacity-50"
				>
					{actionPending ? "Confirmando…" : "Aceptar y confirmar cita"}
				</button>
			</form>

			<form
				id={rejectFormId}
				action={rejectAction}
				onSubmit={(e) => {
					if (!window.confirm(REJECT_MESSAGE)) {
						e.preventDefault();
						return;
					}
					setActionPending(true);
				}}
			>
				<input type="hidden" name="request_id" value={requestId} />
				<p className="mb-2 text-xs font-medium uppercase tracking-wide text-black">
					Rechazar solicitud
				</p>
				<TattooTextarea
					name="rejection_reason"
					rows={2}
					placeholder="Motivo opcional (se incluirá en el email al cliente)"
				/>
				<button
					type="submit"
					disabled={actionPending}
					className="mt-3 border border-neutral-300 bg-white px-4 py-2 font-sans text-sm text-black hover:border-black disabled:opacity-50"
				>
					{actionPending ? "Rechazando…" : "Rechazar solicitud"}
				</button>
			</form>
		</div>
	);
}
