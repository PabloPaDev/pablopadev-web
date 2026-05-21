import Link from "next/link";
import Header from "@/components/header";
import AnimatedBackground from "@/components/animated-background";
import About from "@/components/about";
import Skills from "@/components/skills";
import OpenSource from "@/components/open-source";
import Contact from "@/components/contact";
import RotatingText from "@/components/rotating-text";
import { Button } from "@/components/ui/button";
import { cvPersonal } from "@/data/cv";

export default function Home() {
	const phrases = [...cvPersonal.heroPhrases];

	return (
		<main className="relative min-h-screen">
			<AnimatedBackground />
			<Header />
			<div id="home" className="min-h-screen flex items-center justify-center">
				<div className="container px-4 md:px-6 text-center">
					<h1 className="text-4xl md:text-6xl font-bold mb-4 gradient-text">
						Hola, soy {cvPersonal.fullName}
					</h1>
					<RotatingText phrases={phrases} interval={3000} />
					<div className="mt-8 flex justify-center">
						<Button variant="outline" size="lg" asChild>
							<Link href="/tattoo">Demo — Tattoo Studio</Link>
						</Button>
					</div>
				</div>
			</div>
			<About />
			<OpenSource />
			<Skills />
			<Contact />
		</main>
	);
}
