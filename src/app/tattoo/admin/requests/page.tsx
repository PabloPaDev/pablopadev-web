import { createClient } from "@/lib/supabase/server";
import { TattooHeader } from "@/app/tattoo/components/tattoo-shell";
import { RequestCard } from "@/app/tattoo/admin/requests/request-card";
import type { AppointmentRequest } from "@/lib/tattoo/types";

export default async function TattooRequestsPage() {
	const supabase = await createClient();
	const { data: requests } = await supabase
		.from("appointment_requests")
		.select("*")
		.order("created_at", { ascending: false });

	return (
		<>
			<TattooHeader
				title="Solicitudes"
				displayTitle
				subtitle="Gestiona las peticiones de cita entrantes"
			/>
			<main className="mx-auto max-w-4xl space-y-4 px-4 py-8 sm:px-6 lg:px-8">
				{(requests ?? []).length === 0 ? (
					<p className="text-neutral-500">No hay solicitudes.</p>
				) : (
					(requests as AppointmentRequest[]).map((request) => (
						<RequestCard key={request.id} request={request} />
					))
				)}
			</main>
		</>
	);
}
