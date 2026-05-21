"use client";

import { useRouter } from "next/navigation";
import { TattooInput } from "@/app/tattoo/components/tattoo-shell";
import { useState } from "react";

export function ClientsSearch({ defaultValue }: { defaultValue: string }) {
	const router = useRouter();
	const [q, setQ] = useState(defaultValue);

	return (
		<form
			onSubmit={(e) => {
				e.preventDefault();
				const params = new URLSearchParams();
				if (q.trim()) params.set("q", q.trim());
				router.push(`/tattoo/admin/clients?${params.toString()}`);
			}}
			className="flex gap-2"
		>
			<TattooInput
				value={q}
				onChange={(e) => setQ(e.target.value)}
				placeholder="Buscar por nombre, email, instagram o teléfono…"
				className="flex-1"
			/>
			<button
				type="submit"
				className="bg-black px-4 py-2 font-sans text-sm font-medium text-white hover:bg-neutral-800"
			>
				Buscar
			</button>
		</form>
	);
}
