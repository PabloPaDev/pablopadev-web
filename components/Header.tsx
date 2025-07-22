"use client";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { Button } from "@/components/ui/button";
import { Code2, Github } from "lucide-react";

export default function Header() {
    const pathname = usePathname();
    const isLanding = pathname === "/";
    return (
        <header className="border-b border-gray-800 bg-gray-900/95 backdrop-blur-md sticky top-0 z-50">
            <div className="container mx-auto px-4 lg:px-6 h-16 flex items-center justify-between">
                <Link href="/" className="flex items-center space-x-2 group">
                    <div className="w-8 h-8 bg-gradient-to-r from-blue-500 to-cyan-400 rounded-lg flex items-center justify-center group-hover:scale-110 transition-transform">
                        <Code2 className="w-5 h-5 text-white" />
                    </div>
                    <span className="text-xl font-bold text-white">PabloPaDev</span>
                </Link>
                {isLanding && (
                    <nav className="hidden md:flex items-center space-x-8">
                        <Link href="#servicios" className="text-gray-300 hover:text-white transition-colors">
                            Servicios
                        </Link>
                        <Link href="#sobre-mi" className="text-gray-300 hover:text-white transition-colors">
                            Sobre Mí
                        </Link>
                        <Link href="#contacto" className="text-gray-300 hover:text-white transition-colors">
                            Contacto
                        </Link>
                    </nav>
                )}
                <div className="flex items-center space-x-4">
                    <Button variant="ghost" className="text-gray-300 hover:text-white hover:bg-gray-800">
                        <Github className="w-4 h-4 mr-2" />
                        GitHub
                    </Button>
                    <a href="https://wa.me/34657285571?text=Buenos%20dias%2C%20he%20visto%20tu%20web%20y%20estoy%20interesado%20en%20alguno%20de%20tus%20servicio%2C%20%C2%BFcuando%20podemos%20concretar%20una%20cita%3F" target="_blank" rel="noopener noreferrer">
                        <Button className="bg-green-500 hover:bg-green-600 text-white flex items-center gap-2">
                            <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 32 32" width="20" height="20" fill="currentColor"><path d="M16.003 3.2c-7.067 0-12.8 5.733-12.8 12.8 0 2.262.6 4.467 1.733 6.4l-1.8 6.533c-.133.467 0 .933.267 1.267.267.333.667.533 1.133.533.133 0 .267 0 .4-.067l6.533-1.8c1.867 1.067 4 1.733 6.4 1.733 7.067 0 12.8-5.733 12.8-12.8s-5.733-12.8-12.8-12.8zm0 23.467c-2.133 0-4.133-.6-5.867-1.667-.2-.133-.467-.2-.733-.2-.133 0-.267 0-.4.067l-4.867 1.333 1.333-4.867c.067-.267.067-.533-.067-.8-1.067-1.733-1.667-3.733-1.667-5.867 0-6.067 4.933-11 11-11s11 4.933 11 11-4.933 11-11 11zm6.267-8.267c-.333-.167-1.933-.933-2.233-1.033-.3-.1-.5-.167-.7.167-.2.333-.8 1.033-.983 1.233-.183.2-.367.217-.7.05-.333-.167-1.4-.517-2.667-1.65-.983-.883-1.65-1.967-1.85-2.3-.183-.317-.02-.483.15-.65.15-.15.333-.383.5-.567.167-.183.217-.317.333-.533.117-.217.05-.4-.017-.567-.067-.167-.7-1.7-.967-2.333-.25-.6-.5-.517-.7-.517-.183-.017-.4-.017-.617-.017-.217 0-.567.083-.867.4-.3.317-1.133 1.1-1.133 2.683 0 1.583 1.167 3.117 1.333 3.333.167.217 2.3 3.517 5.6 4.8.783.333 1.4.533 1.883.683.792.252 1.513.217 2.083.133.633-.1 1.933-.783 2.2-1.55.267-.767.267-1.417.183-1.55-.083-.133-.3-.217-.633-.367z" /></svg>
                            Hablemos
                        </Button>
                    </a>
                </div>
            </div>
        </header>
    );
} 