import {
	aboutIntroPrimary,
	aboutIntroSecondary,
} from "@/data/cv"

export default function About() {
	return (
		<div className="w-full bg-background">
			<section id="about" className="py-20 w-full">
				<div className="container px-4 md:px-6 mx-auto">
					<div className="space-y-8">
						<div className="space-y-4 text-center">
							<h2 className="text-3xl font-bold tracking-tighter sm:text-4xl md:text-5xl">Sobre mí</h2>
							<p className="mx-auto max-w-[700px] text-muted-foreground md:text-xl/relaxed lg:text-base/relaxed xl:text-xl/relaxed">
								{aboutIntroPrimary}
							</p>
						</div>
						<div className="mx-auto max-w-3xl text-center">
							<p className="text-muted-foreground md:text-lg/relaxed lg:text-base/relaxed xl:text-lg/relaxed">
								{aboutIntroSecondary}
							</p>
						</div>
					</div>
				</div>
			</section>
		</div>
	)
}
