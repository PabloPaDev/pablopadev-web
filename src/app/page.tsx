import Link from "next/link";
import Header from "@/components/header";
import AnimatedBackground from "@/components/animated-background";
import About from "@/components/about";
import Skills from "@/components/skills";
import OpenSource from "@/components/open-source";
import Contact from "@/components/contact";
import { Button } from "@/components/ui/button";
import { cvPersonal } from "@/data/cv";

export default function Home() {
	return (
		<main className="relative min-h-screen">
			<AnimatedBackground />
			<Header />
			<div id="home" className="min-h-screen flex items-center justify-center">
				<div className="container px-4 md:px-6 text-center">
					<h1 className="text-4xl md:text-6xl font-bold mb-4 gradient-text">
						{cvPersonal.fullName}
					</h1>
					<p className="text-xl md:text-2xl text-muted-foreground">
						{cvPersonal.heroRole}
					</p>
					<p className="mt-6 mx-auto max-w-2xl text-muted-foreground md:text-lg">
						{cvPersonal.heroLead}
					</p>
					<p className="mt-3 mx-auto max-w-2xl text-muted-foreground md:text-lg">
						{cvPersonal.heroSeeking}
					</p>
					<div className="mt-8 flex flex-col sm:flex-row gap-3 justify-center">
						<Button size="lg" className="w-full sm:w-auto" asChild>
							<Link href="#projects">Ver proyectos</Link>
						</Button>
						<Button variant="outline" size="lg" className="w-full sm:w-auto" asChild>
							<Link href="#contact">Contacto</Link>
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
