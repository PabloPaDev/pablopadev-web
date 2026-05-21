import { TattooShell } from "@/app/tattoo/components/tattoo-shell";
import { PanelNav } from "@/app/tattoo/components/panel-nav";

export default function TattooPanelLayout({
	children,
}: {
	children: React.ReactNode;
}) {
	return (
		<TattooShell>
			<PanelNav />
			{children}
		</TattooShell>
	);
}
