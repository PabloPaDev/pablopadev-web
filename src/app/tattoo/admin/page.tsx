import Link from "next/link";
import { createClient } from "@/lib/supabase/server";
import { TattooHeader, TattooCard, StatusBadge } from "@/app/tattoo/components/tattoo-shell";
import { formatDateTime } from "@/lib/tattoo/emails";

export default async function TattooAdminDashboard() {
	const supabase = await createClient();
	const now = new Date().toISOString();

	const [
		{ count: pendingCount },
		{ count: clientsCount },
		{ count: upcomingCount },
		{ count: emailsCount },
		{ data: recentRequests },
		{ data: upcomingAppointments },
	] = await Promise.all([
		supabase
			.from("appointment_requests")
			.select("*", { count: "exact", head: true })
			.eq("status", "pending"),
		supabase.from("clients").select("*", { count: "exact", head: true }),
		supabase
			.from("appointments")
			.select("*", { count: "exact", head: true })
			.eq("status", "confirmed")
			.gte("starts_at", now),
		supabase.from("email_logs").select("*", { count: "exact", head: true }),
		supabase
			.from("appointment_requests")
			.select("*")
			.eq("status", "pending")
			.order("created_at", { ascending: false })
			.limit(5),
		supabase
			.from("appointments")
			.select("*, clients(name)")
			.eq("status", "confirmed")
			.gte("starts_at", now)
			.order("starts_at", { ascending: true })
			.limit(5),
	]);

	const stats = [
		{ label: "Solicitudes pendientes", value: pendingCount ?? 0, href: "/tattoo/admin/requests" },
		{ label: "Clientes totales", value: clientsCount ?? 0, href: "/tattoo/admin/clients" },
		{ label: "Próximas citas", value: upcomingCount ?? 0, href: "/tattoo/admin/appointments" },
		{ label: "Emails enviados", value: emailsCount ?? 0, href: "/tattoo/admin" },
	];

	return (
		<>
			<TattooHeader
				title="Dashboard"
				displayTitle
				subtitle="Resumen del estudio"
			/>
			<main className="mx-auto max-w-6xl space-y-10 px-4 py-8 sm:px-6 lg:px-8">
				<div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
					{stats.map((stat) => (
						<Link key={stat.label} href={stat.href}>
							<TattooCard className="transition hover:border-black">
								<p className="font-sans text-sm text-neutral-500">{stat.label}</p>
								<p className="mt-2 overflow-visible py-0.5 font-tattoo text-3xl font-normal leading-[1.2] text-black tabular-nums">
									{stat.value}
								</p>
							</TattooCard>
						</Link>
					))}
				</div>

				<section>
					<h2 className="mb-4 text-lg font-semibold text-black">
						Últimas solicitudes pendientes
					</h2>
					<div className="space-y-3">
						{(recentRequests ?? []).length === 0 ? (
							<p className="text-sm text-neutral-500">No hay solicitudes pendientes.</p>
						) : (
							recentRequests?.map((r) => (
								<TattooCard
									key={r.id}
									className="flex flex-wrap items-center justify-between gap-2"
								>
									<div>
										<p className="font-medium">{r.client_name}</p>
										<p className="text-sm text-neutral-500">{r.tattoo_idea}</p>
									</div>
									<StatusBadge status={r.status} />
								</TattooCard>
							))
						)}
					</div>
				</section>

				<section>
					<h2 className="mb-4 text-lg font-semibold text-black">
						Próximas citas
					</h2>
					<div className="space-y-3">
						{(upcomingAppointments ?? []).length === 0 ? (
							<p className="text-sm text-neutral-500">No hay citas próximas.</p>
						) : (
							upcomingAppointments?.map((a) => (
								<TattooCard
									key={a.id}
									className="flex flex-wrap items-center justify-between gap-2"
								>
									<div>
										<p className="font-medium">{a.title}</p>
										<p className="text-sm text-neutral-500">
											{(a.clients as { name: string } | null)?.name ?? "Cliente"} ·{" "}
											{formatDateTime(a.starts_at)}
										</p>
									</div>
									<StatusBadge status={a.status} />
								</TattooCard>
							))
						)}
					</div>
				</section>
			</main>
		</>
	);
}
