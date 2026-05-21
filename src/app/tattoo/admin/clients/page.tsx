import Link from "next/link";
import { createClient } from "@/lib/supabase/server";
import { TattooHeader, TattooCard } from "@/app/tattoo/components/tattoo-shell";
import { ClientsSearch } from "@/app/tattoo/admin/clients/clients-search";
import type { Client } from "@/lib/tattoo/types";

export default async function TattooClientsPage({
	searchParams,
}: {
	searchParams: { q?: string };
}) {
	const supabase = await createClient();
	const q = searchParams.q?.trim() ?? "";

	let query = supabase.from("clients").select("*").order("created_at", {
		ascending: false,
	});

	if (q) {
		const pattern = `%${q}%`;
		query = query.or(
			`name.ilike.${pattern},email.ilike.${pattern},instagram.ilike.${pattern},phone.ilike.${pattern}`
		);
	}

	const { data: clients } = await query;

	return (
		<>
			<TattooHeader
				title="Clientes"
				displayTitle
				subtitle="Base de datos de clientes"
			/>
			<main className="mx-auto max-w-4xl space-y-6 px-4 py-8 sm:px-6 lg:px-8">
				<ClientsSearch defaultValue={q} />
				<div className="space-y-3">
					{(clients ?? []).length === 0 ? (
						<p className="text-neutral-500">No se encontraron clientes.</p>
					) : (
						(clients as Client[]).map((client) => (
							<Link key={client.id} href={`/tattoo/admin/clients/${client.id}`}>
								<TattooCard className="block transition hover:border-black">
									<p className="font-medium text-black">{client.name}</p>
									<p className="font-sans text-sm text-neutral-500">
										{client.email ?? "—"} · {client.phone ?? "—"}
										{client.instagram ? ` · ${client.instagram}` : ""}
									</p>
								</TattooCard>
							</Link>
						))
					)}
				</div>
			</main>
		</>
	);
}
