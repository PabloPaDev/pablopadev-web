"use client";

import { Button } from "@/components/ui/button"
import SplashCursor from "@/components/SplashCursor/SplashCursor";
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Input } from "@/components/ui/input"
import {
  Code2,
  Database,
  Star,
  ArrowRight,
  Github,
  Twitter,
  Linkedin,
  Smartphone,
  Globe,
  Mail,
  Server,
  Layout,
  Zap,
  Coffee,
  Terminal,
  Layers,
  Cloud,
  Sparkles,
  Rocket,
} from "lucide-react"
import Image from "next/image"
import Link from "next/link"
import { HeroSection } from "@/components/HeroSection";
import * as framerMotion from "framer-motion";
const motion = framerMotion.motion;
import { Tooltip, TooltipContent, TooltipProvider, TooltipTrigger } from "@/components/ui/tooltip";
import { useEffect, useState, Suspense, lazy } from "react";

// Lazy load de componentes pesados
const LazyTooltipProvider = lazy(() => import("@/components/ui/tooltip").then(module => ({ default: module.TooltipProvider })));

export default function HomePage() {
  const [showOnlyServices, setShowOnlyServices] = useState(false);

  useEffect(() => {
    if (typeof window !== 'undefined') {
      const hash = window.location.hash;
      if (hash === '#servicios') {
        setShowOnlyServices(true);
        setTimeout(() => {
          const section = document.getElementById('servicios');
          if (section) section.scrollIntoView({ behavior: 'smooth', block: 'center' });
        }, 100);
      } else {
        setShowOnlyServices(false);
      }
      window.addEventListener('hashchange', () => {
        const hash = window.location.hash;
        if (hash === '#servicios') {
          setShowOnlyServices(true);
          setTimeout(() => {
            const section = document.getElementById('servicios');
            if (section) section.scrollIntoView({ behavior: 'smooth', block: 'center' });
          }, 100);
        } else {
          setShowOnlyServices(false);
        }
      });
    }
  }, []);

  useEffect(() => {
    if (typeof window !== 'undefined' && window.location.hash === '#servicios') {
      setTimeout(() => {
        history.replaceState(null, '', window.location.pathname + window.location.search);
        window.scrollBy({ top: -80, behavior: 'smooth' });
      }, 400);
    }
  }, []);

  useEffect(() => {
    if (typeof window !== 'undefined') {
      const params = new URLSearchParams(window.location.search);
      if (params.get('scroll') === 'servicios') {
        setTimeout(() => {
          const section = document.getElementById('servicios');
          if (section) section.scrollIntoView({ behavior: 'smooth', block: 'center' });
          // Limpiar la query de la URL
          const url = window.location.origin + window.location.pathname;
          window.history.replaceState({}, '', url);
        }, 200);
      }
    }
  }, []);

  // Landing minimalista en blanco y negro
  return (
    <main className="min-h-screen bg-white text-gray-900 no-scroll-horizontal">
      <SplashCursor TRANSPARENT={true} BACK_COLOR={{ r: 0, g: 0, b: 0 }} />
      <section className="container mx-auto px-4 lg:px-6 py-24 md:py-32">
        <h1 className="text-4xl md:text-6xl font-semibold tracking-tight">Desarrollo web</h1>
        <p className="mt-4 text-lg md:text-xl text-gray-700 max-w-2xl">Páginas web, APIs y automatización con IA a medida</p>
        <div className="mt-8 flex flex-wrap gap-3">
          <a href="#contacto" className="px-5 py-3 rounded-md bg-black text-white">Contactar</a>
          <a href="#servicios" className="px-5 py-3 rounded-md border border-gray-300 text-gray-900">Servicios</a>
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
      <section id="demos" className="border-t border-gray-200">
        <div className="container mx-auto px-4 lg:px-6 py-16">
          <h2 className="text-2xl md:text-3xl font-semibold">Demos</h2>
          <div className="mt-6 grid gap-6 md:grid-cols-2">
            {[
              { href: "/servicios/desarrollo-web", title: "Desarrollo web" },
              { href: "/servicios/apps", title: "Apps" },
              { href: "/servicios/base-datos", title: "Bases de datos" },
              { href: "/servicios/automatizacion-ia", title: "Automatización con IA" },
            ].map((demo) => (
              <div key={demo.href} className="border border-gray-200 rounded-xl overflow-hidden bg-white">
                <div className="px-4 py-3 border-b border-gray-200 flex items-center justify-between">
                  <span className="font-medium text-gray-900">{demo.title}</span>
                  <a href={demo.href} className="text-sm text-gray-600 hover:underline">Abrir</a>
                </div>
                <div className="w-full h-[420px] bg-gray-50">
                  <iframe
                    src={demo.href}
                    title={demo.title}
                    loading="lazy"
                    className="w-full h-full"
                  />
                </div>
              </div>
            ))}
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

  return (
    <div className="min-h-screen bg-gray-900 no-scroll-horizontal">
      {/* Dynamic Banner */}
      <div className="bg-gradient-to-r from-blue-600/20 via-purple-600/20 to-cyan-600/20 border-b border-gray-800 no-scroll-horizontal">
        <div className="container mx-auto px-4 lg:px-6 py-4">
          <div className="flex items-center justify-center space-x-4 text-center">
            <div className="flex items-center space-x-2">
              <Rocket className="w-5 h-5 text-blue-400" />
              <span className="text-white font-medium">Disponible para nuevos proyectos</span>
            </div>
            <div className="hidden md:block w-px h-6 bg-gray-600"></div>
            <div className="hidden md:flex items-center space-x-2">
              <Zap className="w-5 h-5 text-cyan-400" />
              <span className="text-gray-300">Respuesta en 24h</span>
            </div>
          </div>
        </div>
      </div>

      {!showOnlyServices && (
        <>
          {/* Hero Section */}
          <div className="relative no-scroll-horizontal">
            <HeroSection />
            <div className="absolute left-1/2 -bottom-10 transform -translate-x-1/2 z-10">
              <motion.div
                animate={{ y: [0, 16, 0] }}
                transition={{ repeat: Infinity, duration: 1.6, ease: "easeInOut" }}
              >
                <svg width="32" height="32" viewBox="0 0 32 32" fill="none" xmlns="http://www.w3.org/2000/svg">
                  <path d="M16 6V26M16 26L8 18M16 26L24 18" stroke="#38bdf8" strokeWidth="3" strokeLinecap="round" strokeLinejoin="round" />
                </svg>
              </motion.div>
            </div>
          </div>
          {/* Tech Stack */}
          <section className="py-8 bg-[#0f1621] no-scroll-horizontal">
            <Suspense fallback={<div className="text-center text-white">Cargando...</div>}>
              <LazyTooltipProvider>
                <div className="container mx-auto px-4 lg:px-6">
                  <div className="text-center mb-6">
                    <h2 className="text-xl md:text-2xl font-bold mb-2 text-white drop-shadow-2xl">
                      <span>Stack </span>
                      <span className="text-blue-400">Tecnológico</span>
                    </h2>
                    <p className="text-gray-400 text-sm">Herramientas modernas para desarrollo web completo</p>
                  </div>
                  <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-7 gap-3">
                    {[
                      { name: "React", icon: Code2, color: "from-[hsl(37,44%,60%)] to-[hsl(82,39%,36%)]", desc: "Librería de JavaScript para construir interfaces de usuario interactivas y modernas." },
                      { name: "Next.js", icon: Layout, color: "from-[hsl(37,44%,60%)] to-[hsl(82,39%,36%)]", desc: "Framework para React que permite SSR, rutas y optimización avanzada." },
                      { name: "Node.js", icon: Server, color: "from-[hsl(37,44%,60%)] to-[hsl(82,39%,36%)]", desc: "Entorno de ejecución para JavaScript en el servidor, ideal para APIs rápidas." },
                      { name: "PostgreSQL", icon: Database, color: "from-[hsl(37,44%,60%)] to-[hsl(82,39%,36%)]", desc: "Base de datos relacional potente y de código abierto." },
                      { name: "TypeScript", icon: Terminal, color: "from-[hsl(37,44%,60%)] to-[hsl(82,39%,36%)]", desc: "Superset de JavaScript que añade tipado estático para mayor robustez." },
                      { name: "Python & Flask", icon: Terminal, color: "from-[hsl(37,44%,60%)] to-[hsl(82,39%,36%)]", desc: "Lenguaje y micro-framework para crear APIs y automatizaciones rápidas." },
                      { name: "Automatización IA", icon: Sparkles, color: "from-[hsl(37,44%,60%)] to-[hsl(82,39%,36%)]", desc: "Uso de inteligencia artificial para optimizar procesos y tareas." },
                    ].map((tech, i) => (
                      <motion.div
                        key={tech.name}
                        className="group"
                        initial={{ opacity: 0, y: 40 }}
                        whileInView={{ opacity: 1, y: 0 }}
                        viewport={{ once: true, amount: 0.3 }}
                        transition={{ duration: 0.5, delay: i * 0.08 }}
                      >
                        <Tooltip>
                          <TooltipTrigger asChild>
                            <div className="flex flex-col items-center p-3 rounded-xl bg-gray-800 border border-gray-700 hover:border-blue-500/50 transition-all hover:scale-105 cursor-pointer touch-target">
                              <div
                                className="w-10 h-10 bg-gray-700 rounded-xl flex items-center justify-center mb-2 group-hover:scale-105 transition-all"
                              >
                                <tech.icon className="w-5 h-5 text-white" />
                              </div>
                              <span className="text-gray-300 text-xs font-medium group-hover:text-white transition-colors text-center break-words">
                                {tech.name}
                              </span>
                            </div>
                          </TooltipTrigger>
                          <TooltipContent
                            side="top"
                            className="max-w-xs text-center bg-gradient-to-br from-blue-900 to-cyan-800 text-white rounded-xl shadow-xl px-6 py-4 border border-blue-400 animate-in fade-in zoom-in"
                          >
                            <span className="text-xs text-blue-100">{tech.desc}</span>
                          </TooltipContent>
                        </Tooltip>
                      </motion.div>
                    ))}
                  </div>
                </div>
              </LazyTooltipProvider>
            </Suspense>
          </section>
        </>
      )}

      {/* Services Section */}
      <section id="servicios" className="py-20 no-scroll-horizontal">
        <div className="container mx-auto px-4 lg:px-6 flex flex-col items-center justify-center min-h-[60vh]">
          <div className="text-center mb-16">
            <h2 className="text-3xl md:text-4xl font-bold text-white mb-4">
              ¿En qué te puedo
              <span className="bg-gradient-to-r from-blue-400 to-cyan-400 bg-clip-text text-transparent"> ayudar</span>?
            </h2>
            <p className="text-gray-400 text-lg max-w-2xl mx-auto">
              Servicios especializados en desarrollo web moderno y gestión de datos
            </p>
          </div>
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8 items-stretch w-full max-w-7xl">
            {[
              {
                title: "Desarrollo Web",
                description: "Desarrollo de aplicaciones web completas con React, Next.js y interfaces modernas",
                icon: Globe,
                color: "from-blue-500 to-cyan-400",
              },
              {
                title: "APIs y Backend",
                description: "Desarrollo de APIs REST robustas con Node.js, Express y autenticación segura",
                icon: Server,
                color: "from-purple-500 to-pink-500",
              },
              {
                title: "Bases de Datos",
                description: "Diseño y optimización de bases de datos PostgreSQL, MySQL y MongoDB",
                icon: Database,
                color: "from-green-500 to-emerald-500",
                href: "/servicios/base-datos",
              },
              {
                title: "Redes Sociales",
                description: "Gestión profesional de redes sociales, creación de contenido, estrategia y analítica para potenciar tu marca.",
                icon: Smartphone,
                color: "from-pink-500 to-yellow-400",
              },
              {
                title: "Automatización con IA",
                description: "Automatización de procesos y tareas usando inteligencia artificial y Python. Ahorra tiempo y reduce errores.",
                icon: Sparkles,
                color: "from-yellow-400 to-green-400",
                iconColor: "text-yellow-500",
                iconBg: "bg-yellow-100",
              },
              {
                title: "Optimización",
                description: "Mejora de rendimiento, SEO y experiencia de usuario en aplicaciones existentes",
                icon: Zap,
                color: "from-cyan-500 to-blue-500",
              },
              {
                title: "Apps",
                description: "Desarrollo de aplicaciones móviles multiplataforma (Android/iOS) modernas y funcionales.",
                icon: Smartphone,
                color: "from-green-400 to-blue-500",
                iconColor: "text-green-400",
                iconBg: "bg-green-100",
              },
            ].map((service, i) => {
              const cardContent = (
                <Card
                  key={service.title}
                  className={"bg-gray-800 border-gray-700 hover:border-blue-500/50 transition-all hover:scale-105 group cursor-pointer w-full h-full flex flex-col justify-between touch-target"}
                >
                  <CardHeader>
                    <div
                      className={`w-14 h-14 bg-gradient-to-r ${service.color} rounded-2xl flex items-center justify-center mb-4 group-hover:scale-110 transition-all`}
                    >
                      <service.icon className="w-8 h-8 text-white" />
                    </div>
                    <CardTitle className="text-white group-hover:text-blue-400 transition-colors">
                      {service.title}
                    </CardTitle>
                    <CardDescription className="text-gray-400 group-hover:text-gray-300 transition-colors">
                      {service.description}
                    </CardDescription>
                  </CardHeader>
                </Card>
              );
              if (service.title === "Bases de Datos") {
                return (
                  <Link href="/servicios/base-datos" key={service.title} legacyBehavior>
                    <a style={{ textDecoration: 'none' }} className="w-full h-[240px] min-w-[260px] max-w-[340px] flex flex-col justify-between mx-auto touch-target">{cardContent}</a>
                  </Link>
                );
              }
              if (service.title === "Redes Sociales") {
                return (
                  <Link href="/servicios/redes-sociales" key={service.title} legacyBehavior>
                    <a style={{ textDecoration: 'none' }} className="w-full h-[240px] min-w-[260px] max-w-[340px] flex flex-col justify-between mx-auto touch-target">{cardContent}</a>
                  </Link>
                );
              }
              if (service.title === "Optimización") {
                return (
                  <Link href="/servicios/optimizacion" key={service.title} legacyBehavior>
                    <a style={{ textDecoration: 'none' }} className="w-full h-[240px] min-w-[260px] max-w-[340px] flex flex-col justify-between mx-auto touch-target">{cardContent}</a>
                  </Link>
                );
              }
              if (service.title === "Apps") {
                return (
                  <Link href="/servicios/apps" key={service.title} legacyBehavior>
                    <a style={{ textDecoration: 'none' }} className="w-full h-[240px] min-w-[260px] max-w-[340px] flex flex-col justify-between mx-auto touch-target">{cardContent}</a>
                  </Link>
                );
              }
              if (service.title === "Automatización con IA") {
                return (
                  <Link href="/servicios/automatizacion-ia" key={service.title} legacyBehavior>
                    <a style={{ textDecoration: 'none' }} className="w-full h-[240px] min-w-[260px] max-w-[340px] flex flex-col justify-between mx-auto touch-target">{cardContent}</a>
                  </Link>
                );
              }
              if (service.title === "Desarrollo Web") {
                return (
                  <Link href="/servicios/desarrollo-web" key={service.title} legacyBehavior>
                    <a style={{ textDecoration: 'none' }} className="w-full h-[240px] min-w-[260px] max-w-[340px] flex flex-col justify-between mx-auto touch-target">{cardContent}</a>
                  </Link>
                );
              }
              if (service.title === "APIs y Backend" || service.title === "Aplicaciones Web") {
                return (
                  <Link href="/servicios/desarrollo-web" key={service.title} legacyBehavior>
                    <a style={{ textDecoration: 'none' }} className="w-full h-[240px] min-w-[260px] max-w-[340px] flex flex-col justify-between mx-auto touch-target">{cardContent}</a>
                  </Link>
                );
              }
              return cardContent;
            })}
          </div>
        </div>
      </section>

      {/* About Section */}
      <section id="sobre-mi" className="py-20 no-scroll-horizontal">
        <div className="container mx-auto px-4 lg:px-6">
          <div className="grid lg:grid-cols-2 gap-12 items-center">
            <motion.div
              initial={{ opacity: 0, x: -60 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true, amount: 0.3 }}
              transition={{ duration: 0.7 }}
            >
              <h2 className="text-3xl md:text-4xl font-bold text-white mb-6">
                Hola, soy
                <span className="bg-gradient-to-r from-blue-400 to-cyan-400 bg-clip-text text-transparent"> Pablo</span>
                👋
              </h2>
              <p className="text-gray-300 text-lg mb-6 leading-relaxed">
                Desarrollador Full Stack Junior apasionado por crear soluciones web modernas y eficientes. Me
                especializo en React, Node.js y bases de datos, pero me apasiona la automatización de tareas y la optimización de procesos con IA usando Python y Flask.
              </p>
              <p className="text-gray-300 text-lg mb-8 leading-relaxed">
                Aunque soy junior, mi enfoque está en escribir código limpio, seguir buenas prácticas y entregar
                proyectos que realmente aporten valor. Cada proyecto es una oportunidad de crecimiento.
              </p>
              <div className="grid grid-cols-2 gap-6 mb-8">
                {[
                  {
                    title: "Frontend",
                    subtitle: "React, Next.js, TypeScript, HTML, CSS",
                    icon: Code2,
                    color: "from-blue-500 to-cyan-400",
                  },
                  {
                    title: "Backend",
                    subtitle: "Node.js, Express, Flask, APIs",
                    icon: Server,
                    color: "from-green-500 to-emerald-500",
                  },
                  {
                    title: "Bases de Datos",
                    subtitle: "PostgreSQL, MongoDB",
                    icon: Database,
                    color: "from-purple-500 to-pink-500",
                  },
                  {
                    title: "Siempre",
                    subtitle: "Aprendiendo y mejorando",
                    icon: Coffee,
                    color: "from-orange-500 to-red-500",
                  },
                ].map((skill) => (
                  <div
                    key={skill.title}
                    className="flex items-center space-x-3 p-4 rounded-xl bg-gray-800 border border-gray-700 hover:border-gray-600 transition-all group hover:scale-105 touch-target"
                  >
                    <div
                      className={`w-12 h-12 bg-gradient-to-r ${skill.color} rounded-xl flex items-center justify-center group-hover:scale-110 transition-all`}
                    >
                      <skill.icon className="w-6 h-6 text-white" />
                    </div>
                    <div>
                      <div className="font-semibold text-white group-hover:text-blue-400 transition-colors">
                        {skill.title}
                      </div>
                      <div className="text-sm text-gray-400 group-hover:text-gray-300 transition-colors">
                        {skill.subtitle}
                      </div>
                    </div>
                  </div>
                ))}
              </div>
              <div className="mt-4 flex flex-col items-start gap-3">
                <span className="text-base text-blue-200">¿No necesitas nada ahora, pero quieres apoyar este proyecto?</span>
                <a
                  href="https://coff.ee/pablopadev"
                  target="_blank"
                  rel="noopener noreferrer"
                >
                  <Button className="bg-yellow-400 hover:bg-yellow-500 text-black flex items-center gap-2 px-6 py-3 text-base font-semibold shadow-lg touch-target">
                    <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" width="22" height="22"><path d="M4 17c0 1.657 2.686 3 6 3s6-1.343 6-3" stroke="#a16207" strokeWidth="2" strokeLinecap="round" /><path d="M20 8c0 4.418-3.582 8-8 8s-8-3.582-8-8V7a1 1 0 0 1 1-1h14a1 1 0 0 1 1 1v1Z" fill="#fde68a" stroke="#a16207" strokeWidth="2" /></svg>
                    Invítame a un café
                  </Button>
                </a>
              </div>

            </motion.div>
            <motion.div
              initial={{ opacity: 0, scale: 0.85 }}
              whileInView={{ opacity: 1, scale: 1 }}
              viewport={{ once: true, amount: 0.3 }}
              transition={{ duration: 0.7, delay: 0.2 }}
            >
              <div className="relative">
                <div className="aspect-square bg-gradient-to-br from-blue-500/20 to-cyan-500/20 rounded-3xl overflow-hidden border border-gray-700">
                  <Image
                    src="/mi-foto.jpg"
                    alt="Pablo - Desarrollador"
                    width={500}
                    height={500}
                    className="w-full h-full object-cover"
                    loading="lazy"
                    placeholder="blur"
                    blurDataURL="data:image/jpeg;base64,/9j/4AAQSkZJRgABAQAAAQABAAD/2wBDAAYEBQYFBAYGBQYHBwYIChAKCgkJChQODwwQFxQYGBcUFhYaHSUfGhsjHBYWICwgIyYnKSopGR8tMC0oMCUoKSj/2wBDAQcHBwoIChMKChMoGhYaKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCj/wAARCAABAAEDASIAAhEBAxEB/8QAFQABAQAAAAAAAAAAAAAAAAAAAAv/xAAhEAACAQMDBQAAAAAAAAAAAAABAgMABAUGIWGRkqGx0f/EABUBAQEAAAAAAAAAAAAAAAAAAAMF/8QAGhEAAgIDAAAAAAAAAAAAAAAAAAECEgMRkf/aAAwDAQACEQMRAD8AltJagyeH0AthI5xdrLcNM91BF5pX2HaH9bcfaSXWGaRmknyJckliyjqTzSlT54b6bk+h0R//2Q=="
                    sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
                    priority={false}
                  />
                </div>
                <div className="absolute -bottom-6 -right-6 bg-gray-800 p-6 rounded-2xl border border-gray-700 backdrop-blur-sm hover:scale-105 transition-transform">
                  <div className="text-2xl font-bold text-white">Junior</div>
                  <div className="text-gray-400">cursando 2º de DAM</div>
                </div>
              </div>
            </motion.div>
          </div>
        </div>
      </section>

      {/* Testimonials */}
      <section className="py-20 bg-gray-800/30 no-scroll-horizontal">
        <div className="container mx-auto px-4 lg:px-6">
          <div className="text-center mb-16">
            <h2 className="text-3xl md:text-4xl font-bold text-white mb-4">
              Lo que Dicen de Mi
              <span className="bg-gradient-to-r from-blue-400 to-cyan-400 bg-clip-text text-transparent">Trabajo</span>
            </h2>
            <p className="text-gray-400 text-lg">Feedback real de proyectos completados</p>
          </div>

          <div className="grid md:grid-cols-3 gap-8">
            {[
              {
                name: "Sofia Morant",
                role: "Emprendedora",
                initial: "AM",
                testimonial:
                  "Pablo desarrolló mi landing page perfectamente. A pesar de ser junior, su trabajo es muy profesional y siempre estuvo disponible para dudas.",
              },
              {
                name: "Carles Martinez",
                role: "Startup Founder",
                initial: "JL",
                testimonial:
                  "Excelente trabajo en nuestra API. Código limpio, bien documentado y entregado a tiempo. Definitivamente trabajaré con él de nuevo.",
              },
              {
                name: "Francisco Vicens",
                role: "Diseñadora UX",
                initial: "MR",
                testimonial:
                  "Pablo convirtió mis diseños en una aplicación web perfecta. Muy atento a los detalles y siempre propone mejoras técnicas.",
              },
            ].map((testimonial) => (
              <Card
                key={testimonial.name}
                className="bg-gray-800 border-gray-700 hover:border-blue-500/50 transition-all hover:scale-105 group touch-target"
              >
                <CardHeader>
                  <div className="flex items-center space-x-4">
                    <div className="w-12 h-12 bg-gradient-to-r from-blue-500 to-cyan-400 rounded-full flex items-center justify-center text-white font-bold group-hover:scale-110 transition-transform">
                      {testimonial.initial}
                    </div>
                    <div>
                      <CardTitle className="text-white text-lg group-hover:text-blue-400 transition-colors">
                        {testimonial.name}
                      </CardTitle>
                      <CardDescription className="text-gray-400 group-hover:text-gray-300 transition-colors">
                        {testimonial.role}
                      </CardDescription>
                    </div>
                  </div>
                </CardHeader>
                <CardContent>
                  <div className="flex mb-4">
                    {[...Array(5)].map((_, i) => (
                      <Star key={i} className="w-5 h-5 text-yellow-400 fill-current" />
                    ))}
                  </div>
                  <p className="text-gray-300 group-hover:text-gray-200 transition-colors">
                    "{testimonial.testimonial}"
                  </p>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer id="contacto" className="bg-gray-900 border-t border-gray-800 no-scroll-horizontal">
        <div className="container mx-auto px-4 lg:px-6 py-12">
          <div className="grid md:grid-cols-4 gap-8">
            <div>
              <Link href="/" className="flex items-center space-x-2 mb-4 touch-target">
                <div className="w-8 h-8 rounded-lg flex items-center justify-center overflow-hidden">
                  <Image
                    src="/logo.png"
                    alt="PabloPaDev Logo"
                    width={32}
                    height={32}
                    className="object-cover brightness-0 invert"
                    loading="lazy"
                    sizes="32px"
                  />
                </div>
                <span className="text-xl font-bold text-white">PabloPaDev</span>
              </Link>
              <p className="text-gray-400 mb-4">Desarrollador Full Stack Junior especializado en web moderno</p>
              <div className="flex space-x-4">
                <Link href="#" className="text-gray-400 hover:text-white transition-colors touch-target">
                  <Twitter className="w-5 h-5" />
                </Link>
                <Link href="#" className="text-gray-400 hover:text-white transition-colors touch-target">
                  <Github className="w-5 h-5" />
                </Link>
                <Link href="#" className="text-gray-400 hover:text-white transition-colors touch-target">
                  <Linkedin className="w-5 h-5" />
                </Link>
              </div>
            </div>

            <div>
              <h3 className="text-white font-semibold mb-4">Servicios</h3>
              <ul className="space-y-2">
                {["Aplicaciones Web", "APIs y Backend", "Bases de Datos", "Optimización"].map((service) => (
                  <li key={service}>
                    <Link href="#" className="text-gray-400 hover:text-white transition-colors touch-target">
                      {service}
                    </Link>
                  </li>
                ))}
              </ul>
            </div>

            <div>
              <h3 className="text-white font-semibold mb-4">Tecnologías</h3>
              <ul className="space-y-2">
                {["React & Next.js", "Node.js & Express", "PostgreSQL & MongoDB", "TypeScript", "Java", "Python", "Flask"].map((tech) => (
                  <li key={tech}>
                    <Link href="#" className="text-gray-400 hover:text-white transition-colors touch-target">
                      {tech}
                    </Link>
                  </li>
                ))}
              </ul>
            </div>

            <div>
              <h3 className="text-white font-semibold mb-4">Contacto</h3>
              <ul className="space-y-2">
                <li className="flex items-center text-gray-400">
                  <Mail className="w-4 h-4 mr-2" />
                  pablopadev@gmail.com
                </li>
                <li className="flex items-center text-gray-400">
                  <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 32 32" width="16" height="16" fill="currentColor" className="mr-2"><path d="M16.003 3.2c-7.067 0-12.8 5.733-12.8 12.8 0 2.262.6 4.467 1.733 6.4l-1.8 6.533c-.133.467 0 .933.267 1.267.267.333.667.533 1.133.533.133 0 .267 0 .4-.067l6.533-1.8c1.867 1.067 4 1.733 6.4 1.733 7.067 0 12.8-5.733 12.8-12.8s-5.733-12.8-12.8-12.8zm0 23.467c-2.133 0-4.133-.6-5.867-1.667-.2-.133-.467-.2-.733-.2-.133 0-.267 0-.4.067l-4.867 1.333 1.333-4.867c.067-.267.067-.533-.067-.8-1.067-1.733-1.667-3.733-1.667-5.867 0-6.067 4.933-11 11-11s11 4.933 11 11-4.933 11-11 11zm6.267-8.267c-.333-.167-1.933-.933-2.233-1.033-.3-.1-.5-.167-.7.167-.2.333-.8 1.033-.983 1.233-.183.2-.367.217-.7.05-.333-.167-1.4-.517-2.667-1.65-.983-.883-1.65-1.967-1.85-2.3-.183-.317-.02-.483.15-.65.15-.15.333-.383.5-.567.167-.183.217-.317.333-.533.117-.217.05-.4-.017-.567-.067-.167-.7-1.7-.967-2.333-.25-.6-.5-.517-.7-.517-.183-.017-.4-.017-.617-.017-.217 0-.567.083-.867.4-.3.317-1.133 1.1-1.133 2.683 0 1.583 1.167 3.117 1.333 3.333.167.217 2.3 3.517 5.6 4.8.783.333 1.4.533 1.883.683.792.252 1.513.217 2.083.133.633-.1 1.933-.783 2.2-1.55.267-.767.267-1.417.183-1.55-.083-.133-.3-.217-.633-.367z" /></svg>
                  +34 657 285 571
                </li>
                <li>
                  <Link href="#" className="text-gray-400 hover:text-white transition-colors touch-target">
                    Política de Privacidad
                  </Link>
                </li>
                <li>
                  <Link href="#" className="text-gray-400 hover:text-white transition-colors touch-target">
                    Términos de Servicio
                  </Link>
                </li>
              </ul>
            </div>
          </div>

          <div className="border-t border-gray-800 mt-12 pt-8 text-center">
            <p className="text-gray-400">© 2024 PabloPaDev. Hecho con ❤️ y mucho ☕</p>
          </div>
        </div>
      </footer>
    </div>
  )
}
