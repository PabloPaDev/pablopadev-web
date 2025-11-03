"use client";

import SplashCursor from "@/components/SplashCursor/SplashCursor";
// limpiado: sin iconos de lucide-react en la versión minimal
import Image from "next/image"


// limpieza: sin lazy load innecesario

export default function HomePage() {

  // Landing minimalista en blanco y negro
  return (
    <main className="min-h-screen bg-white text-gray-900 no-scroll-horizontal">
      <SplashCursor TRANSPARENT={true} BACK_COLOR={{ r: 0, g: 0, b: 0 }} />
      <section className="container mx-auto px-4 lg:px-6 py-24 md:py-32">
        <div className="grid md:grid-cols-2 gap-10 items-center">
          <div>
            <h1 className="text-4xl md:text-6xl font-semibold tracking-tight">Desarrollo web</h1>
            <p className="mt-4 text-lg md:text-xl text-gray-700 max-w-2xl">Páginas web, APIs y automatización con IA a medida</p>
            <div className="mt-8 flex flex-wrap gap-3">
              <a href="#contacto" className="px-5 py-3 rounded-md bg-black text-white">Contactar</a>
              <a href="#servicios" className="px-5 py-3 rounded-md border border-gray-300 text-gray-900">Servicios</a>
            </div>
          </div>
          {/* Columna derecha vacía tras limpieza */}
        </div>
      </section>
      <section id="proyectos" className="border-t border-gray-200">
        <div className="container mx-auto px-4 lg:px-6 py-16">
          <h2 className="text-2xl md:text-3xl font-semibold">Proyectos</h2>
          <p className="mt-2 text-gray-700">Previsualiza y accede a las páginas de servicios.</p>
          <div className="mt-8 grid md:grid-cols-3 gap-6">
            <a href="/servicios/desarrollo-web" className="group block border border-gray-200 rounded-xl overflow-hidden bg-white">
              <div className="relative h-48 bg-gray-100">
                <iframe
                  src="/servicios/desarrollo-web"
                  title="Restaurante"
                  loading="lazy"
                  className="absolute inset-0 w-full h-full pointer-events-none"
                />
              </div>
              <div className="p-4">
                <h3 className="font-medium">Restaurante</h3>
                <span className="text-sm text-gray-600 group-hover:underline">Ver página</span>
              </div>
            </a>
            <a href="/servicios/base-datos" className="group block border border-gray-200 rounded-xl overflow-hidden bg-white">
              <div className="relative h-48 bg-gray-100">
                <iframe
                  src="/servicios/base-datos"
                  title="Base de datos"
                  loading="lazy"
                  className="absolute inset-0 w-full h-full pointer-events-none"
                />
              </div>
              <div className="p-4">
                <h3 className="font-medium">Base de datos</h3>
                <span className="text-sm text-gray-600 group-hover:underline">Ver página</span>
              </div>
            </a>
            <a href="/servicios/redes-sociales" className="group block border border-gray-200 rounded-xl overflow-hidden bg-white">
              <div className="relative h-48 bg-gray-100">
                <iframe
                  src="/servicios/redes-sociales"
                  title="Redes Sociales"
                  loading="lazy"
                  className="absolute inset-0 w-full h-full pointer-events-none"
                />
              </div>
              <div className="p-4">
                <h3 className="font-medium">Redes Sociales</h3>
                <span className="text-sm text-gray-600 group-hover:underline">Ver página</span>
              </div>
            </a>
            <a href="/servicios/optimizacion" className="group block border border-gray-200 rounded-xl overflow-hidden bg-white">
              <div className="relative h-48 bg-gray-100">
                <iframe
                  src="/servicios/optimizacion"
                  title="Optimización"
                  loading="lazy"
                  className="absolute inset-0 w-full h-full pointer-events-none"
                />
              </div>
              <div className="p-4">
                <h3 className="font-medium">Optimización</h3>
                <span className="text-sm text-gray-600 group-hover:underline">Ver página</span>
              </div>
            </a>
            <a href="/servicios/apps" className="group block border border-gray-200 rounded-xl overflow-hidden bg-white">
              <div className="relative h-48 bg-gray-100">
                <iframe
                  src="/servicios/apps"
                  title="Apps"
                  loading="lazy"
                  className="absolute inset-0 w-full h-full pointer-events-none"
                />
              </div>
              <div className="p-4">
                <h3 className="font-medium">Apps</h3>
                <span className="text-sm text-gray-600 group-hover:underline">Ver página</span>
              </div>
            </a>
            <a href="/servicios/automatizacion-ia" className="group block border border-gray-200 rounded-xl overflow-hidden bg-white">
              <div className="relative h-48 bg-gray-100">
                <iframe
                  src="/servicios/automatizacion-ia"
                  title="Automatización IA"
                  loading="lazy"
                  className="absolute inset-0 w-full h-full pointer-events-none"
                />
              </div>
              <div className="p-4">
                <h3 className="font-medium">Automatización IA</h3>
                <span className="text-sm text-gray-600 group-hover:underline">Ver página</span>
              </div>
            </a>
          </div>
        </div>
      </section>
      <section id="servicios" className="border-t border-gray-200">
        <div className="container mx-auto px-4 lg:px-6 py-16 grid md:grid-cols-3 gap-6">
          <div className="border border-gray-200 rounded-xl p-6 bg-white">
            <h3 className="font-medium text-lg">Páginas webs</h3>
            <p className="mt-2 text-gray-600">React/Next.js + Tailwind. Rápidas y escalables.</p>
          </div>
          <div className="border border-gray-200 rounded-xl p-6 bg-white">
            <h3 className="font-medium text-lg">APIs y backend</h3>
            <p className="mt-2 text-gray-600">APIs limpias y seguras. Node.js o Python/Flask.</p>
          </div>
          <div className="border border-gray-200 rounded-xl p-6 bg-white">
            <h3 className="font-medium text-lg">Bases de datos</h3>
            <p className="mt-2 text-gray-600">PostgreSQL. Modelado y optimización.</p>
          </div>
        </div>
      </section>

      <section id="sobre-mi" className="border-t border-gray-200">
        <div className="container mx-auto px-4 lg:px-6 py-16 grid md:grid-cols-2 gap-10 items-center">
          <div>
            <h2 className="text-2xl md:text-3xl font-semibold">Sobre mí</h2>
            <p className="mt-4 text-gray-700">Soy Pablo y desde hace un año me dedico al diseño y desarrollo web, dando a cada empresa el valor de marca y personalidad que necesitas.</p>
          </div>
          <div className="rounded-xl border border-gray-200 overflow-hidden w-full max-w-sm mx-auto">
            <Image src="/mi-foto.jpg" alt="Pablo" width={480} height={480} className="w-full h-auto object-cover" />
          </div>
        </div>
      </section>
      <footer id="contacto" className="border-t border-gray-200">
        <div className="container mx-auto px-4 lg:px-6 py-16">
          <h2 className="text-2xl font-semibold">Contacto</h2>
          <p className="mt-2 text-gray-700">pablopadev@gmail.com</p>
          <p className="mt-1 text-gray-700">+34 657 285 571</p>
          <p className="mt-8 text-sm text-gray-500">© {new Date().getFullYear()} PabloPaDev</p>
        </div>
      </footer>
    </main>
  );
}
