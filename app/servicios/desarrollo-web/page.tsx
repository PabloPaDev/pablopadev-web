"use client";
import Link from "next/link";
import { ArrowLeft } from "lucide-react";

export default function RestaurantePage() {
    return (
        <div className="min-h-screen bg-white text-gray-900">
            <div className="container mx-auto px-4 lg:px-6 py-16">
                <Link href="/?scroll=servicios" className="inline-flex items-center gap-2 text-gray-600 hover:text-gray-900 font-semibold text-base transition-colors mb-8">
                    <ArrowLeft className="w-5 h-5" /> Volver
                </Link>
                
                <h1 className="text-4xl md:text-5xl font-bold mb-6 text-center">
                    Restaurante
                </h1>
                <p className="text-lg text-gray-700 mb-12 text-center max-w-2xl mx-auto">
                    Una landing page de muestra para un restaurante. Diseño limpio y profesional.
                </p>

                {/* Hero Section */}
                <section className="mb-16">
                    <div className="bg-gradient-to-r from-amber-50 to-orange-50 rounded-2xl p-12 text-center">
                        <h2 className="text-3xl md:text-4xl font-bold mb-4">Bienvenido a Nuestro Restaurante</h2>
                        <p className="text-lg text-gray-700 max-w-xl mx-auto">
                            Sabores auténticos y experiencia gastronómica única en el corazón de la ciudad.
                        </p>
                    </div>
                </section>

                {/* Menú Section */}
                <section className="mb-16">
                    <h2 className="text-3xl font-bold mb-8 text-center">Nuestro Menú</h2>
                    <div className="grid md:grid-cols-3 gap-8">
                        <div className="border border-gray-200 rounded-xl p-6 hover:shadow-lg transition-shadow">
                            <div className="w-full h-48 bg-gray-200 rounded-lg mb-4"></div>
                            <h3 className="text-xl font-semibold mb-2">Entrantes</h3>
                            <p className="text-gray-600">Selección de platos para empezar</p>
                        </div>
                        <div className="border border-gray-200 rounded-xl p-6 hover:shadow-lg transition-shadow">
                            <div className="w-full h-48 bg-gray-200 rounded-lg mb-4"></div>
                            <h3 className="text-xl font-semibold mb-2">Platos Principales</h3>
                            <p className="text-gray-600">Nuestras especialidades de la casa</p>
                        </div>
                        <div className="border border-gray-200 rounded-xl p-6 hover:shadow-lg transition-shadow">
                            <div className="w-full h-48 bg-gray-200 rounded-lg mb-4"></div>
                            <h3 className="text-xl font-semibold mb-2">Postres</h3>
                            <p className="text-gray-600">Dulces creaciones artesanales</p>
                        </div>
                    </div>
                </section>

                {/* Reservas Section */}
                <section className="mb-16 bg-gray-50 rounded-2xl p-12 text-center">
                    <h2 className="text-3xl font-bold mb-4">Reserva tu Mesa</h2>
                    <p className="text-lg text-gray-700 mb-6">Asegura tu lugar para una experiencia inolvidable</p>
                    <button className="px-8 py-4 bg-black text-white rounded-lg hover:bg-gray-800 transition-colors font-semibold">
                        Hacer Reserva
                    </button>
                </section>

                {/* Footer */}
                <footer className="border-t border-gray-200 pt-12 pb-8 text-center">
                    <p className="text-gray-600 mb-2">© 2024 Restaurante</p>
                    <p className="text-sm text-gray-500">Landing page de muestra desarrollada con Next.js y Tailwind CSS</p>
                </footer>
            </div>
        </div>
    );
}
