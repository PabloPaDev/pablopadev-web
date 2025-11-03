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
          <div className="rounded-xl border border-gray-200 overflow-hidden">
            <Image src="/mi-foto.jpg" alt="Pablo" width={800} height={800} className="w-full h-auto object-cover" />
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
