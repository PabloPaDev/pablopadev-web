import { Card, CardContent } from "@/components/ui/card"
import { Code2, Globe, Server } from "lucide-react"

export default function About() {
  const features = [
    {
      icon: <Code2 className="h-10 w-10 text-primary" />,
      title: "Frontend Development",
      description: "Experiencia en JavaScript, Next.js, React.js y Tailwind CSS",
    },
    {
      icon: <Server className="h-10 w-10 text-primary" />,
      title: "UI & UX Design",
      description: "Diseño de interfaces limpias, accesibles y con coherencia visual",
    },
    {
      icon: <Code2 className="h-10 w-10 text-primary" />,
      title: "Backend Development",
      description: "Desarrollo de APIs y servicios backend con Node.js, flask, django y RESTful APIs",
    },
    {
      icon: <Globe className="h-10 w-10 text-primary" />,
      title: "Siempre aprendiendo",
      description: "Siempre buscando nuevas tecnologías y herramientas para mejorar mis habilidades y crear proyectos útiles",
    },
  ]

  return (
    <div className="w-full bg-muted/30">
      <section id="about" className="py-20 w-full">
        <div className="container px-4 md:px-6 mx-auto">
          <div className="space-y-12">
            <div className="space-y-4 text-center">
              <h2 className="text-3xl font-bold tracking-tighter sm:text-4xl md:text-5xl">Sobre mí</h2>
              <p className="mx-auto max-w-[700px] text-muted-foreground md:text-xl/relaxed lg:text-base/relaxed xl:text-xl/relaxed">
                Desarrollador Web formado en Desarrollo de Aplicaciones Multiplataforma (DAM), con especialización en frontend moderno.
                Trabajo principalmente con React, Next.js y Tailwind CSS para crear interfaces limpias, accesibles y responsive, cuidando tanto el diseño como la estructura del código.
              </p>
            </div>

            <div className="mx-auto max-w-3xl text-center">
              <p className="text-muted-foreground md:text-lg/relaxed lg:text-base/relaxed xl:text-lg/relaxed">
                Me gusta construir proyectos reales y demos funcionales que conectan frontend con APIs y servicios backend, aplicando los fundamentos aprendidos en DAM: programación, lógica, arquitectura cliente-servidor y buenas prácticas.
                <br />
                Actualmente continúo ampliando mis conocimientos en desarrollo full-stack y automatización, con el objetivo de crear aplicaciones útiles, mantenibles y bien pensadas desde el punto de vista del usuario y del producto.
              </p>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mt-12">
              {features.map((feature, index) => (
                <div key={index} className="animate-in">
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
