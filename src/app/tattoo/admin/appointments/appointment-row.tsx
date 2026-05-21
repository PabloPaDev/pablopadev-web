"use client";

import Link from "next/link";
import { useTransition } from "react";
import { updateAppointmentStatusAction } from "@/app/tattoo/admin/appointments/actions";
import { TattooCard, StatusBadge } from "@/app/tattoo/components/tattoo-shell";
import { formatDateTime } from "@/lib/tattoo/emails";

type Row = {
	id: string;
	title: string;
	starts_at: string;
	status: string;
	price_estimate: number | null;
	deposit_paid: number | null;
	clients: { name: string } | null;
};

export function AppointmentRow({ appointment }: { appointment: Row }) {
	const [pending, startTransition] = useTransition();

	return (
		<TattooCard className="space-y-3">
			<div className="flex flex-wrap items-start justify-between gap-2">
				<div>
					<Link
						href={`/tattoo/admin/appointments/${appointment.id}/edit`}
						className="font-semibold text-black underline-offset-4 hover:underline"
					>
						{appointment.title}
					</Link>
					<p className="text-sm text-neutral-500">
						{appointment.clients?.name ?? "—"} ·{" "}
						{formatDateTime(appointment.starts_at)}
					</p>
				</div>
				<StatusBadge status={appointment.status} />
			</div>
			<div className="flex flex-wrap gap-4 text-sm text-neutral-600">
				<span>
					Precio est.:{" "}
					{appointment.price_estimate != null
						? `${appointment.price_estimate} €`
						: "—"}
				</span>
				<span>
					Señal:{" "}
					{appointment.deposit_paid != null
						? `${appointment.deposit_paid} €`
						: "—"}
				</span>
			</div>
			<div className="flex flex-wrap gap-2 border-t border-neutral-200 pt-3">
				<button
					type="button"
					disabled={pending}
					onClick={() =>
						startTransition(() => {
							void updateAppointmentStatusAction(appointment.id, "completed");
						})
					}
					className="border border-neutral-300 px-3 py-1 font-sans text-xs hover:border-black disabled:opacity-50"
				>
					Completada
				</button>
				<button
					type="button"
					disabled={pending}
					onClick={() =>
						startTransition(() => {
							void updateAppointmentStatusAction(appointment.id, "cancelled");
						})
					}
					className="border border-neutral-300 px-3 py-1 font-sans text-xs hover:border-red-600 disabled:opacity-50"
				>
					Cancelada
				</button>
				<Link
					href={`/tattoo/admin/appointments/${appointment.id}/edit`}
					className="border border-black px-3 py-1 font-sans text-xs text-black hover:bg-neutral-100"
				>
					Editar
				</Link>
			</div>
		</TattooCard>
	);
}
