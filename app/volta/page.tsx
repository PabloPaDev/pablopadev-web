"use client"

import { useEffect, useState } from "react"
import Image from "next/image"
import Link from "next/link"
import { X } from "lucide-react"
import LiquidEther from "@/components/Backgrounds/LiquidEther"
import CardNav from "@/components/CardNav/CardNav"
import {
    Dialog,
    DialogContent,
    DialogDescription,
    DialogHeader,
    DialogTitle,
} from "@/components/ui/dialog"

export default function VoltaPage() {
    const [showNewsletter, setShowNewsletter] = useState(false)
    const [email, setEmail] = useState("")

    const handleCardClick = () => {
        setShowNewsletter(true)
    }

    useEffect(() => {
        const observerOptions = {
            threshold: 0.1,
            rootMargin: '0px 0px -50px 0px'
        }

        const observer = new IntersectionObserver((entries) => {
            entries.forEach((entry) => {
                if (entry.isIntersecting) {
                    entry.target.classList.add('animate-in')
                }
            })
        }, observerOptions)

        const elements = document.querySelectorAll('.scroll-animate')
        elements.forEach((el) => observer.observe(el))

        return () => {
            elements.forEach((el) => observer.unobserve(el))
        }
    }, [])

    useEffect(() => {
        // Verificar si es la primera visita
        const hasSeenNewsletter = localStorage.getItem("volta_newsletter_seen")
        if (!hasSeenNewsletter) {
            // Esperar un poco antes de mostrar el popup para mejor UX
            setTimeout(() => {
                setShowNewsletter(true)
            }, 1000)
        }
    }, [])

    const handleClose = () => {
        setShowNewsletter(false)
        localStorage.setItem("volta_newsletter_seen", "true")
    }

    const handleSubscribe = (e: React.FormEvent) => {
        e.preventDefault()
        // Aquí iría la lógica para suscribirse a la newsletter
        console.log("Email:", email)
        // Por ahora solo cerramos el popup
        handleClose()
    }

    return (
        <div className="min-h-screen relative bg-black">
            {/* Fondo LiquidEther */}
            <div className="fixed inset-0 z-0">
                <LiquidEther
                    colors={['#D4A574', '#C4956A', '#E8D4B8', '#D4A574']}
                    mouseForce={15}
                    cursorSize={80}
                    isViscous={false}
                    viscous={30}
                    iterationsViscous={32}
                    iterationsPoisson={32}
                    resolution={0.4}
                    isBounce={false}
                    autoDemo={true}
                    autoSpeed={0.6}
                    autoIntensity={1.5}
                    takeoverDuration={0.25}
                    autoResumeDelay={3000}
                    autoRampDuration={0.6}
                    className="w-full h-full opacity-65"
                />
            </div>

            {/* CardNav Header */}
            <div className="fixed top-0 left-0 right-0 z-50 pointer-events-none">
                <div className="relative pointer-events-auto">
                    <CardNav
                        logo="/volta/logo_volta.png"
                        logoAlt="VOLTĀ"
                        className="[&_.logo]:h-[64px]"
                        items={[
                            {
                                label: "VOLTA CLUB",
                                bgColor: "#6F4E37",
                                textColor: "#fff",
                                links: [],
                                onClick: () => setShowNewsletter(true)
                            },
                            {
                                label: "Quienes somos",
                                bgColor: "#6F4E37",
                                textColor: "#fff",
                                links: [],
                                onClick: () => {
                                    const element = document.getElementById('quienes-somos')
                                    if (element) {
                                        element.scrollIntoView({ behavior: 'smooth', block: 'start' })
                                    }
                                }
                            },
                            {
                                label: "Productos",
                                bgColor: "#6F4E37",
                                textColor: "#fff",
                                links: [],
                                onClick: () => {
                                    const element = document.getElementById('productos')
                                    if (element) {
                                        element.scrollIntoView({ behavior: 'smooth', block: 'start' })
                                    }
                                }
                            }
                        ]}
                        baseColor="#000"
                        menuColor="#fff"
                        ease="power3.out"
                    />
                </div>
            </div>

            {/* Contenido */}
            <div className="relative z-10 pointer-events-none">
                <main className="relative overflow-hidden pointer-events-none">
                    {/* Hero Section */}
                    <section className="min-h-screen flex items-center justify-center relative pointer-events-none">
                        <div className="container mx-auto px-4 relative z-10 pointer-events-auto">

                            <div className="flex flex-col items-center justify-center min-h-screen text-center">
                                {/* Logo centrado */}
                                <div className="mb-12 relative">
                                    <div className="relative w-64 h-64 md:w-80 md:h-80 lg:w-96 lg:h-96">
                                        <div className="relative w-full h-full">
                                            <Image
                                                src="/volta/logo_volta.png"
                                                alt="VOLTĀ - Café para deportistas"
                                                fill
                                                className="object-contain relative z-10"
                                                style={{
                                                    filter: 'brightness(0) saturate(100%) invert(30%) sepia(40%) saturate(800%) hue-rotate(340deg) brightness(110%) contrast(90%)',
                                                }}
                                                priority
                                            />
                                        </div>
                                    </div>
                                </div>

                                {/* Título principal */}
                                <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold tracking-tight text-white mb-6 text-balance max-w-4xl">
                                    Café de especialidad para los que <span className="italic text-[#6F4E37]">se mueven de verdad</span>
                                </h1>

                                {/* Descripción */}
                                <p className="text-base md:text-lg text-gray-300 mb-12 max-w-2xl text-pretty leading-relaxed">
                                    Ritual-Energia-Comunidad
                                </p>
                            </div>
                        </div>
                    </section>

                    {/* Productos Section */}
                    <section id="productos" className="relative z-10 py-12 lg:py-16 pointer-events-none overflow-hidden">
                        <div className="container mx-auto px-4 lg:px-8 pointer-events-auto overflow-hidden">
                            <h2 className="text-2xl md:text-3xl font-bold text-center text-white mb-8 scroll-animate">
                                Nuestros Productos
                            </h2>
                            <div className="grid md:grid-cols-2 gap-4 lg:gap-6 max-w-3xl mx-auto overflow-hidden">
                                <div className="scroll-animate">
                                    {/* Producto 1 - Volta Blanco */}
                                    <div className="group relative overflow-hidden rounded-lg bg-black/40 backdrop-blur-sm border border-white/10 hover:border-[#6F4E37]/50 transition-all duration-300">
                                        <div className="relative aspect-[3/4] overflow-hidden">
                                            <Image
                                                src="/volta/volta_blanco.jpg"
                                                alt="VOLTĀ Blanco"
                                                fill
                                                className="object-cover group-hover:scale-105 transition-transform duration-500"
                                            />
                                            <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/20 to-transparent" />
                                        </div>
                                        <div className="p-3 lg:p-4">
                                            <h3 className="text-lg lg:text-xl font-bold text-white mb-2">
                                                VOLTĀ Finca Piendamo
                                            </h3>
                                            <p className="text-gray-300 text-sm mb-3">
                                                Café premium con notas que recuerdan a frutas citricas, florales y un dulzor equilibrado.
                                            </p>
                                            <a href="#" className="block w-full px-4 py-2 rounded-md bg-[#6F4E37] text-white hover:bg-[#8B4513] transition-colors text-center text-sm">
                                                Comprar
                                                <br />
                                                <span className="text-xs opacity-75">**Compra gestionada por NoSeComoSeLlama</span>
                                            </a>
                                        </div>
                                    </div>
                                </div>

                                <div className="scroll-animate">
                                    {/* Producto 2 - Volta Negro */}
                                    <div className="group relative overflow-hidden rounded-lg bg-black/40 backdrop-blur-sm border border-white/10 hover:border-[#6F4E37]/50 transition-all duration-300">
                                        <div className="relative aspect-[3/4] overflow-hidden">
                                            <Image
                                                src="/volta/volta_negro.jpg"
                                                alt="VOLTĀ Negro"
                                                fill
                                                className="object-cover group-hover:scale-105 transition-transform duration-500"
                                            />
                                            <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/20 to-transparent" />
                                        </div>
                                        <div className="p-3 lg:p-4">
                                            <h3 className="text-lg lg:text-xl font-bold text-white mb-2">
                                                VOLTĀ Finca El Tambo
                                            </h3>
                                            <p className="text-gray-300 text-sm mb-3">
                                                Café premium con notas de frutos rojo, miel y un toque floral. Acidez viva y cuerpo jugoso.
                                            </p>
                                            <a href="#" className="block w-full px-4 py-2 rounded-md bg-[#6F4E37] text-white hover:bg-[#8B4513] transition-colors text-center text-sm">
                                                Comprar
                                                <br />
                                                <span className="text-xs opacity-75">**Compra gestionada por NoSeComoSeLlama</span>
                                            </a>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </section>

                    {/* VOLTA Comunidad Section */}
                    <section className="relative z-10 py-12 lg:py-16 pointer-events-none">
                        <div className="container mx-auto px-4 lg:px-8 pointer-events-auto scroll-animate">
                            <h2 className="text-2xl md:text-3xl font-bold text-center text-white mb-8">
                                VOLTA Comunidad
                            </h2>
                            <div className="max-w-3xl mx-auto text-center">
                                <p className="text-gray-300 text-base lg:text-lg mb-6">
                                    Únete a una comunidad de atletas y amantes del café que buscan mejorar su rendimiento día a día. Comparte experiencias, descubre nuevas formas de preparar tu café y conecta con otros miembros.
                                </p>
                                <a
                                    href="#"
                                    onClick={(e) => {
                                        e.preventDefault()
                                        setShowNewsletter(true)
                                    }}
                                    className="inline-block px-5 py-3 rounded-md bg-[#6F4E37] text-white hover:bg-[#8B4513] transition-colors"
                                >
                                    Únete a la comunidad
                                </a>
                            </div>
                        </div>
                    </section>

                    {/* Quienes somos Section */}
                    <section id="quienes-somos" className="relative z-10 py-12 lg:py-16 pointer-events-none">
                        <div className="container mx-auto px-4 lg:px-8 pointer-events-auto scroll-animate">
                            <h2 className="text-2xl md:text-3xl font-bold text-center text-white mb-8">
                                Quienes somos
                            </h2>
                            <div className="max-w-3xl mx-auto">
                                <p className="text-gray-300 text-base lg:text-lg mb-4">
                                    VOLTĀ nace de la pasión por el café de especialidad y el compromiso con el rendimiento deportivo. Creemos que cada atleta merece un café que potencie su energía y enfoque.
                                </p>
                                <p className="text-gray-300 text-base lg:text-lg mb-4">
                                    Trabajamos directamente con fincas seleccionadas para garantizar la máxima calidad y trazabilidad de nuestros productos. Cada grano es cuidadosamente seleccionado y tostado para resaltar sus mejores características.
                                </p>
                                <p className="text-gray-300 text-base lg:text-lg">
                                    Nuestra misión es acompañarte en tu camino hacia el máximo rendimiento, ofreciéndote café premium que se adapte a tus necesidades y estilo de vida activo.
                                </p>
                            </div>
                        </div>
                    </section>

                </main>
            </div>

            {/* Footer */}
            <footer className="relative z-10 py-12 md:py-16 border-t border-white/10 pointer-events-none">
                <div className="container mx-auto px-4 lg:px-8 pointer-events-auto scroll-animate">
                    <div className="grid grid-cols-1 md:grid-cols-3 gap-6 md:gap-8 mb-6 md:mb-8">
                        {/* Sección 1: Logo y descripción */}
                        <div className="text-center md:text-left">
                            <div className="mb-4 flex justify-center md:justify-start">
                                <Image
                                    src="/volta/logo_volta.png"
                                    alt="VOLTĀ"
                                    width={120}
                                    height={40}
                                    className="object-contain"
                                    style={{
                                        filter: 'brightness(0) saturate(100%) invert(30%) sepia(40%) saturate(800%) hue-rotate(340deg) brightness(110%) contrast(90%)',
                                    }}
                                />
                            </div>
                            <p className="text-gray-400 text-sm mb-4">
                                Café de especialidad para los que se mueven de verdad.
                            </p>
                        </div>

                        {/* Sección 2: Enlaces rápidos */}
                        <div className="text-center md:text-left">
                            <h3 className="text-white font-semibold mb-4">Enlaces</h3>
                            <ul className="space-y-2">
                                <li>
                                    <a
                                        href="#quienes-somos"
                                        onClick={(e) => {
                                            e.preventDefault()
                                            const element = document.getElementById('quienes-somos')
                                            if (element) {
                                                element.scrollIntoView({ behavior: 'smooth', block: 'start' })
                                            }
                                        }}
                                        className="text-gray-400 hover:text-[#6F4E37] transition-colors text-sm"
                                    >
                                        Quienes somos
                                    </a>
                                </li>
                                <li>
                                    <a
                                        href="#productos"
                                        onClick={(e) => {
                                            e.preventDefault()
                                            const element = document.getElementById('productos')
                                            if (element) {
                                                element.scrollIntoView({ behavior: 'smooth', block: 'start' })
                                            }
                                        }}
                                        className="text-gray-400 hover:text-[#6F4E37] transition-colors text-sm"
                                    >
                                        Productos
                                    </a>
                                </li>
                                <li>
                                    <a
                                        href="#"
                                        onClick={(e) => {
                                            e.preventDefault()
                                            setShowNewsletter(true)
                                        }}
                                        className="text-gray-400 hover:text-[#6F4E37] transition-colors text-sm"
                                    >
                                        Únete a la comunidad
                                    </a>
                                </li>
                            </ul>
                        </div>

                        {/* Sección 3: Contacto y créditos */}
                        <div className="text-center md:text-left">
                            <h3 className="text-white font-semibold mb-4">Contacto</h3>
                            <p className="text-gray-400 text-sm mb-4">
                                Síguenos para más información sobre nuestros productos y eventos.
                            </p>
                        </div>
                    </div>

                    {/* Línea divisoria y copyright */}
                    <div className="border-t border-white/10 pt-6 md:pt-8">
                        <div className="flex flex-col md:flex-row items-center justify-between gap-4 text-center md:text-left">
                            <div className="text-gray-400 text-sm text-center md:text-left">
                                © {new Date().getFullYear()} VOLTĀ. Todos los derechos reservados.
                            </div>
                            <div className="text-gray-400 text-sm text-center md:text-right">
                                Hecho con mucho café por{" "}
                                <Link href="https://pablopadev.es" target="_blank" rel="noopener noreferrer" className="hover:text-[#6F4E37] transition-colors">
                                    PabloPaDev
                                </Link>
                            </div>
                        </div>
                    </div>
                </div>
            </footer>

            {/* Newsletter Popup */}
            <Dialog open={showNewsletter} onOpenChange={setShowNewsletter}>
                <DialogContent className="bg-black/95 border-[#6F4E37]/30 text-white max-w-md">
                    <DialogHeader>
                        <DialogTitle className="text-2xl font-bold text-[#6F4E37] mb-2">
                            Únete a la Comunidad VOLTĀ
                        </DialogTitle>
                        <DialogDescription className="text-gray-300">
                            Sé el primero en conocer nuestras nuevas variedades, ofertas especiales y consejos para mejorar tu rendimiento.
                        </DialogDescription>
                    </DialogHeader>
                    <form onSubmit={handleSubscribe} className="mt-4 space-y-4">
                        <div>
                            <input
                                type="email"
                                value={email}
                                onChange={(e) => setEmail(e.target.value)}
                                placeholder="tu@email.com"
                                required
                                className="w-full px-4 py-3 bg-black/50 border border-white/20 rounded-lg text-white placeholder-gray-400 focus:outline-none focus:border-[#6F4E37] focus:ring-1 focus:ring-[#6F4E37] transition-colors"
                            />
                        </div>
                        <div className="flex gap-3">
                            <button
                                type="submit"
                                className="flex-1 px-5 py-3 rounded-md bg-[#6F4E37] text-white hover:bg-[#8B4513] transition-colors"
                            >
                                Suscribirme
                            </button>
                            <button
                                type="button"
                                onClick={handleClose}
                                className="px-5 py-3 rounded-md border border-white/20 text-gray-300 hover:bg-white/10 transition-colors"
                            >
                                Ahora no
                            </button>
                        </div>
                    </form>
                    <button
                        onClick={handleClose}
                        className="absolute right-4 top-4 rounded-sm opacity-70 ring-offset-background transition-opacity hover:opacity-100 focus:outline-none focus:ring-2 focus:ring-[#6F4E37] focus:ring-offset-2 disabled:pointer-events-none"
                    >
                        <X className="h-4 w-4 text-gray-400" />
                        <span className="sr-only">Close</span>
                    </button>
                </DialogContent>
            </Dialog>
        </div>
    )
}
