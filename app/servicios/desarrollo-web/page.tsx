"use client";
import Link from "next/link";
import { ArrowLeft } from "lucide-react";
import { Button } from "@/components/ui/button";

export default function RestaurantePage() {
    return (
        <main className="min-h-screen bg-background">
            <div className="container mx-auto px-4 lg:px-6 py-16">
                <Link href="/?scroll=servicios" className="inline-flex items-center gap-2 text-gray-600 hover:text-gray-900 font-semibold text-base transition-colors mb-8">
                    <ArrowLeft className="w-5 h-5" /> Volver
                </Link>
            </div>

            <header className="fixed top-0 left-0 right-0 z-50">
                <nav className="container mx-auto px-6 py-6 flex items-center justify-between">
                    <div className="text-xl md:text-2xl font-serif tracking-wide text-white/90">RESTAURANTE</div>
                    <div className="hidden md:flex gap-8 text-sm">
                        <a href="#menu" className="text-white/80 hover:text-white transition-colors">
                            Menú
                        </a>
                        <a href="#reservas" className="text-white/80 hover:text-white transition-colors">
                            Reservas
                        </a>
                    </div>
                </nav>
            </header>

            <section className="relative h-screen w-full">
                <div className="absolute inset-0 z-0">
                    <img
                        src="https://images.unsplash.com/photo-1517248135467-4c7edcad34c4?q=80&w=2070"
                        alt="Restaurante elegante con decoración moderna"
                        className="w-full h-full object-cover"
                    />
                </div>

                <div className="absolute bottom-8 left-1/2 -translate-x-1/2 z-10">
                    <div className="w-6 h-10 border-2 border-white/70 rounded-full flex items-start justify-center p-2">
                        <div className="w-1 h-3 bg-white/70 rounded-full animate-bounce" />
                    </div>
                </div>
            </section>

            {/* Menu Section */}
            <section id="menu" className="py-24 px-6 bg-card">
                <div className="container mx-auto max-w-6xl">
                    <h2 className="text-4xl md:text-5xl font-serif text-center mb-16 text-card-foreground">Nuestro Menú</h2>

                    <div className="grid md:grid-cols-3 gap-8">
                        <div className="text-center">
                            <div className="text-6xl font-serif mb-4 text-foreground">01</div>
                            <h3 className="text-xl font-serif mb-3 text-card-foreground">Entrantes</h3>
                            <p className="text-sm text-muted-foreground leading-relaxed">
                                Selección de platos para empezar, elaborados con ingredientes frescos y de calidad.
                            </p>
                        </div>

                        <div className="text-center">
                            <div className="text-6xl font-serif mb-4 text-foreground">02</div>
                            <h3 className="text-xl font-serif mb-3 text-card-foreground">Platos Principales</h3>
                            <p className="text-sm text-muted-foreground leading-relaxed">
                                Nuestras especialidades de la casa, cocina mediterránea con toques innovadores.
                            </p>
                        </div>

                        <div className="text-center">
                            <div className="text-6xl font-serif mb-4 text-foreground">03</div>
                            <h3 className="text-xl font-serif mb-3 text-card-foreground">Postres</h3>
                            <p className="text-sm text-muted-foreground leading-relaxed">
                                Dulces creaciones artesanales que marcan el cierre perfecto para tu experiencia.
                            </p>
                        </div>
                    </div>
                </div>
            </section>

            {/* Reservas Section */}
            <section id="reservas" className="py-24 px-6">
                <div className="container mx-auto max-w-4xl text-center">
                    <h2 className="text-4xl md:text-5xl font-serif mb-8 text-foreground">Reserva tu mesa</h2>
                    <p className="text-muted-foreground mb-12 leading-relaxed">
                        Asegura tu lugar para una experiencia gastronómica inolvidable.
                    </p>

                    <div className="flex flex-col sm:flex-row gap-4 justify-center items-center">
                        <input
                            type="email"
                            placeholder="Tu correo electrónico"
                            className="px-6 py-3 bg-card border border-border text-card-foreground placeholder:text-muted-foreground focus:outline-none focus:ring-2 focus:ring-ring w-full sm:w-80"
                        />
                        <Button size="lg" className="bg-primary text-primary-foreground hover:bg-primary/90 w-full sm:w-auto">
                            Reservar
                        </Button>
                    </div>
                </div>
            </section>

            {/* Footer */}
            <footer className="py-12 px-6 border-t border-border">
                <div className="container mx-auto max-w-6xl">
                    <div className="flex flex-col md:flex-row justify-between items-center gap-6">
                        <div className="text-2xl font-serif text-foreground">RESTAURANTE</div>
                        <div className="flex gap-8 text-sm text-muted-foreground">
                            <a href="#" className="hover:text-foreground transition-colors">
                                Instagram
                            </a>
                            <a href="#" className="hover:text-foreground transition-colors">
                                Facebook
                            </a>
                            <a href="#" className="hover:text-foreground transition-colors">
                                TripAdvisor
                            </a>
                        </div>
                    </div>
                    <div className="mt-8 text-center text-xs text-muted-foreground">
                        © 2024 Restaurante. Todos los derechos reservados.
                    </div>
                </div>
            </footer>
        </main>
    );
}
