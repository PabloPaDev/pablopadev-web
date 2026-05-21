"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { cn } from "@/lib/utils";
import { LayoutDashboard, Calendar, Users, Inbox, LogOut } from "lucide-react";
import { logoutAction } from "@/app/tattoo/login/actions";
import { tattooDisplayClass } from "@/app/tattoo/components/tattoo-shell";

const links = [
	{ href: "/tattoo/admin", label: "Dashboard", icon: LayoutDashboard, exact: true },
	{ href: "/tattoo/admin/requests", label: "Solicitudes", icon: Inbox },
	{ href: "/tattoo/admin/clients", label: "Clientes", icon: Users },
	{ href: "/tattoo/admin/appointments", label: "Citas", icon: Calendar },
];

export function AdminNav() {
	const pathname = usePathname();

	return (
		<nav className="border-b border-neutral-200 bg-white">
			<div className="mx-auto flex max-w-6xl flex-wrap items-center gap-1 px-4 py-3 sm:px-6 lg:px-8">
				<span className={tattooDisplayClass("mr-4 text-sm font-normal")}>
					Admin
				</span>
				{links.map(({ href, label, icon: Icon, exact }) => {
					const active = exact
						? pathname === href
						: pathname.startsWith(href);
					return (
						<Link
							key={href}
							href={href}
							className={cn(
								"inline-flex items-center gap-1.5 px-3 py-2 font-sans text-sm transition",
								active
									? "bg-black text-white"
									: "text-neutral-600 hover:bg-neutral-100 hover:text-black"
							)}
						>
							<Icon className="h-4 w-4" />
							<span className="hidden sm:inline">{label}</span>
						</Link>
					);
				})}
				<form action={logoutAction} className="ml-auto">
					<button
						type="submit"
						className="inline-flex items-center gap-1.5 px-3 py-2 font-sans text-sm text-neutral-500 transition hover:text-black"
					>
						<LogOut className="h-4 w-4" />
						<span className="hidden sm:inline">Salir</span>
					</button>
				</form>
			</div>
		</nav>
	);
}
