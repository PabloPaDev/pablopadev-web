import type React from "react"
import { Playfair_Display, Inter } from "next/font/google"
import "./globals.css"

const playfair = Playfair_Display({
    subsets: ["latin"],
    variable: "--font-playfair",
    display: "swap",
})

const inter = Inter({
    subsets: ["latin"],
    variable: "--font-inter",
    display: "swap",
})

export default function ArquitecturaLayout({
    children,
}: Readonly<{
    children: React.ReactNode
}>) {
    return (
        <div className={`${playfair.variable} ${inter.variable} font-sans antialiased overflow-x-hidden`}>
            {children}
        </div>
    )
}
