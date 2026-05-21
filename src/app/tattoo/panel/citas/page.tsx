export const dynamic = "force-dynamic";

import { unstable_noStore as noStore } from "next/cache";
import { getPanelDb } from "@/lib/tattoo/panel/db";
import { TattooHeader } from "@/app/tattoo/components/tattoo-shell";
import type { Appointment, Client } from "@/lib/tattoo/panel/types";
import { AppointmentCard } from "@/app/tattoo/panel/citas/appointment-card";
import { CreateManualAppointmentForm } from "@/app/tattoo/panel/citas/create-manual-appointment-form";

export default async function PanelCitasPage() {
	noStore();
	const supabase = getPanelDb();
	const [{ data: appointments, error }, { data: clients }] = await Promise.all([
		supabase
			.from("appointments")
			.select("*, clients(name, email, phone)")
			.order("starts_at", { ascending: true }),
		supabase
			.from("clients")
			.select("id, name, email")
			.order("name", { ascending: true }),
	]);

	if (error) {
		return (
			<>
				<TattooHeader title="Citas" displayTitle />
				<main className="mx-auto max-w-4xl px-4 py-8">
					<p className="font-sans text-sm text-red-600">{error.message}</p>
				</main>
			</>
		);
	}

	const list = (appointments ?? []) as Appointment[];
	const clientList = (clients ?? []) as Pick<Client, "id" | "name" | "email">[];

	return (
		<>
			<TattooHeader title="Citas" displayTitle subtitle="Sesiones programadas" />
			<main className="mx-auto max-w-4xl space-y-4 px-4 py-8 sm:px-6 lg:px-8">
				<CreateManualAppointmentForm clients={clientList} />
				{list.length === 0 ? (
					<p className="font-sans text-neutral-500">No hay citas.</p>
				) : (
					list.map((apt) => <AppointmentCard key={apt.id} appointment={apt} />)
				)}
			</main>
		</>
	);
}
