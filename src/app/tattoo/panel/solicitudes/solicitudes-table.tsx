"use client";

import { useEffect, useState } from "react";
import { StatusBadge } from "@/app/tattoo/components/tattoo-shell";
import { formatDateTime } from "@/lib/tattoo/panel/format";
import type { AppointmentRequest } from "@/lib/tattoo/panel/types";
import { RequestDecisionForms } from "@/app/tattoo/panel/solicitudes/request-decision-forms";

function truncate(text: string, max = 40) {
	if (text.length <= max) return text;
	return `${text.slice(0, max).trimEnd()}…`;
}

export function buildRequestSummaryLine(request: AppointmentRequest) {
	const parts: string[] = [];
	if (request.body_zone) parts.push(request.body_zone);
	if (request.size_estimate) parts.push(request.size_estimate);
	if (request.tattoo_idea) parts.push(truncate(request.tattoo_idea));
	if (request.preferred_time_text) parts.push(request.preferred_time_text);
	if (request.preferred_date) {
		parts.push(formatDateTime(request.preferred_date));
	}
	if (request.client_instagram) parts.push(request.client_instagram);
	return parts.length > 0 ? parts.join(" · ") : "—";
}

const thClass = "p-3 font-medium";
const tdClass = "p-3 align-top";

export function SolicitudesTable({
	requests,
	showConfirm = true,
}: {
	requests: AppointmentRequest[];
	showConfirm?: boolean;
}) {
	return (
		<div className="overflow-x-auto border border-neutral-200">
			<table className="w-full min-w-[640px] border-collapse font-sans text-sm text-black">
				<thead>
					<tr className="border-b border-neutral-200 bg-neutral-50 text-left">
						<th className={thClass}>Cliente</th>
						<th className={thClass}>Contacto</th>
						<th className={thClass}>Resumen</th>
						<th className={thClass}>Estado</th>
					</tr>
				</thead>
				<tbody>
					{requests.map((req) => (
						<SolicitudTableGroup
							key={req.id}
							request={req}
							showConfirm={showConfirm}
						/>
					))}
				</tbody>
			</table>
		</div>
	);
}

function SolicitudTableGroup({
	request,
	showConfirm,
}: {
	request: AppointmentRequest;
	showConfirm: boolean;
}) {
	const [status, setStatus] = useState(request.status);

	useEffect(() => {
		setStatus(request.status);
	}, [request.status]);

	const summary = buildRequestSummaryLine(request);
	const canConfirm = showConfirm && status === "pending";

	return (
		<>
			<tr className="border-b border-neutral-100">
				<td className={`${tdClass} font-medium`}>{request.client_name}</td>
				<td className={`${tdClass} text-neutral-700`}>
					<div>{request.client_email}</div>
					{request.client_phone && (
						<div className="text-neutral-600">{request.client_phone}</div>
					)}
					{request.client_instagram && (
						<div className="text-neutral-600">{request.client_instagram}</div>
					)}
				</td>
				<td className={`${tdClass} max-w-[280px] text-neutral-800`}>
					{summary}
				</td>
				<td className={tdClass}>
					<StatusBadge status={status} />
				</td>
			</tr>
			<tr className="border-b border-neutral-200 last:border-0">
				<td colSpan={4} className="bg-neutral-50/50 p-0">
					<details className="group">
						<summary className="cursor-pointer list-none px-3 py-2 font-sans text-xs text-neutral-600 hover:text-black [&::-webkit-details-marker]:hidden">
							<span className="group-open:hidden">
								Ver detalle
								{canConfirm ? " · Aceptar o rechazar" : ""} ↓
							</span>
							<span className="hidden group-open:inline">
								Ocultar ↑
							</span>
						</summary>
						<div className="border-t border-neutral-200 bg-white px-3 pb-4 pt-3">
							<table className="mb-4 w-full border-collapse font-sans text-sm">
								<tbody>
									<DetailRow
										label="Teléfono"
										value={request.client_phone}
									/>
									<DetailRow
										label="Instagram"
										value={request.client_instagram}
									/>
									<DetailRow label="Idea" value={request.tattoo_idea} />
									<DetailRow label="Zona" value={request.body_zone} />
									<DetailRow
										label="Tamaño"
										value={request.size_estimate}
									/>
									<DetailRow
										label="Fecha preferida"
										value={formatDateTime(request.preferred_date)}
									/>
									<DetailRow
										label="Hora preferida"
										value={request.preferred_time_text}
									/>
									{request.internal_notes && (
										<DetailRow
											label="Notas internas"
											value={request.internal_notes}
										/>
									)}
								</tbody>
							</table>
							{canConfirm && (
								<div className="mt-4 border-t border-neutral-200 pt-4">
									<RequestDecisionForms
										requestId={request.id}
										onResolved={setStatus}
									/>
								</div>
							)}
						</div>
					</details>
				</td>
			</tr>
		</>
	);
}

function DetailRow({
	label,
	value,
}: {
	label: string;
	value: string | null | undefined;
}) {
	return (
		<tr className="border-b border-neutral-100 last:border-0">
			<th className="w-36 py-2 pr-4 text-left font-medium text-neutral-600">
				{label}
			</th>
			<td className="py-2 text-black">{value ?? "—"}</td>
		</tr>
	);
}
