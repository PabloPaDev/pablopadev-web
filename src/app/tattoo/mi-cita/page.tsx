import Link from "next/link";
import {
	TattooShell,
	tattooDisplayClass,
} from "@/app/tattoo/components/tattoo-shell";
import { MiCitaFlow } from "@/app/tattoo/mi-cita/mi-cita-flow";

export default function TattooMiCitaPage() {
	return (
		<TattooShell className="flex min-h-screen flex-col items-center justify-center px-4 py-12 sm:px-6 sm:py-16">
			<div className="w-full max-w-xl space-y-8 border border-neutral-200 bg-white p-8 sm:p-10">
				<header className="space-y-3">
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
						Ya tengo cita
					</h1>
					<p className="font-sans text-neutral-600">
						Introduce tu Instagram para ver tus citas y pedir un cambio de
						fecha u horario.
					</p>
				</header>
				<MiCitaFlow />
			</div>
		</TattooShell>
	);
}
