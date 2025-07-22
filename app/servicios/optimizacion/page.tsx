"use client";
import { Button } from "@/components/ui/button";
import Link from "next/link";
import { Zap, Star, ArrowLeft } from "lucide-react";
import { Dialog, DialogTrigger, DialogContent, DialogHeader, DialogTitle, DialogFooter } from "@/components/ui/dialog";
import { useState } from "react";

export default function OptimizacionPage() {
    const [plan, setPlan] = useState<string>("");
    const [descripcion, setDescripcion] = useState("");
    const [nombre, setNombre] = useState("");
    const [email, setEmail] = useState("");
    const [enviando, setEnviando] = useState(false);
    const [mensaje, setMensaje] = useState<string | null>(null);
    const planes = [
        {
            key: "basico",
            label: "Plan Básico",
            desc: "Optimización de velocidad, imágenes y recursos esenciales. Mejoras rápidas y efectivas.",
            precio: 100,
        },
        {
            key: "avanzado",
            label: "Plan Avanzado",
            desc: "Optimización profunda, SEO técnico, análisis de Core Web Vitals y mejoras avanzadas.",
            precio: 150,
        },
    ];
    const calcularPresupuesto = () => {
        const base = planes.find(t => t.key === plan)?.precio || 0;
        return base;
    };
    // Colores y estilos
    const modalBg = "bg-white";
    const inputBg = "bg-gray-100";
    const inputText = "text-gray-900";
    const labelText = "text-gray-800";
    const borderColor = "border-gray-300";
    const shadow = "shadow-2xl";
    return (
        <div className="min-h-screen relative py-20 bg-[url('/code-blue.jpg')] bg-cover bg-center">
            <div className="absolute inset-0 bg-black/70 z-0"></div>
            <div className="container mx-auto px-4 lg:px-6 max-w-3xl relative z-10 bg-gray-900/80 border border-blue-700 rounded-2xl shadow-2xl backdrop-blur-md p-8">
                <div className="mb-8">
                    <Link href="/" className="inline-flex items-center gap-2 text-blue-400 hover:text-blue-200 font-semibold text-base transition-colors">
                        <ArrowLeft className="w-5 h-5" /> Volver
                    </Link>
                </div>
                <h1 className="text-4xl md:text-5xl font-bold text-white mb-6 text-center">
                    Mejoro tu web
                </h1>
                <p className="text-lg text-gray-300 mb-8 text-center">
                    ¿Tu web va lenta, no posiciona o no convierte? Te ayudo a optimizarla para que cargue más rápido, mejore en Google y ofrezca la mejor experiencia a tus usuarios.
                </p>
                <div className="grid md:grid-cols-2 gap-6 mb-10">
                    <div className="flex flex-col items-center bg-gray-800 rounded-xl p-6 border border-gray-700">
                        <Star className="w-8 h-8 text-yellow-400 mb-2" />
                        <span className="font-semibold text-white mb-1">Plan Básico</span>
                        <span className="text-gray-400 text-sm text-center">Optimización de velocidad, imágenes y recursos esenciales.</span>
                        <span className="text-yellow-400 font-bold mt-2">100€</span>
                    </div>
                    <div className="flex flex-col items-center bg-gray-800 rounded-xl p-6 border border-gray-700">
                        <Star className="w-8 h-8 text-blue-400 mb-2" />
                        <span className="font-semibold text-white mb-1">Plan Avanzado</span>
                        <span className="text-gray-400 text-sm text-center">Optimización profunda, SEO técnico, análisis de Core Web Vitals y mejoras avanzadas.</span>
                        <span className="text-blue-400 font-bold mt-2">150€</span>
                    </div>
                </div>
                <div className="bg-blue-900/30 border border-blue-700 rounded-xl p-6 mb-8 text-center">
                    <span className="block text-white text-lg font-semibold mb-2">¿Cuánto cuesta?</span>
                    <span className="block text-blue-200 mb-2">Desde <span className="font-bold text-2xl text-blue-400">100€</span> (precio orientativo, depende del plan y personalización).</span>
                    <span className="block text-gray-400 text-sm">Incluye asesoría, análisis y soporte inicial.</span>
                </div>
                <div className="flex justify-center">
                    <Dialog>
                        <DialogTrigger asChild>
                            <Button size="lg" className="bg-gradient-to-r from-blue-500 to-cyan-400 hover:from-blue-600 hover:to-cyan-500 text-white text-lg px-10 py-4 hover:scale-105 transition-all flex items-center gap-2">
                                Solicitar presupuesto
                            </Button>
                        </DialogTrigger>
                        <DialogContent className={`${modalBg} ${borderColor} ${shadow}`} style={{ color: '#222' }}>
                            <DialogHeader>
                                <DialogTitle className="text-gray-900">Solicitar presupuesto</DialogTitle>
                            </DialogHeader>
                            <form className="space-y-4" onSubmit={async (e) => {
                                e.preventDefault();
                                setMensaje(null);
                                setEnviando(true);
                                const presupuesto = calcularPresupuesto();
                                const res = await fetch("/api/presupuesto", {
                                    method: "POST",
                                    headers: { "Content-Type": "application/json" },
                                    body: JSON.stringify({ tipoProyecto: plan, extras: [], descripcion, nombre, email, presupuesto })
                                });
                                const data = await res.json();
                                setEnviando(false);
                                setMensaje(data.mensaje);
                                if (data.ok) {
                                    setPlan("");
                                    setDescripcion("");
                                    setNombre("");
                                    setEmail("");
                                }
                            }}>
                                {/* Mensaje para consultas */}
                                <div className="mb-2 text-center">
                                    <span className="text-sm text-gray-500">¿Solo tienes una consulta rápida? <a href="https://wa.me/34657285571?text=Hola%2C%20tengo%20una%20consulta%20sobre%20tu%20servicio%20de%20optimizacion%20web" target="_blank" rel="noopener noreferrer" className="text-green-600 underline hover:text-green-700">Háblame por WhatsApp</a></span>
                                </div>
                                <div>
                                    <label className={`block ${labelText} font-semibold mb-1`}>Plan de optimización</label>
                                    <div className="flex flex-col gap-2">
                                        {planes.map((t) => (
                                            <label key={t.key} className="flex items-start gap-2 text-gray-700 cursor-pointer">
                                                <input type="radio" name="plan" value={t.key} checked={plan === t.key} onChange={() => setPlan(t.key)} className="mt-1" />
                                                <span>
                                                    <span className="font-semibold">{t.label}</span> <span className="text-xs text-blue-600 font-bold">{t.precio}€</span>
                                                    <br /><span className="text-xs text-gray-500">{t.desc}</span>
                                                </span>
                                            </label>
                                        ))}
                                    </div>
                                </div>
                                <div>
                                    <label className={`block ${labelText} font-semibold mb-1`}>Descripción del proyecto</label>
                                    <textarea className={`w-full rounded-md p-2 ${inputBg} ${inputText} border ${borderColor}`} rows={3} value={descripcion} onChange={e => setDescripcion(e.target.value)} placeholder="Cuéntame brevemente tu idea o necesidades..." />
                                </div>
                                <div className="flex gap-4">
                                    <div className="flex-1">
                                        <label className={`block ${labelText} font-semibold mb-1`}>Nombre</label>
                                        <input className={`w-full rounded-md p-2 ${inputBg} ${inputText} border ${borderColor}`} value={nombre} onChange={e => setNombre(e.target.value)} placeholder="Tu nombre" />
                                    </div>
                                    <div className="flex-1">
                                        <label className={`block ${labelText} font-semibold mb-1`}>Email</label>
                                        <input className={`w-full rounded-md p-2 ${inputBg} ${inputText} border ${borderColor}`} value={email} onChange={e => setEmail(e.target.value)} placeholder="tu@email.com" type="email" />
                                    </div>
                                </div>
                                <div className={`${inputBg} rounded-md p-4 text-center mt-4 border ${borderColor}`}>
                                    <span className="text-gray-800 font-semibold">Presupuesto estimado: </span>
                                    <span className="text-2xl text-blue-600 font-bold">{calcularPresupuesto()}€</span>
                                </div>
                                {mensaje && (
                                    <div className={`text-center text-sm font-semibold ${mensaje.includes('recibida') ? 'text-green-600' : 'text-red-600'} mb-2`}>
                                        {mensaje}
                                    </div>
                                )}
                                <DialogFooter>
                                    <Button type="submit" disabled={enviando} className="w-full bg-gradient-to-r from-blue-500 to-cyan-400 hover:from-blue-600 hover:to-cyan-500 text-white text-lg mt-2 shadow-md disabled:opacity-60 disabled:cursor-not-allowed">
                                        {enviando ? 'Enviando...' : 'Enviar solicitud'}
                                    </Button>
                                </DialogFooter>
                            </form>
                        </DialogContent>
                    </Dialog>
                </div>
            </div>
        </div>
    );
} 