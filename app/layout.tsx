import type { Metadata } from 'next'
import './globals.css'
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
      <head>
        {/* Preload de recursos críticos */}
        <link rel="preload" href="/logo.png" as="image" type="image/png" />
        <link rel="preload" href="/mi-foto.jpg" as="image" type="image/jpeg" />
        <link rel="preload" href="/manifest.json" as="application/manifest" />
        
        {/* DNS prefetch para recursos externos */}
        <link rel="dns-prefetch" href="//assets.calendly.com" />
        <link rel="dns-prefetch" href="//coff.ee" />
        
        {/* Preconnect para recursos críticos */}
        <link rel="preconnect" href="https://assets.calendly.com" crossOrigin="anonymous" />
        <link rel="preconnect" href="https://coff.ee" crossOrigin="anonymous" />
        
        {/* Meta tags de rendimiento */}
        <meta name="viewport" content="width=device-width, initial-scale=1, maximum-scale=5" />
        <meta httpEquiv="X-UA-Compatible" content="IE=edge" />
        
        {/* Favicon optimizado */}
        <link rel="icon" type="image/png" sizes="32x32" href="/logo.png?v=2" />
        <link rel="icon" type="image/png" sizes="16x16" href="/logo.png?v=2" />
        <link rel="apple-touch-icon" sizes="180x180" href="/logo-white-bg.png" />
        <link rel="manifest" href="/manifest.json" />
        
        {/* Theme color para PWA */}
        <meta name="theme-color" content="#ffffff" />
        <meta name="msapplication-TileColor" content="#ffffff" />
        <meta name="msapplication-config" content="/browserconfig.xml" />
      </head>
      <body>
        <Header />
        {children}
      </body>
    </html>
  )
}
