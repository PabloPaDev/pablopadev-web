import type { Metadata } from 'next'
import './globals.css'
import Link from "next/link";
import { Button } from "@/components/ui/button";
import { Code2, Github } from "lucide-react";
import { usePathname } from "next/navigation";
import Header from "@/components/Header";

export const metadata: Metadata = {
  title: 'PabloPaDev Web',
  description: 'Portfolio de PabloPaDev: desarrollo web, APIs, bases de datos, automatización con IA y más. ¡Solicita tu presupuesto sin compromiso!',
  generator: 'PabloPaDev',
  openGraph: {
    title: 'PabloPaDev Web',
    description: 'Portfolio de PabloPaDev: desarrollo web, APIs, bases de datos, automatización con IA y más. ¡Solicita tu presupuesto sin compromiso!',
    url: 'https://pablopadev-web.vercel.app/',
    siteName: 'PabloPaDev Web',
    images: [
      {
        url: '/placeholder-logo.png',
        width: 400,
        height: 400,
        alt: 'PabloPaDev Logo',
      },
    ],
    locale: 'es_ES',
    type: 'website',
  },
  twitter: {
    card: 'summary',
    title: 'PabloPaDev Web',
    description: 'Portfolio de PabloPaDev: desarrollo web, APIs, bases de datos, automatización con IA y más. ¡Solicita tu presupuesto sin compromiso!',
    images: ['/placeholder-logo.png'],
    creator: '@PabloPaDev',
  },
}

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en">
      <body>
        <Header />
        {children}
        <script
          dangerouslySetInnerHTML={{
            __html: `
              (function() {
                var d = document, s = d.createElement('script');
                s.type = 'text/javascript';
                s.async = true;
                s.src = 'https://assets.calendly.com/assets/external/widget.js';
                var x = d.getElementsByTagName('script')[0];
                x.parentNode.insertBefore(s, x);
              })();
            `
          }}
        />
      </body>
    </html>
  )
}
