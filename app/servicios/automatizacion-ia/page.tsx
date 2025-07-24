"use client";
import Image from "next/image";
import Link from "next/link";
import { ArrowLeft, Sparkles } from "lucide-react";

export default function AutomatizacionIAPage() {
    return (
        <div className="min-h-screen flex flex-col items-center justify-center bg-gray-900 py-20 px-4">
            <div className="w-full max-w-md bg-gray-800/90 border border-yellow-400 rounded-2xl shadow-2xl p-8 flex flex-col items-center">
                <Link href="/?scroll=servicios" className="inline-flex items-center gap-2 text-yellow-400 hover:text-yellow-300 font-semibold text-base mb-6 transition-colors">
                    <ArrowLeft className="w-5 h-5" /> Volver
                </Link>
                <Sparkles className="w-12 h-12 text-yellow-400 mb-4" />
                <h1 className="text-3xl font-bold text-yellow-300 mb-4 text-center">Estamos trabajando en ello</h1>
                <p className="text-gray-200 text-center mb-6">Próximamente podrás contratar automatización de procesos, chatbots inteligentes, asistentes virtuales y mucho más con IA.</p>
                <div className="w-full flex justify-center mb-4">
                    <Image src="/obras.jpg" alt="En obras" width={320} height={200} className="rounded-xl border border-yellow-400" />
                </div>
                <p className="text-yellow-200 text-center">¿Te interesa un chatbot, automatización o IA para tu negocio? <br /> Escríbeme por <a href="https://wa.me/34657285571?text=Hola%2C%20quiero%20saber%20m%C3%A1s%20sobre%20automatizaci%C3%B3n%20con%20IA" target="_blank" rel="noopener noreferrer" className="underline hover:text-yellow-300">WhatsApp</a> y te aviso en cuanto esté disponible.</p>
            </div>
        </div>
    );
} 