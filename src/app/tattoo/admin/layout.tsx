import { AdminNav } from "@/app/tattoo/components/admin-nav";
import { TattooShell } from "@/app/tattoo/components/tattoo-shell";

export default function TattooAdminLayout({
	children,
}: {
	children: React.ReactNode;
}) {
	return (
		<TattooShell>
			<AdminNav />
			{children}
		</TattooShell>
	);
}
