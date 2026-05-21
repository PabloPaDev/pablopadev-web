"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { cn } from "@/lib/utils";
import { tattooDisplayClass } from "@/app/tattoo/components/tattoo-shell";

const links = [
	{ href: "/tattoo/panel", label: "Inicio", exact: true },
	{ href: "/tattoo/panel/solicitudes", label: "Solicitudes" },
	{ href: "/tattoo/panel/citas", label: "Citas" },
	{ href: "/tattoo/panel/clientes", label: "Clientes" },
];

export function PanelNav() {
	const pathname = usePathname();

	return (
		<nav className="border-b border-neutral-200 bg-white">
			<div className="mx-auto flex max-w-6xl flex-wrap items-center gap-1 px-4 py-3 sm:px-6 lg:px-8">
				<span className={tattooDisplayClass("mr-4 text-sm font-normal")}>
					Panel
				</span>
				{links.map(({ href, label, exact }) => {
					const active = exact
						? pathname === href
						: pathname.startsWith(href);
					return (
						<Link
							key={href}
							href={href}
							className={cn(
								"px-3 py-2 font-sans text-sm transition",
								active
									? "bg-black text-white"
									: "text-neutral-600 hover:bg-neutral-100 hover:text-black"
							)}
						>
							{label}
						</Link>
					);
				})}
				<Link
					href="/tattoo"
					className="ml-auto font-sans text-sm text-neutral-500 hover:text-black"
				>
					← Demo pública
				</Link>
			</div>
		</nav>
	);
}
