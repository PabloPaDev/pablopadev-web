import { createClient } from "@/lib/supabase/server";
import { TattooHeader } from "@/app/tattoo/components/tattoo-shell";
import { AppointmentRow } from "@/app/tattoo/admin/appointments/appointment-row";

export default async function TattooAppointmentsPage() {
	const supabase = await createClient();
	const { data: appointments } = await supabase
		.from("appointments")
		.select("*, clients(name)")
		.order("starts_at", { ascending: true });

	return (
		<>
			<TattooHeader
				title="Citas"
				displayTitle
				subtitle="Calendario de sesiones"
			/>
			<main className="mx-auto max-w-4xl space-y-4 px-4 py-8 sm:px-6 lg:px-8">
				{(appointments ?? []).length === 0 ? (
					<p className="text-neutral-500">No hay citas.</p>
				) : (
					appointments?.map((a) => (
						<AppointmentRow key={a.id} appointment={a} />
					))
				)}
			</main>
		</>
	);
}
