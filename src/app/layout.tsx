import type { Metadata } from "next";
import "./globals.css";
import { ThemeProvider } from "@/components/theme-provider";
import { Analytics } from "@/components/analytics";
import NoScriptStyles from "@/components/noscript-styles";

const siteUrl = "https://pablopadev.com";
const title = "Pablo Palacios | Estudiante DAM y desarrollador web";
const description =
	"Portfolio de Pablo Palacios, estudiante de Desarrollo de Aplicaciones Multiplataforma. Proyectos personales y freelance en desarrollo web.";

export const metadata: Metadata = {
	metadataBase: new URL(siteUrl),
	title,
	description,
	icons: {
		icon: "/logo.png",
	},
	openGraph: {
		title,
		description,
		url: siteUrl,
		siteName: "Pablo Palacios",
		locale: "es_ES",
		type: "website",
	},
};

export default function RootLayout({
	children,
}: {
	children: React.ReactNode;
}) {
	return (
		<html lang="es" suppressHydrationWarning>
			<body>
				<ThemeProvider
					attribute="class"
					defaultTheme="light"
					enableSystem
					disableTransitionOnChange
				>
					<NoScriptStyles />
					{children}
					<Analytics />
				</ThemeProvider>
			</body>
		</html>
	);
}
