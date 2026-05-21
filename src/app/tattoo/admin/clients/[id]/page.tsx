import { notFound } from "next/navigation";
import Link from "next/link";
import { createClient } from "@/lib/supabase/server";
import { TattooHeader, TattooCard, StatusBadge } from "@/app/tattoo/components/tattoo-shell";
import {
	EditClientForm,
	AddNoteForm,
	UploadFileForm,
} from "@/app/tattoo/admin/clients/[id]/client-forms";
import { formatDateTime } from "@/lib/tattoo/emails";
import type { Client, ClientNote, TattooFile, Appointment } from "@/lib/tattoo/types";

export default async function TattooClientDetailPage({
	params,
}: {
	params: { id: string };
}) {
	const supabase = await createClient();

	const { data: client } = await supabase
		.from("clients")
		.select("*")
		.eq("id", params.id)
		.single();

	if (!client) notFound();

	const [
		{ data: appointments },
		{ data: notes },
		{ data: files },
	] = await Promise.all([
		supabase
			.from("appointments")
			.select("*")
			.eq("client_id", params.id)
			.order("starts_at", { ascending: false }),
		supabase
			.from("client_notes")
			.select("*")
			.eq("client_id", params.id)
			.order("created_at", { ascending: false }),
		supabase
			.from("tattoo_files")
			.select("*")
			.eq("client_id", params.id)
			.order("created_at", { ascending: false }),
	]);

	const c = client as Client;
	const appointmentList = (appointments ?? []) as Appointment[];

	return (
		<>
			<TattooHeader
				title={c.name}
				displayTitle
				subtitle={c.email ?? undefined}
				backHref="/tattoo/admin/clients"
			/>
			<main className="mx-auto max-w-4xl space-y-8 px-4 py-8 sm:px-6 lg:px-8">
				<TattooCard>
					<dl className="grid gap-3 text-sm sm:grid-cols-2">
						<div>
							<dt className="text-neutral-500">Teléfono</dt>
							<dd>{c.phone ?? "—"}</dd>
						</div>
						<div>
							<dt className="text-neutral-500">Instagram</dt>
							<dd>{c.instagram ?? "—"}</dd>
						</div>
					</dl>
				</TattooCard>

				<EditClientForm client={c} />

				<section>
					<h2 className="mb-3 text-lg font-semibold text-black">Citas</h2>
					{appointmentList.length === 0 ? (
						<p className="text-sm text-neutral-500">Sin citas.</p>
					) : (
						<div className="space-y-2">
							{appointmentList.map((a) => (
								<TattooCard key={a.id} className="flex justify-between gap-2">
									<div>
										<Link
											href={`/tattoo/admin/appointments/${a.id}/edit`}
											className="font-medium text-black underline-offset-4 hover:underline"
										>
											{a.title}
										</Link>
										<p className="text-sm text-neutral-500">
											{formatDateTime(a.starts_at)}
										</p>
									</div>
									<StatusBadge status={a.status} />
								</TattooCard>
							))}
						</div>
					)}
				</section>

				<section>
					<h2 className="mb-3 text-lg font-semibold text-black">
						Notas internas
					</h2>
					<div className="mb-4 space-y-2">
						{(notes as ClientNote[] | null)?.map((n) => (
							<TattooCard key={n.id}>
								<p className="text-sm text-neutral-700">{n.note}</p>
								<p className="mt-1 text-xs text-neutral-500">
									{formatDateTime(n.created_at)}
								</p>
							</TattooCard>
						))}
					</div>
					<AddNoteForm clientId={c.id} />
				</section>

				<section>
					<h2 className="mb-3 text-lg font-semibold text-black">
						Archivos / fotos
					</h2>
					<div className="mb-4 grid gap-3 sm:grid-cols-2">
						{(files as TattooFile[] | null)?.map((f) => (
							<TattooCard key={f.id}>
								{f.file_type?.startsWith("image/") ? (
									// eslint-disable-next-line @next/next/no-img-element
									<img
										src={f.file_url}
										alt={f.description ?? "Archivo"}
										className="mb-2 max-h-40 rounded-lg object-cover"
									/>
								) : (
									<a
										href={f.file_url}
										target="_blank"
										rel="noopener noreferrer"
										className="font-sans text-sm text-black underline-offset-4 hover:underline"
									>
										Ver archivo
									</a>
								)}
								{f.description && (
									<p className="text-sm text-neutral-500">{f.description}</p>
								)}
							</TattooCard>
						))}
					</div>
					<UploadFileForm
						clientId={c.id}
						appointmentIds={appointmentList.map((a) => ({
							id: a.id,
							title: a.title,
						}))}
					/>
				</section>
			</main>
		</>
	);
}
