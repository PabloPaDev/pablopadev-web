export const dynamic = "force-dynamic";

import { unstable_noStore as noStore } from "next/cache";
import { getPanelDb } from "@/lib/tattoo/panel/db";
import { TattooHeader } from "@/app/tattoo/components/tattoo-shell";
import type { AppointmentRequest } from "@/lib/tattoo/panel/types";
import { SolicitudesTable } from "@/app/tattoo/panel/solicitudes/solicitudes-table";

export default async function PanelSolicitudesPage() {
	noStore();
	const supabase = getPanelDb();
	const { data: requests, error } = await supabase
		.from("appointment_requests")
		.select("*")
		.order("created_at", { ascending: false });

	if (error) {
		return (
			<>
				<TattooHeader title="Solicitudes" displayTitle />
				<main className="mx-auto max-w-4xl px-4 py-8">
					<p className="font-sans text-sm text-red-600">{error.message}</p>
				</main>
			</>
		);
	}

	const list = (requests ?? []) as AppointmentRequest[];

	return (
		<>
			<TattooHeader
				title="Solicitudes"
				displayTitle
				subtitle="Confirma citas desde las peticiones entrantes"
			/>
			<main className="mx-auto max-w-6xl px-4 py-8 sm:px-6 lg:px-8">
				{list.length === 0 ? (
					<p className="font-sans text-neutral-500">No hay solicitudes.</p>
				) : (
					<SolicitudesTable requests={list} />
				)}
			</main>
		</>
	);
}
