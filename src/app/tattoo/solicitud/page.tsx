import Link from "next/link";
import {
	TattooShell,
	tattooDisplayClass,
} from "@/app/tattoo/components/tattoo-shell";
import { SolicitudForm } from "@/app/tattoo/solicitud/solicitud-form";

export default function TattooSolicitudPage() {
	return (
		<TattooShell className="flex min-h-screen flex-col items-center justify-center px-4 py-12 sm:px-6 sm:py-16">
			<div className="w-full max-w-xl space-y-8 border border-neutral-200 bg-white p-8 sm:p-10">
				<header className="relative space-y-3">
					<Link
						href="/tattoo"
						className="inline-block font-sans text-sm text-neutral-500 transition hover:text-black"
					>
						← Volver
					</Link>
					<h1
						className={tattooDisplayClass(
							"text-4xl font-normal sm:text-5xl [transform:scaleX(0.92)] [transform-origin:left]"
						)}
					>
						Solicitud de cita
					</h1>
					<p className="font-sans text-neutral-600">
						Cuéntanos tu proyecto. Te responderemos cuando revisemos la
						solicitud.
					</p>
				</header>
				<SolicitudForm />
			</div>
		</TattooShell>
	);
}
