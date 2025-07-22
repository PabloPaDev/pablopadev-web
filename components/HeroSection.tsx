"use client";
import { Badge } from "@/components/ui/badge";
import { Coffee, ArrowRight, Rocket, Sparkles } from "lucide-react";
import { Button } from "@/components/ui/button";
import { useEffect, useState } from "react";
import { Dialog, DialogTrigger, DialogContent, DialogClose } from "@/components/ui/dialog";
import { DialogTitle } from "@/components/ui/dialog";
import * as framerMotion from "framer-motion";
const motion = framerMotion.motion;
import { useRef } from "react";

export function HeroSection() {
    useEffect(() => {
        if (typeof window !== "undefined" && !window.Calendly) {
            const script = document.createElement('script');
            script.src = 'https://assets.calendly.com/assets/external/widget.js';
            script.async = true;
            document.body.appendChild(script);
        }
    }, []);
    const [open, setOpen] = useState(false);
    const [rocketFlying, setRocketFlying] = useState(false);
    const rocketRef = useRef<HTMLSpanElement>(null);
    const [rocketStart, setRocketStart] = useState<{ left: number, top: number } | null>(null);
    // Ajusta la duración para que el vuelo sea más lento
    const rocketFlightDuration = 2.2;
    // Keyframes para trayectoria curva mejorada y salida de pantalla
    let finalX = 0;
    let finalY = 0;
    if (typeof window !== 'undefined' && rocketRef.current) {
        const rocketRect = rocketRef.current.getBoundingClientRect();
        finalX = window.innerWidth - rocketRect.left + 120; // más allá del borde derecho
        finalY = -rocketRect.top - 120; // más allá del borde superior
    }
    const rocketCurve = {
        x: [0, finalX * 0.3, finalX * 0.7, finalX],
        y: [0, finalY * 0.3 - 60, finalY * 0.7 - 40, finalY],
        scale: [1, 1.5, 2.2, 4.5],
        rotate: [0, -10, -15, -30],
        opacity: [1, 0.95, 0.9, 0],
    };
    return (
        <section className="min-h-screen flex items-center justify-center relative overflow-hidden bg-[url('/banner.jpg')] bg-cover bg-center">
            <div className="absolute inset-0 bg-black/70"></div>
            <div className="container mx-auto px-4 lg:px-6 relative">
                <div className="max-w-4xl mx-auto text-center">
                    <Badge className="mb-6 bg-blue-500/20 text-blue-300 border-blue-500/30 px-6 py-2">
                        <Sparkles className="w-4 h-4 mr-2" />
                        Desarrollador Full Stack Junior
                    </Badge>
                    <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold text-white mb-6 leading-tight drop-shadow-2xl">
                        Creo
                        <span className="bg-gradient-to-r from-blue-400 via-purple-400 to-cyan-400 bg-clip-text text-transparent">
                            {" "}
                            Experiencias Web{" "}
                        </span>
                        Increíbles
                    </h1>
                    <p className="text-xl text-white mb-12 max-w-3xl mx-auto leading-relaxed drop-shadow-2xl">
                        Desarrollo aplicaciones web modernas, APIs robustas y gestiono bases de datos.
                        <span className="text-blue-400 font-semibold"> Código limpio</span>,
                        <span className="text-cyan-400 font-semibold"> interfaces atractivas</span> y
                        <span className="text-purple-400 font-semibold"> soluciones escalables</span>.
                        <span className="text-white-400 font-semibold"> ¿Tienes un proyecto en mente? Un café y lo vemos</span>.
                    </p>
                    <div className="flex flex-col sm:flex-row gap-6 justify-center items-center mb-16">
                        <Button asChild size="lg" className="bg-gradient-to-r from-blue-500 to-cyan-400 hover:from-blue-600 hover:to-cyan-500 text-lg px-10 py-4 hover:scale-105 transition-all">
                            <motion.button
                                onMouseEnter={() => {
                                    if (rocketRef.current) {
                                        const rect = rocketRef.current.getBoundingClientRect();
                                        setRocketStart({ left: rect.left, top: rect.top });
                                    }
                                    setRocketFlying(true);
                                }}
                                onMouseLeave={() => setRocketFlying(false)}
                                className="flex items-center"
                            >
                                <span className="mr-2 flex" ref={rocketRef} style={{ minWidth: 20, position: 'relative', zIndex: 30 }}>
                                    {!rocketFlying && (
                                        <motion.span
                                            initial={{ x: 0, y: 0, scale: 1, rotate: 0, opacity: 1 }}
                                            animate={{ x: 0, y: 0, scale: 1, rotate: 0, opacity: 1 }}
                                            transition={{ type: "spring", stiffness: 200, damping: 18 }}
                                            style={{ display: 'inline-block' }}
                                        >
                                            <Rocket className="w-5 h-5" />
                                        </motion.span>
                                    )}
                                </span>
                                <motion.span
                                    className="inline-block"
                                    variants={{
                                        rest: { opacity: 1, x: 0 },
                                        hover: { opacity: 0, x: 20 },
                                    }}
                                    animate={rocketFlying ? "hover" : "rest"}
                                    transition={{ duration: 0.3 }}
                                >
                                    Empezar Proyecto
                                </motion.span>
                                <ArrowRight className="ml-2 w-5 h-5" />
                            </motion.button>
                        </Button>
                        {/* Cohete volando fuera del botón */}
                        {rocketFlying && rocketStart && (
                            <motion.span
                                initial={{ x: 0, y: 0, scale: 1, rotate: 0, opacity: 1 }}
                                animate={{
                                    x: window.innerWidth - rocketStart.left + 120,
                                    y: -rocketStart.top - 120,
                                    scale: 4.5,
                                    rotate: -30,
                                    opacity: 0,
                                }}
                                transition={{ duration: rocketFlightDuration, ease: "easeInOut" }}
                                style={{
                                    position: 'fixed',
                                    left: rocketStart.left,
                                    top: rocketStart.top,
                                    zIndex: 1000,
                                    pointerEvents: 'none',
                                }}
                            >
                                <Rocket className="w-5 h-5 text-blue-400 drop-shadow-2xl" />
                            </motion.span>
                        )}
                        {/* Botón Tomar un café con modal */}
                        <Dialog open={open} onOpenChange={setOpen}>
                            <DialogTrigger asChild>
                                <Button
                                    size="lg"
                                    className="bg-gradient-to-r from-blue-500 to-cyan-400 hover:from-blue-600 hover:to-cyan-500 text-white text-lg px-10 py-4 hover:scale-105 transition-all flex items-center gap-2"
                                    onClick={() => setOpen(true)}
                                >
                                    <Coffee className="mr-2 w-5 h-5" />
                                    Tomar un café
                                </Button>
                            </DialogTrigger>
                            <DialogContent className="max-w-md w-full p-0 overflow-hidden bg-white rounded-2xl shadow-2xl" style={{ width: 400 }}>
                                <DialogTitle className="sr-only">Agenda una cita</DialogTitle>
                                <iframe
                                    src="https://calendly.com/pablopalavii/30min?hide_event_type_details=1&background_color=ffffff&locale=es"
                                    width="400"
                                    height="500"
                                    frameBorder="0"
                                    title="Calendly"
                                    style={{ minWidth: 320, border: 'none' }}
                                ></iframe>
                                <DialogClose asChild>
                                    <button className="absolute top-4 right-4 text-gray-500 hover:text-gray-900 text-2xl">×</button>
                                </DialogClose>
                            </DialogContent>
                        </Dialog>
                    </div>
                    {/* Stats */}
                    <div className="grid grid-cols-1 md:grid-cols-3 gap-8 max-w-3xl mx-auto">
                        <div className="p-6 rounded-2xl bg-gray-800/80 backdrop-blur-sm border border-gray-700 hover:border-blue-500/50 transition-all hover:scale-105">
                            <div className="text-3xl font-bold text-white mb-2">15+</div>
                            <div className="text-gray-400">Proyectos Completados</div>
                        </div>
                        <div className="p-6 rounded-2xl bg-gray-800/80 backdrop-blur-sm border border-gray-700 hover:border-purple-500/50 transition-all hover:scale-105">
                            <div className="text-3xl font-bold text-white mb-2">2+</div>
                            <div className="text-gray-400">Años Programando</div>
                        </div>
                        <div className="p-6 rounded-2xl bg-gray-800/80 backdrop-blur-sm border border-gray-700 hover:border-cyan-500/50 transition-all hover:scale-105">
                            <div className="text-3xl font-bold text-white mb-2">100%</div>
                            <div className="text-gray-400">Pasión por el Código</div>
                        </div>
                    </div>
                </div>
            </div>
        </section>
    );
} 