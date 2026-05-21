export const dynamic = "force-dynamic";

import { unstable_noStore as noStore } from "next/cache";
import { getPanelDb } from "@/lib/tattoo/panel/db";
import { TattooHeader, TattooCard } from "@/app/tattoo/components/tattoo-shell";
import type { Client } from "@/lib/tattoo/panel/types";

export default async function PanelClientesPage() {
	noStore();
	const supabase = getPanelDb();
	const { data: clients, error } = await supabase
		.from("clients")
		.select("*")
		.order("created_at", { ascending: false });

	if (error) {
		return (
			<>
				<TattooHeader title="Clientes" displayTitle />
				<main className="mx-auto max-w-4xl px-4 py-8">
					<p className="font-sans text-sm text-red-600">{error.message}</p>
				</main>
			</>
		);
	}

	const list = (clients ?? []) as Client[];

	return (
		<>
			<TattooHeader
				title="Clientes"
				displayTitle
				subtitle="Base de datos de clientes"
			/>
			<main className="mx-auto max-w-4xl space-y-3 px-4 py-8 sm:px-6 lg:px-8">
				{list.length === 0 ? (
					<p className="font-sans text-neutral-500">No hay clientes.</p>
				) : (
					list.map((client) => (
						<TattooCard key={client.id} className="space-y-2">
							<p className="font-sans font-semibold text-black">
								{client.name}
							</p>
							<dl className="grid gap-2 font-sans text-sm sm:grid-cols-2">
								<div>
									<dt className="text-neutral-500">Email</dt>
									<dd>{client.email ?? "—"}</dd>
								</div>
								<div>
									<dt className="text-neutral-500">Teléfono</dt>
									<dd>{client.phone ?? "—"}</dd>
								</div>
								<div>
									<dt className="text-neutral-500">Instagram</dt>
									<dd>{client.instagram ?? "—"}</dd>
								</div>
								<div className="sm:col-span-2">
									<dt className="text-neutral-500">Notas</dt>
									<dd className="whitespace-pre-wrap">
										{client.notes ?? "—"}
									</dd>
								</div>
							</dl>
						</TattooCard>
					))
				)}
			</main>
		</>
	);
}
