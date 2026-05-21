import type { Metadata } from "next";
import { Bodoni_Moda } from "next/font/google";

const bodoniDisplay = Bodoni_Moda({
	subsets: ["latin"],
	variable: "--font-tattoo-display",
	weight: ["400", "500", "600", "700"],
	display: "swap",
});

export const metadata: Metadata = {
	title: "Tattoo Studio — Demo",
	description: "Sistema de gestión de citas para tatuadores — demo",
};

export default function TattooLayout({
	children,
}: {
	children: React.ReactNode;
}) {
	return (
		<div className={`${bodoniDisplay.variable} tattoo-theme`}>{children}</div>
	);
}
