import Header from "@/components/header";
import AnimatedBackground from "@/components/animated-background";
import About from "@/components/about";
import Skills from "@/components/skills";
import OpenSource from "@/components/open-source";
import Contact from "@/components/contact";
import RotatingText from "@/components/rotating-text";

export default function Home() {

	const phrases = [
		"Desarrollador Web",
		"Frontend moderno con foco en UI",
		"Integración con APIs y servicios backend",
	];

	return (
		<main className="relative min-h-screen">
			<AnimatedBackground />
			<Header />
			<div id="home" className="min-h-screen flex items-center justify-center">
				<div className="container px-4 md:px-6 text-center">
					<h1 className="text-4xl md:text-6xl font-bold mb-4 gradient-text">
						Hola, soy Pablo Palacios
					</h1>
					<RotatingText phrases={phrases} interval={3000} />
				</div>
			</div>
			<About />
			<Skills />
			<OpenSource />
			<Contact />
		</main>
	);
}
