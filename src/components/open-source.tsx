import { Card, CardContent } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Github, GitPullRequest, ExternalLink, Clock } from "lucide-react"
import Link from "next/link"

export default function OpenSource() {
  const contributions = [
    {
      title: "Web Volta-Athletics",
      description:
        "Tienda online de café de especialidad en Gandia. Plataforma e-commerce desarrollada con tecnologías modernas para mostrar productos premium, gestionar pedidos y conectar con la comunidad de amantes del café y el deporte.",
      tags: ["E-commerce", "Next.js", "React", "Tailwind CSS"],
      link: "https://www.voltaathletics.es/",
      isWebsite: true,
    },
    {
      title: "Panel de Control",
      description:
        "Panel de control moderno para gestión de citas y clientes con inteligencia artificial integrada. Incluye calendario interactivo, gestión de clientes, sistema de tareas, integración con WhatsApp y automatización con IA para cancelaciones y reprogramaciones.",
      tags: ["Flask", "PostgreSQL", "IA", "WhatsApp"],
      link: "https://github.com/PabloPaDev/Panel-de-control",
      isWebsite: false,
    },
    {
      title: "Web Endurance Trainer",
      description:
        "Plataforma web para entrenamiento de resistencia y seguimiento de rendimiento deportivo. Sistema completo para planificar rutinas, registrar entrenamientos y analizar progreso con métricas avanzadas.",
      tags: ["Next.js", "React", "Deportes", "Fitness"],
      link: "#",
      isWebsite: false,
      inProgress: true,
    },
  ]

  return (
    <div id="projects">
      <div className="space-y-12">
        <div className="space-y-4 text-center">
          <h3 className="text-2xl font-bold tracking-tighter sm:text-3xl">Webs y proyectos personales</h3>
          <p className="mx-auto max-w-[700px] text-muted-foreground md:text-lg/relaxed lg:text-base/relaxed">
            Desde webs para empresas hasta proyectos personales donde aplico mis habilidades y conocimientos.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mt-8">
          {contributions.map((contribution, index) => (
            <div key={index}>
              <Card className="h-full flex flex-col">
                <CardContent className="p-6 flex-1 flex flex-col">
                  <div className="mb-4">
                    <GitPullRequest className="h-8 w-8 text-primary" />
                  </div>
                  <h3 className="text-lg font-bold mb-2">{contribution.title}</h3>
                  <p className="text-sm text-muted-foreground mb-4 flex-1">{contribution.description}</p>
                  <div className="flex flex-wrap gap-1 mb-4">
                    {contribution.tags.map((tag, i) => (
                      <span key={i} className="text-xs bg-primary/10 px-2 py-1 rounded-full">
                        {tag}
                      </span>
                    ))}
                  </div>
                  <Button
                    variant="outline"
                    size="sm"
                    asChild={!contribution.inProgress}
                    className="w-full"
                    disabled={contribution.inProgress}
                  >
                    {contribution.inProgress ? (
                      <span className="flex items-center justify-center">
                        <Clock className="mr-2 h-4 w-4" /> Trabajando en ello
                      </span>
                    ) : (
                      <Link href={contribution.link} target="_blank" rel="noopener noreferrer">
                        {contribution.isWebsite ? (
                          <>
                            <ExternalLink className="mr-2 h-4 w-4" /> Visitar Web
                          </>
                        ) : (
                          <>
                            <Github className="mr-2 h-4 w-4" /> Ver en GitHub
                          </>
                        )}
                      </Link>
                    )}
                  </Button>
                </CardContent>
              </Card>
            </div>
          ))}
        </div>
      </div>
    </div>
  )
}
