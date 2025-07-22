"use client";
import { Button } from "@/components/ui/button";
import { Coffee, ArrowRight, Rocket } from "lucide-react";

export function HeroButtons() {
    return (
        <div className="flex flex-col sm:flex-row gap-6 justify-center items-center mb-16">
            <Button
                size="lg"
                className="bg-gradient-to-r from-blue-500 to-cyan-400 hover:from-blue-600 hover:to-cyan-500 text-white text-lg px-10 py-4 hover:scale-105 transition-all"
            >
                <Rocket className="mr-2 w-5 h-5" />
                Empezar Proyecto
                <ArrowRight className="ml-2 w-5 h-5" />
            </Button>
            <a
                href="#"
                onClick={(e) => {
                    e.preventDefault();
                    // @ts-ignore
                    if (window.Calendly) {
                        // @ts-ignore
                        window.Calendly.initPopupWidget({ url: "https://calendly.com/pablopalavii/30min" });
                    }
                    return false;
                }}
            >
                <Button
                    size="lg"
                    className="bg-gradient-to-r from-blue-500 to-cyan-400 hover:from-blue-600 hover:to-cyan-500 text-white text-lg px-10 py-4 hover:scale-105 transition-all flex items-center gap-2"
                >
                    <Coffee className="mr-2 w-5 h-5" />
                    Tomar un café
                </Button>
            </a>
        </div>
    );
} 