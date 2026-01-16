import type { Metadata } from "next";
import "./globals.css";
import { ThemeProvider } from "@/components/theme-provider";
import { Analytics } from "@/components/analytics";
import NoScriptStyles from "@/components/noscript-styles";

export const metadata: Metadata = {
	title: "Portfolio",
	description: "Portfolio",
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
					defaultTheme="system"
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
