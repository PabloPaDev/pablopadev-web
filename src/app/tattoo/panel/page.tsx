export const dynamic = "force-dynamic";

import { unstable_noStore as noStore } from "next/cache";
import Link from "next/link";
import { getPanelDb } from "@/lib/tattoo/panel/db";
import { formatDateTime } from "@/lib/tattoo/panel/format";
import type { AppointmentRequest } from "@/lib/tattoo/panel/types";
import {
	TattooHeader,
	TattooCard,
	StatusBadge,
	tattooDisplayClass,
} from "@/app/tattoo/components/tattoo-shell";
import { SolicitudesTable } from "@/app/tattoo/panel/solicitudes/solicitudes-table";

export default async function TattooPanelPage() {
	noStore();
	const supabase = getPanelDb();
	const now = new Date().toISOString();

	const [
		{ count: pending },
		{ count: citas },
		{ count: clientes },
		{ data: pendingRequests },
		{ data: upcomingAppointments },
	] = await Promise.all([
		supabase
			.from("appointment_requests")
			.select("*", { count: "exact", head: true })
			.eq("status", "pending"),
		supabase
			.from("appointments")
			.select("*", { count: "exact", head: true })
			.gte("starts_at", now)
			.in("status", ["confirmed", "pending"]),
		supabase.from("clients").select("*", { count: "exact", head: true }),
		supabase
			.from("appointment_requests")
			.select("*")
			.eq("status", "pending")
			.order("created_at", { ascending: false }),
		supabase
			.from("appointments")
			.select("*, clients(name)")
			.gte("starts_at", now)
			.in("status", ["confirmed", "pending"])
			.order("starts_at", { ascending: true })
			.limit(5),
	]);

	const stats = [
		{
			label: "Solicitudes pendientes",
			value: pending ?? 0,
			href: "/tattoo/panel/solicitudes",
		},
		{
			label: "Citas próximas",
			value: citas ?? 0,
			href: "/tattoo/panel/citas",
		},
		{
			label: "Clientes",
			value: clientes ?? 0,
			href: "/tattoo/panel/clientes",
		},
	];

	const pendientes = (pendingRequests ?? []) as AppointmentRequest[];

	return (
		<>
			<TattooHeader
				title="Panel"
				displayTitle
				subtitle="Gestión de citas — demo"
			/>
			<main className="mx-auto max-w-6xl space-y-12 px-4 pb-8 pt-10 sm:px-6 lg:px-8">
				<div className="grid gap-4 sm:grid-cols-3">
					{stats.map((stat) => (
						<TattooCard key={stat.href} className="py-6">
							<Link href={stat.href} className="block">
								<span className="block font-sans text-xs font-medium uppercase tracking-widest text-black">
									{stat.label}
								</span>
								<span className="mt-4 block font-sans text-4xl font-semibold leading-none text-black tabular-nums">
									{stat.value}
								</span>
							</Link>
						</TattooCard>
					))}
				</div>

				<section className="space-y-6">
					<div className="flex flex-wrap items-end justify-between gap-3 border-b border-neutral-200 pb-3">
						<h2
							className={tattooDisplayClass(
								"text-2xl font-normal sm:text-3xl"
							)}
						>
							Pendientes
						</h2>
						<Link
							href="/tattoo/panel/solicitudes"
							className="font-sans text-sm text-black underline-offset-2 hover:underline"
						>
							Vista completa →
						</Link>
					</div>

					{pendientes.length === 0 ? (
						<p className="font-sans text-sm text-black">
							No hay solicitudes pendientes.
						</p>
					) : (
						<SolicitudesTable requests={pendientes} />
					)}
				</section>

				<section className="space-y-4">
					<div className="flex flex-wrap items-end justify-between gap-3 border-b border-neutral-200 pb-3">
						<h2
							className={tattooDisplayClass(
								"text-2xl font-normal sm:text-3xl"
							)}
						>
							Próximas citas
						</h2>
						<Link
							href="/tattoo/panel/citas"
							className="font-sans text-sm text-black underline-offset-2 hover:underline"
						>
							Ver calendario →
						</Link>
					</div>
					{upcomingAppointments?.length === 0 ? (
						<p className="font-sans text-sm text-black">
							No hay citas próximas.
						</p>
					) : (
						<div className="overflow-x-auto border border-neutral-200">
							<table className="w-full border-collapse font-sans text-sm text-black">
								<thead>
									<tr className="border-b border-neutral-200 bg-neutral-50 text-left">
										<th className="p-3 font-medium">Título</th>
										<th className="p-3 font-medium">Cliente</th>
										<th className="p-3 font-medium">Inicio</th>
										<th className="p-3 font-medium">Estado</th>
									</tr>
								</thead>
								<tbody>
									{upcomingAppointments.map((a) => (
										<tr
											key={a.id}
											className="border-b border-neutral-100 last:border-0"
										>
											<td className="p-3 font-medium">{a.title}</td>
											<td className="p-3">
												{(a.clients as { name: string } | null)
													?.name ?? "—"}
											</td>
											<td className="p-3 whitespace-nowrap">
												{formatDateTime(a.starts_at)}
											</td>
											<td className="p-3">
												<StatusBadge status={a.status} />
											</td>
										</tr>
									))}
								</tbody>
							</table>
						</div>
					)}
				</section>
			</main>
		</>
	);
}
