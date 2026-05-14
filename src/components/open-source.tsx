import { Card, CardContent } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { GitPullRequest } from "lucide-react"
import { cn } from "@/lib/utils"

export default function OpenSource() {
  const contributions = [
    {
      title: "Web Volta-Athletics",
      description:
        "Tienda online de café de especialidad en Gandia. Plataforma e-commerce desarrollada con tecnologías modernas para mostrar productos premium, gestionar pedidos y conectar con la comunidad de amantes del café y el deporte.",
      tags: ["E-commerce", "Next.js", "React", "Tailwind CSS"],
    },
    {
      title: "Playnotes.es",
      description:
        "Web y app para reseñar videojuegos, montar tu biblioteca personal y crear listas: seguimiento de lo que juegas, valoraciones y descubrimiento organizado.",
      tags: ["Videojuegos", "Reseñas", "Biblioteca", "Listas"],
      ownProject: true,
    },
    {
      title: "Web Endurance Trainer",
      description:
        "Plataforma web para entrenamiento de resistencia y seguimiento de rendimiento deportivo. Sistema completo para planificar rutinas, registrar entrenamientos y analizar progreso con métricas avanzadas.",
      tags: ["Next.js", "React", "Deportes", "Fitness"],
    },
    {
      title: "Ciclo-Activa",
      description:
        "Herramienta para la prevención de lesiones en la mujer deportista mediante métricas de menstruación, alimentación y deporte: seguimiento integral para adaptar carga, descanso y nutrición con criterio.",
      tags: ["Salud deportiva", "Ciclo menstrual", "Nutrición", "Prevención"],
    },
    {
      title: "Panel de citas para tatuadores",
      description:
        "Panel para estudios de tatuaje: reservas y seguimiento de clientes, calendario interactivo, tareas del día a día e integración con WhatsApp, con automatización e IA para cancelaciones y reprogramaciones.",
      tags: ["Flask", "PostgreSQL", "IA", "WhatsApp"],
    },
  ]

  return (
    <div id="projects">
      <div className="space-y-12">
        <div className="space-y-4 text-center">
          <h3 className="text-2xl font-bold tracking-tighter sm:text-3xl">Webs y proyectos personales</h3>
          <p className="mx-auto max-w-[700px] text-muted-foreground md:text-lg/relaxed lg:text-base/relaxed">
            Desde webs para empresas hasta proyectos personales donde aplico mis habilidades y conocimientos.{" "}
            <span className="text-foreground font-medium">
              Playnotes.es es mi proyecto propio
            </span>
            : producto que ideé y desarrollo de principio a fin, y del que más orgulloso estoy.
          </p>
        </div>

        <div className="grid grid-cols-1 gap-6 mt-8 sm:grid-cols-2 xl:grid-cols-3">
          {contributions.map((contribution, index) => (
            <div key={index}>
              <Card
                className={cn(
                  "h-full flex flex-col",
                  contribution.ownProject &&
                    "border-2 border-primary shadow-md ring-1 ring-primary/20"
                )}
              >
                <CardContent className="p-6 flex-1 flex flex-col">
                  <div className="mb-4 flex flex-wrap items-center gap-2">
                    <GitPullRequest className="h-8 w-8 text-primary" />
                    {contribution.ownProject ? (
                      <Badge variant="default" className="font-semibold">
                        Proyecto propio
                      </Badge>
                    ) : null}
                  </div>
                  <h3 className="text-lg font-bold mb-2">{contribution.title}</h3>
                  <p className="text-sm text-muted-foreground flex-1">{contribution.description}</p>
                  <div className="flex flex-wrap gap-1 mt-4">
                    {contribution.tags.map((tag, i) => (
                      <span key={i} className="text-xs bg-primary/10 px-2 py-1 rounded-full">
                        {tag}
                      </span>
                    ))}
                  </div>
                </CardContent>
              </Card>
            </div>
          ))}
        </div>
      </div>
    </div>
  )
}
