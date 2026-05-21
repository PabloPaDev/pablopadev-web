import Link from "next/link";
import {
	TattooShell,
	TattooButton,
	tattooDisplayClass,
} from "@/app/tattoo/components/tattoo-shell";

export default function TattooLandingPage() {
	return (
		<TattooShell>
			<section className="border-b border-neutral-200">
				<div className="mx-auto max-w-6xl px-4 py-16 sm:px-6 sm:py-24 lg:px-8 lg:py-32">
					<p className="mb-6 font-sans text-xs font-medium uppercase tracking-[0.35em] text-neutral-500">
						Demo — Tattoo Studio
					</p>
					<h1
						className={tattooDisplayClass(
							"max-w-5xl text-[clamp(2.5rem,8vw,5.5rem)] font-normal [transform:scaleX(0.92)] [transform-origin:left]"
						)}
					>
						Arte en la piel,
						<br />
						citas sin complicaciones
					</h1>
					<p className="mt-10 max-w-md font-sans text-base leading-relaxed text-neutral-600 sm:text-lg">
						Estudio de tatuajes. Cuéntanos tu idea, zona y disponibilidad —
						te responderemos para concretar tu sesión.
					</p>
					<div className="mt-12 flex flex-wrap items-center gap-4 sm:gap-6">
						<TattooButton href="/tattoo/solicitud">Pedir cita</TattooButton>
						<TattooButton href="/tattoo/mi-cita" variant="secondary">
							Ya tengo cita
						</TattooButton>
						<TattooButton href="/tattoo/panel" variant="ghost" size="sm">
							Acceso privado →
						</TattooButton>
					</div>
				</div>
			</section>

			<section className="border-b border-neutral-200 bg-neutral-50/50">
				<div className="mx-auto grid max-w-6xl gap-px bg-neutral-200 sm:grid-cols-3">
					{[
						{
							title: "Cuéntanos tu idea",
							text: "Describe el diseño, zona del cuerpo y tamaño aproximado.",
						},
						{
							title: "Revisamos la solicitud",
							text: "El artista valora disponibilidad y encaje del proyecto.",
						},
						{
							title: "Confirmamos la cita",
							text: "Recibes confirmación por email cuando todo esté listo.",
						},
					].map((item) => (
						<div
							key={item.title}
							className="bg-white p-8 sm:p-10"
						>
							<h2
								className={tattooDisplayClass(
									"text-xl font-normal sm:text-2xl"
								)}
							>
								{item.title}
							</h2>
							<p className="mt-4 font-sans text-sm leading-relaxed text-neutral-600">
								{item.text}
							</p>
						</div>
					))}
				</div>
			</section>

			<footer className="py-10 text-center">
				<Link
					href="/"
					className="font-sans text-sm text-neutral-500 transition hover:text-black"
				>
					← Volver al portfolio
				</Link>
			</footer>
		</TattooShell>
	);
}
