import Link from "next/link";
import { cn } from "@/lib/utils";

/** Tipografía display estilo editorial (Didone / Bodoni) */
export function tattooDisplayClass(extra?: string) {
	return cn(
		"font-tattoo uppercase tracking-[-0.05em] leading-[0.92] text-black",
		extra
	);
}

export function TattooShell({
	children,
	className,
}: {
	children: React.ReactNode;
	className?: string;
}) {
	return (
		<div
			className={cn(
				"min-h-screen bg-white text-neutral-900 -mt-16 pt-0 font-sans antialiased",
				className
			)}
		>
			{children}
		</div>
	);
}

export function TattooHeader({
	title,
	subtitle,
	backHref,
	displayTitle,
}: {
	title: string;
	subtitle?: string;
	backHref?: string;
	/** Título en mayúsculas con Bodoni (estilo landing) */
	displayTitle?: boolean;
}) {
	return (
		<header className="relative border-b border-neutral-200 bg-white">
			<div className="mx-auto flex max-w-6xl flex-col gap-2 px-4 py-8 sm:px-6 lg:px-8">
				{backHref && (
					<Link
						href={backHref}
						className="font-sans text-sm text-neutral-500 transition hover:text-black"
					>
						← Volver
					</Link>
				)}
				<h1
					className={cn(
						displayTitle
							? tattooDisplayClass("text-3xl sm:text-4xl lg:text-5xl font-normal")
							: "font-sans text-3xl font-semibold tracking-tight text-black sm:text-4xl"
					)}
				>
					{displayTitle ? title.toUpperCase() : title}
				</h1>
				{subtitle && (
					<p className="max-w-2xl font-sans text-neutral-600">{subtitle}</p>
				)}
			</div>
		</header>
	);
}

export function TattooButton({
	href,
	children,
	variant = "primary",
	size = "default",
	className,
}: {
	href: string;
	children: React.ReactNode;
	variant?: "primary" | "secondary" | "ghost";
	size?: "default" | "sm";
	className?: string;
}) {
	const variants = {
		primary:
			"bg-black text-white hover:bg-neutral-800 border border-black",
		secondary:
			"border border-neutral-300 bg-white text-black hover:border-black hover:bg-neutral-50",
		ghost: "text-neutral-500 hover:text-black",
	};
	const sizes = {
		default: "px-6 py-3 text-sm font-medium tracking-wide",
		sm: "px-3 py-1.5 text-xs font-medium",
	};

	return (
		<Link
			href={href}
			className={cn(
				"inline-flex items-center justify-center font-sans transition",
				variants[variant],
				sizes[size],
				className
			)}
		>
			{children}
		</Link>
	);
}

export function TattooCard({
	children,
	className,
}: {
	children: React.ReactNode;
	className?: string;
}) {
	return (
		<div
			className={cn(
				"border border-neutral-200 bg-white p-5",
				className
			)}
		>
			{children}
		</div>
	);
}

export function TattooLabel({ children }: { children: React.ReactNode }) {
	return (
		<label className="mb-1.5 block font-sans text-sm font-medium text-neutral-800">
			{children}
		</label>
	);
}

export function TattooInput(
	props: React.InputHTMLAttributes<HTMLInputElement>
) {
	const dateLike =
		props.type === "datetime-local" ||
		props.type === "date" ||
		props.type === "time";

	return (
		<input
			{...props}
			className={cn(
				"w-full min-h-11 border border-neutral-300 bg-white px-3 font-sans text-sm leading-normal text-black placeholder:text-neutral-400 focus:border-black focus:outline-none focus:ring-1 focus:ring-black/20",
				dateLike ? "py-3" : "py-2.5",
				props.className
			)}
		/>
	);
}

export function TattooTextarea(
	props: React.TextareaHTMLAttributes<HTMLTextAreaElement>
) {
	return (
		<textarea
			{...props}
			className={cn(
				"w-full border border-neutral-300 bg-white px-3 py-2 font-sans text-sm text-black placeholder:text-neutral-400 focus:border-black focus:outline-none focus:ring-1 focus:ring-black/20",
				props.className
			)}
		/>
	);
}

export function TattooSelect(
	props: React.SelectHTMLAttributes<HTMLSelectElement>
) {
	return (
		<select
			{...props}
			className={cn(
				"w-full border border-neutral-300 bg-white px-3 py-2 font-sans text-sm text-black focus:border-black focus:outline-none focus:ring-1 focus:ring-black/20",
				props.className
			)}
		/>
	);
}

export function StatusBadge({ status }: { status: string }) {
	const styles: Record<string, string> = {
		pending: "bg-neutral-100 text-neutral-800 border-neutral-300",
		accepted: "bg-neutral-900 text-white border-neutral-900",
		rejected: "bg-red-50 text-red-800 border-red-200",
		needs_more_info: "bg-neutral-50 text-neutral-700 border-neutral-300",
		confirmed: "bg-black text-white border-black",
		completed: "bg-neutral-200 text-neutral-800 border-neutral-300",
		cancelled: "bg-red-50 text-red-800 border-red-200",
	};
	const labels: Record<string, string> = {
		pending: "Pendiente",
		accepted: "Aceptada",
		rejected: "Rechazada",
		needs_more_info: "Más info",
		confirmed: "Confirmada",
		completed: "Completada",
		cancelled: "Cancelada",
	};

	return (
		<span
			className={cn(
				"inline-flex border px-2.5 py-0.5 font-sans text-xs font-medium uppercase tracking-wide",
				styles[status] ?? "bg-neutral-100 text-neutral-600 border-neutral-200"
			)}
		>
			{labels[status] ?? status}
		</span>
	);
}
