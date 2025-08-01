import type { Metadata } from 'next'
import './globals.css'
import Link from "next/link";
import { Button } from "@/components/ui/button";
import { Code2, Github } from "lucide-react";
import { usePathname } from "next/navigation";
import Header from "@/components/Header";

export const metadata: Metadata = {
  title: 'PabloPaDev',
  description: 'Desarrollador Full Stack Junior especializado en backend con Python y Flask. Desarrollo de APIs, aplicaciones web con React, bases de datos y automatización con IA. Portfolio profesional con proyectos reales.',
  keywords: 'desarrollador full stack, python, flask, react, APIs, backend, frontend, bases de datos, automatización IA, desarrollo web, programador',
  authors: [{ name: 'Pablo PaDev' }],
  creator: 'Pablo PaDev',
  publisher: 'Pablo PaDev',
  generator: 'Next.js',
  applicationName: 'PabloPaDev Portfolio',
  referrer: 'origin-when-cross-origin',
  formatDetection: {
    email: false,
    address: false,
    telephone: false,
  },
  metadataBase: new URL('https://pablopadev.es'),
  alternates: {
    canonical: '/',
  },
  openGraph: {
    title: 'PabloPaDev',
    description: 'Desarrollador Full Stack Junior especializado en backend con Python y Flask. Desarrollo de APIs, aplicaciones web con React, bases de datos y automatización con IA.',
    url: 'https://pablopadev.es',
    siteName: 'PabloPaDev',
    images: [
      {
        url: '/logo.png',
        width: 512,
        height: 512,
        alt: 'Pablo PaDev - Desarrollador Full Stack',
        type: 'image/png',
      },
    ],
    locale: 'es_ES',
    type: 'website',
  },
  twitter: {
    card: 'summary_large_image',
    title: 'PabloPaDev',
    description: 'Desarrollador Full Stack Junior especializado en backend con Python y Flask. Desarrollo de APIs, aplicaciones web con React, bases de datos y automatización con IA.',
    images: ['/logo.png'],
    creator: '@PabloPaDev',
    site: '@PabloPaDev',
  },
  robots: {
    index: true,
    follow: true,
    googleBot: {
      index: true,
      follow: true,
      'max-video-preview': -1,
      'max-image-preview': 'large',
      'max-snippet': -1,
    },
  },
  verification: {
    google: 'tu-codigo-de-verificacion-google',
    yandex: 'tu-codigo-de-verificacion-yandex',
    yahoo: 'tu-codigo-de-verificacion-yahoo',
  },
  category: 'technology',
}

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="es">
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
