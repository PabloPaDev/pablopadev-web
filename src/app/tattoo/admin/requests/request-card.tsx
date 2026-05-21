"use client";

import {
	acceptRequestAction,
	rejectRequestAction,
	needsMoreInfoRequestAction,
} from "@/app/tattoo/admin/requests/actions";
import { TattooCard, StatusBadge } from "@/app/tattoo/components/tattoo-shell";
import type { AppointmentRequest } from "@/lib/tattoo/types";
import { useTransition } from "react";

export function RequestCard({ request }: { request: AppointmentRequest }) {
	const [pending, startTransition] = useTransition();
	const isPending = request.status === "pending";

	return (
		<TattooCard className="space-y-4">
			<div className="flex flex-wrap items-start justify-between gap-2">
				<div>
					<h3 className="font-semibold text-black">{request.client_name}</h3>
					<p className="font-sans text-sm text-neutral-500">{request.client_email}</p>
				</div>
				<StatusBadge status={request.status} />
			</div>
			<dl className="grid gap-2 text-sm sm:grid-cols-2">
				<div>
					<dt className="text-neutral-500">Teléfono</dt>
					<dd>{request.client_phone ?? "—"}</dd>
				</div>
				<div>
					<dt className="text-neutral-500">Instagram</dt>
					<dd>{request.client_instagram ?? "—"}</dd>
				</div>
				<div className="sm:col-span-2">
					<dt className="text-neutral-500">Idea</dt>
					<dd>{request.tattoo_idea}</dd>
				</div>
				<div>
					<dt className="text-neutral-500">Zona</dt>
					<dd>{request.body_zone ?? "—"}</dd>
				</div>
				<div>
					<dt className="text-neutral-500">Tamaño</dt>
					<dd>{request.size_estimate ?? "—"}</dd>
				</div>
				<div>
					<dt className="text-neutral-500">Fecha preferida</dt>
					<dd>{request.preferred_date ?? "—"}</dd>
				</div>
				<div>
					<dt className="text-neutral-500">Disponibilidad</dt>
					<dd>{request.preferred_time_text ?? "—"}</dd>
				</div>
			</dl>
			{isPending && (
				<div className="flex flex-wrap gap-2 border-t border-neutral-200 pt-4">
					<button
						type="button"
						disabled={pending}
						onClick={() =>
							startTransition(() => {
								void acceptRequestAction(request.id);
							})
						}
						className="rounded-lg bg-emerald-600 px-3 py-1.5 text-xs font-medium text-white hover:bg-emerald-500 disabled:opacity-50"
					>
						Aceptar
					</button>
					<button
						type="button"
						disabled={pending}
						onClick={() =>
							startTransition(() => {
								void rejectRequestAction(request.id);
							})
						}
						className="rounded-lg bg-red-600/80 px-3 py-1.5 text-xs font-medium text-white hover:bg-red-500 disabled:opacity-50"
					>
						Rechazar
					</button>
					<button
						type="button"
						disabled={pending}
						onClick={() =>
							startTransition(() => {
								void needsMoreInfoRequestAction(request.id);
							})
						}
						className="border border-neutral-300 px-3 py-1.5 font-sans text-xs font-medium text-neutral-700 hover:border-black disabled:opacity-50"
					>
						Más información
					</button>
				</div>
			)}
		</TattooCard>
	);
}
