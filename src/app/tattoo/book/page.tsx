import Link from "next/link";
import {
	TattooShell,
	TattooCard,
	tattooDisplayClass,
} from "@/app/tattoo/components/tattoo-shell";
import { BookingForm } from "@/app/tattoo/book/booking-form";

export default function TattooBookPage() {
	return (
		<TattooShell className="flex min-h-screen flex-col items-center justify-center px-4 py-12 sm:px-6 sm:py-16">
			<div className="w-full max-w-xl space-y-8">
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
						Pedir cita
					</h1>
					<p className="max-w-md font-sans text-neutral-600">
						Completa el formulario y te contactaremos para confirmar tu sesión.
					</p>
				</header>
				<TattooCard>
					<BookingForm />
				</TattooCard>
			</div>
		</TattooShell>
	);
}
