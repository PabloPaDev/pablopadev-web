import { notFound } from "next/navigation";
import { createClient } from "@/lib/supabase/server";
import { TattooHeader, TattooCard } from "@/app/tattoo/components/tattoo-shell";
import { EditAppointmentForm } from "@/app/tattoo/admin/appointments/[id]/edit/edit-form";
import type { Appointment } from "@/lib/tattoo/types";

export default async function EditAppointmentPage({
	params,
}: {
	params: { id: string };
}) {
	const supabase = await createClient();
	const { data } = await supabase
		.from("appointments")
		.select("*")
		.eq("id", params.id)
		.single();

	if (!data) notFound();

	return (
		<>
			<TattooHeader
				title="Editar cita"
				displayTitle
				subtitle={(data as Appointment).title}
				backHref="/tattoo/admin/appointments"
			/>
			<main className="mx-auto max-w-xl px-4 py-8 sm:px-6 lg:px-8">
				<TattooCard>
					<EditAppointmentForm appointment={data as Appointment} />
				</TattooCard>
			</main>
		</>
	);
}
