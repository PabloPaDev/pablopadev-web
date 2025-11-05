"use client"

import { Button } from "@/components/ui/button"
import Link from "next/link"
import { useState, useRef, useEffect } from "react"

const hoverSections = [
    {
        title: "Quiénes somos",
        description: "Estudio de arquitectura dedicado a crear espacios unicos y personalizados para cada cliente.",
        position: { x: 20, y: 30 },
    },
    {
        title: "Nuestros proyectos",
        description: "Explora nuestros proyectos residenciales y comerciales que reflejan la personalidad de nuestros clientes.",
        position: { x: 50, y: 50 },
        link: "#servicios",
    },
    {
        title: "Contacto",
        description: "Conversemos sobre tu proyecto. Estamos listos para transformar tus ideas en realidad.",
        position: { x: 80, y: 70 },
        link: "#contacto",
    },
]

export default function Home() {
    const [hoveredSection, setHoveredSection] = useState<number | null>(null)
    const imageRef = useRef<HTMLDivElement>(null)
    const servicesRef = useRef<HTMLElement>(null)
    const contactRef = useRef<HTMLElement>(null)
    const footerRef = useRef<HTMLElement>(null)

    useEffect(() => {
        const observerOptions = {
            threshold: 0.1,
            rootMargin: "0px 0px -50px 0px",
        }

        const observer = new IntersectionObserver((entries) => {
            entries.forEach((entry) => {
                if (entry.isIntersecting) {
                    entry.target.classList.add("animate-in")
                }
            })
        }, observerOptions)

        const elements = [servicesRef.current, contactRef.current, footerRef.current].filter(Boolean) as HTMLElement[]
        elements.forEach((el) => observer.observe(el))

        return () => {
            elements.forEach((el) => observer.unobserve(el))
        }
    }, [])

    const handleMouseMove = (e: React.MouseEvent<HTMLDivElement>) => {
        if (!imageRef.current) return

        const rect = imageRef.current.getBoundingClientRect()
        const x = ((e.clientX - rect.left) / rect.width) * 100
        const y = ((e.clientY - rect.top) / rect.height) * 100

        // Determinar qué sección mostrar basado en la posición del mouse
        let closestSection = 0
        let minDistance = Infinity

        hoverSections.forEach((section, index) => {
            const distance = Math.sqrt(
                Math.pow(x - section.position.x, 2) + Math.pow(y - section.position.y, 2)
            )
            if (distance < minDistance) {
                minDistance = distance
                closestSection = index
            }
        })

        // Solo mostrar si está cerca de alguna sección (dentro de 30% de distancia)
        if (minDistance < 30) {
            setHoveredSection(closestSection)
        } else {
            setHoveredSection(null)
        }
    }

    const handleMouseLeave = () => {
        setHoveredSection(null)
    }

    return (
        <main className="min-h-screen bg-background overflow-x-hidden" style={{ overflowY: 'visible' }}>
            <header className="fixed top-0 left-0 right-0 z-50 bg-black/20 backdrop-blur-sm">
                <nav className="container mx-auto px-4 sm:px-6 py-4 sm:py-6 flex items-center justify-between">
                    <div className="text-sm sm:text-xl md:text-2xl font-serif tracking-wide text-white/90">ESTUDIO ARQUITECTURA ALESI</div>
                    <div className="flex items-center gap-2 sm:gap-4 md:gap-8">
                        <div className="hidden md:flex gap-8 text-sm">
                            <a href="#servicios" className="text-white/80 hover:text-white transition-colors">
                                Servicios
                            </a>
                            <a href="#contacto" className="text-white/80 hover:text-white transition-colors">
                                Contacto
                            </a>
                        </div>
                        <Link
                            href="/"
                            className="text-xs sm:text-sm text-white/80 hover:text-white transition-colors px-3 sm:px-4 py-1.5 sm:py-2 border border-white/30 hover:border-white/50 rounded-md"
                        >
                            ← Volver
                        </Link>
                    </div>
                </nav>
            </header>

            <section className="relative h-screen w-full">
                {/* Imagen principal con hover interactivo */}
                <div
                    ref={imageRef}
                    className="relative h-full w-full cursor-pointer"
                    onMouseMove={handleMouseMove}
                    onMouseLeave={handleMouseLeave}
                >
                    <img
                        src="/images/arquitectura-hero.png"
                        alt="Casa moderna de arquitectura contemporánea al atardecer"
                        className="w-full h-full object-cover"
                        onError={(e) => {
                            const target = e.target as HTMLImageElement
                            if (target.src !== "https://hebbkx1anhila5yf.public.blob.vercel-storage.com/image.png-2Ncig4kkdzQiCyVIcV0UegCUJ4bjkr.jpeg") {
                                target.src = "https://hebbkx1anhila5yf.public.blob.vercel-storage.com/image.png-2Ncig4kkdzQiCyVIcV0UegCUJ4bjkr.jpeg"
                            }
                        }}
                    />
                    {/* Overlay oscuro para mejor legibilidad */}
                    <div className="absolute inset-0 bg-black/30" />

                    {/* Información que aparece al pasar el mouse */}
                    {hoverSections.map((section, index) => (
                        <div
                            key={index}
                            className={`absolute z-20 transition-all duration-700 ease-out ${hoveredSection === index
                                ? "opacity-100 translate-y-0 scale-100 pointer-events-auto"
                                : "opacity-0 translate-y-4 scale-95 pointer-events-none"
                                }`}
                            style={{
                                left: `${section.position.x}%`,
                                top: `${section.position.y}%`,
                                transform: hoveredSection === index
                                    ? "translate(-50%, -50%) scale(1)"
                                    : "translate(-50%, -50%) scale(0.95)",
                                transition: "opacity 700ms ease-out, transform 700ms ease-out",
                            }}
                        >
                            <div className="bg-white/40 backdrop-blur-md rounded-xl sm:rounded-2xl p-4 sm:p-6 md:p-8 shadow-lg border border-white/30 max-w-xs sm:max-w-md mx-2 sm:mx-0">
                                <h3 className="text-lg sm:text-2xl md:text-3xl font-serif text-white mb-2 sm:mb-3 drop-shadow-lg">
                                    {section.title}
                                </h3>
                                <p className="text-sm sm:text-base md:text-lg text-white/95 leading-relaxed mb-3 sm:mb-4 drop-shadow-md">
                                    {section.description}
                                </p>
                                {section.link && (
                                    <a
                                        href={section.link}
                                        className="inline-block text-xs sm:text-sm font-medium text-white hover:text-white/80 underline transition-colors duration-300 drop-shadow-sm"
                                    >
                                        Ver más →
                                    </a>
                                )}
                            </div>
                        </div>
                    ))}
                </div>

                {/* Indicador de scroll */}
                <div className="absolute bottom-4 sm:bottom-8 left-1/2 -translate-x-1/2 z-10">
                    <div className="w-5 h-8 sm:w-6 sm:h-10 border-2 border-white/70 rounded-full flex items-start justify-center p-1.5 sm:p-2">
                        <div className="w-1 h-2 sm:h-3 bg-white/70 rounded-full animate-bounce" />
                    </div>
                </div>
            </section>

            {/* Services Section */}
            <section ref={servicesRef} id="servicios" className="py-12 sm:py-16 md:py-24 px-4 sm:px-6 bg-stone-100 opacity-0 translate-y-8 transition-all duration-700 ease-out">
                <div className="container mx-auto max-w-6xl">
                    <h2 className="text-2xl sm:text-3xl md:text-4xl lg:text-5xl font-serif text-center mb-8 sm:mb-12 md:mb-16 text-stone-900">Nuestros Servicios</h2>

                    <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-6 sm:gap-8">
                        <div className="text-center px-4 sm:px-0">
                            <h3 className="text-lg sm:text-xl font-serif mb-2 sm:mb-3 text-stone-900">Diseño Arquitectónico</h3>
                            <p className="text-xs sm:text-sm text-stone-600 leading-relaxed">
                                Proyectos residenciales y comerciales con enfoque en diseño contemporáneo y sostenible.
                            </p>
                        </div>

                        <div className="text-center px-4 sm:px-0">
                            <h3 className="text-lg sm:text-xl font-serif mb-2 sm:mb-3 text-stone-900">Remodelaciones</h3>
                            <p className="text-xs sm:text-sm text-stone-600 leading-relaxed">
                                Transformamos espacios existentes con soluciones innovadoras y funcionales.
                            </p>
                        </div>

                        <div className="text-center px-4 sm:px-0 sm:col-span-2 md:col-span-1">
                            <h3 className="text-lg sm:text-xl font-serif mb-2 sm:mb-3 text-stone-900">Consultoría</h3>
                            <p className="text-xs sm:text-sm text-stone-600 leading-relaxed">
                                Asesoramiento profesional en todas las etapas de tu proyecto arquitectónico.
                            </p>
                        </div>
                    </div>
                </div>
            </section>

            {/* Contact Section */}
            <section ref={contactRef} id="contacto" className="py-12 sm:py-16 md:py-24 px-4 sm:px-6 bg-stone-200 opacity-0 translate-y-8 transition-all duration-700 ease-out">
                <div className="container mx-auto max-w-4xl text-center">
                    <h2 className="text-2xl sm:text-3xl md:text-4xl lg:text-5xl font-serif mb-6 sm:mb-8 text-stone-900">¿Hacemos algo juntos?</h2>
                    <p className="text-sm sm:text-base text-stone-700 mb-8 sm:mb-12 leading-relaxed px-4 sm:px-0">
                        Estamos listos para transformar tus ideas en realidad. Contáctanos para una consulta inicial.
                    </p>

                    <div className="flex flex-col sm:flex-row gap-3 sm:gap-4 justify-center items-stretch sm:items-center px-4 sm:px-0">
                        <input
                            type="email"
                            placeholder="Tu correo electrónico"
                            className="px-4 sm:px-6 py-3 sm:py-3 bg-white border border-stone-400 text-stone-900 placeholder:text-stone-600 focus:outline-none focus:ring-2 focus:ring-stone-900 focus:border-stone-900 w-full sm:w-80 rounded-md text-sm sm:text-base"
                        />
                        <Button size="lg" className="bg-stone-900 text-white hover:bg-stone-800 w-full sm:w-auto rounded-md text-sm sm:text-base py-3 sm:py-6">
                            Contactar
                        </Button>
                    </div>
                </div>
            </section>

            {/* Footer */}
            <footer ref={footerRef} className="py-8 sm:py-12 px-4 sm:px-6 border-t border-stone-300 bg-stone-100 opacity-0 translate-y-8 transition-all duration-700 ease-out">
                <div className="container mx-auto max-w-6xl">
                    <div className="flex flex-col md:flex-row justify-between items-center gap-4 sm:gap-6">
                        <div className="text-lg sm:text-xl md:text-2xl font-serif text-stone-900 text-center md:text-left">ESTUDIO ARQUITECTURA ALESI</div>
                        <div className="flex gap-4 sm:gap-8 text-xs sm:text-sm text-stone-600">
                            <a href="#" className="hover:text-stone-900 transition-colors py-2">
                                Instagram
                            </a>
                            <a href="#" className="hover:text-stone-900 transition-colors py-2">
                                LinkedIn
                            </a>
                            <a href="#" className="hover:text-stone-900 transition-colors py-2">
                                Behance
                            </a>
                        </div>
                    </div>
                    <div className="mt-6 sm:mt-8 text-center text-xs text-stone-500 px-4">
                        © 2025 Estudio de Arquitectura Alesi. Todos los derechos reservados.
                        <br />
                        Hecho con mucho café por{" "}
                        <a
                            href="https://pablopadev.es"
                            target="_blank"
                            rel="noopener noreferrer"
                            className="text-stone-700 hover:text-stone-900 underline transition-colors"
                        >
                            PabloPaDev
                        </a>
                        .
                    </div>
                </div>
            </footer>
        </main>
    )
}