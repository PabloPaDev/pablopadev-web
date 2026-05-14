import type { ReactNode } from "react"
import { Card, CardContent } from "@/components/ui/card"
import { Code2, Server } from "lucide-react"
import DogLogo from "@/components/dog-logo"
import {
	aboutIntroPrimary,
	aboutIntroSecondary,
	expertiseFeatures,
	type ExpertiseFeatureId,
} from "@/data/cv"

const expertiseIcons: Record<ExpertiseFeatureId, ReactNode> = {
	frontend: <Code2 className="h-10 w-10 text-primary" />,
	uiux: <Server className="h-10 w-10 text-primary" />,
	backend: <Code2 className="h-10 w-10 text-primary" />,
	learning: <DogLogo className="h-10 w-10 text-primary" />,
}

export default function About() {
	const features = expertiseFeatures.map((f) => ({
		...f,
		icon: expertiseIcons[f.id],
	}))

	return (
    <div className="w-full bg-background">
      <section id="about" className="py-20 w-full">
        <div className="container px-4 md:px-6 mx-auto">
          <div className="space-y-12">
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

            <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mt-12">
              {features.map((feature) => (
                <div key={feature.id} className="animate-in">
                  <Card className="h-full transition-all duration-300 hover:shadow-lg hover:border-primary/50">
                    <CardContent className="p-6 flex flex-col items-center text-center space-y-4">
                      <div className="p-2 rounded-full bg-primary/10">{feature.icon}</div>
                      <h3 className="text-xl font-bold">{feature.title}</h3>
                      <p className="text-muted-foreground">{feature.description}</p>
                    </CardContent>
                  </Card>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>
    </div>
  )
}
