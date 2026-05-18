export const cvPersonal = {
	fullName: "Pablo Palacios",
	heroPhrases: [
		"Desarrollador Web",
		"Frontend moderno con foco en UI",
		"Integración con APIs y servicios backend",
	],
	location: "Gandia, Valencia, España",
	mapsUrl: "https://maps.google.com/?q=Gandia,Valencia,España",
	linkedinUrl: "https://www.linkedin.com/in/pablo-palacios-vicens-0750aa3a2",
	whatsappUrl: "https://wa.me/34657285571",
	whatsappDisplay: "+34 657 285 571",
} as const

export type ExpertiseFeatureId = "frontend" | "uiux" | "backend" | "learning"

export const expertiseFeatures: {
	id: ExpertiseFeatureId
	title: string
	description: string
}[] = [
	{
		id: "frontend",
		title: "Frontend Development",
		description: "Experiencia en JavaScript, Next.js, React.js y Tailwind CSS",
	},
	{
		id: "uiux",
		title: "UI & UX Design",
		description: "Diseño de interfaces limpias, accesibles y con coherencia visual",
	},
	{
		id: "backend",
		title: "Backend Development",
		description: "Desarrollo de APIs y servicios backend con Node.js, flask, django y RESTful APIs",
	},
	{
		id: "learning",
		title: "Siempre aprendiendo",
		description:
			"Siempre buscando nuevas tecnologías y herramientas para mejorar mis habilidades y crear proyectos útiles",
	},
]

export const aboutIntroPrimary =
	"Desarrollador Web formado en Desarrollo de Aplicaciones Multiplataforma (DAM), con especialización en frontend moderno. Trabajo principalmente con React, Next.js y Tailwind CSS para crear interfaces limpias, accesibles y responsive, cuidando tanto el diseño como la estructura del código."

export const aboutIntroSecondary =
	"Me gusta construir proyectos reales y demos funcionales que conectan frontend con APIs y servicios backend, aplicando los fundamentos aprendidos en DAM: programación, lógica, arquitectura cliente-servidor y buenas prácticas. Actualmente continúo ampliando mis conocimientos en desarrollo full-stack y automatización, con el objetivo de crear aplicaciones útiles, mantenibles y bien pensadas desde el punto de vista del usuario y del producto."

export const skillCategories: { category: string; skills: string[] }[] = [
	{
		category: "Frontend",
		skills: ["JavaScript", "TypeScript", "React.js", "HTML/CSS", "Tailwind CSS"],
	},
	{
		category: "Backend",
		skills: ["Node.js", "flask", "django", "Express.js", "RESTful APIs"],
	},
	{
		category: "Database",
		skills: ["MySQL", "PostgreSQL", "MongoDB"],
	},
	{
		category: "Tools & Methodologies",
		skills: ["Git", "GitHub", "Docker", "Figma"],
	},
]

export const skillsSectionSubtitle =
	"Tecnologías y herramientas que utilizo en mis proyectos"

export type ProjectEntry = {
	title: string
	description: string
	tags: string[]
	url?: string
	visitLabel?: string
	ownProject?: boolean
	inProgress?: boolean
}

export const projects: ProjectEntry[] = [
	{
		title: "Web Volta-Athletics",
		description:
			"Tienda online de café de especialidad en Gandia. Plataforma e-commerce desarrollada con tecnologías modernas para mostrar productos premium, gestionar pedidos y conectar con la comunidad de amantes del café y el deporte.",
		tags: ["E-commerce", "Next.js", "React", "Tailwind CSS"],
		url: "https://www.voltaathletics.es/",
	},
	{
		title: "Playnotes.es",
		description:
			"Web y app para reseñar videojuegos, montar tu biblioteca personal y crear listas: seguimiento de lo que juegas, valoraciones y descubrimiento organizado.",
		tags: ["Videojuegos", "Reseñas", "Biblioteca", "Listas"],
		url: "https://www.playnotes.es/",
		ownProject: true,
	},
	{
		title: "Web Endurance Trainer",
		description:
			"Plataforma web para entrenamiento de resistencia y seguimiento de rendimiento deportivo. Sistema completo para planificar rutinas, registrar entrenamientos y analizar progreso con métricas avanzadas.",
		tags: ["Next.js", "React", "Deportes", "Fitness"],
		url: "https://www.endurance3.es/",
		visitLabel: "Endurance3",
	},
	{
		title: "Web de venta de patines",
		description:
			"Tienda online de patines y material de patinaje. Catálogo de productos, experiencia de compra fluida y diseño orientado a la comunidad del skate y el roller.",
		tags: ["E-commerce", "Next.js", "React", "Tailwind CSS"],
		inProgress: true,
	},
	{
		title: "Ciclo-Activa",
		description:
			"Herramienta para la prevención de lesiones en la mujer deportista mediante métricas de menstruación, alimentación y deporte: seguimiento integral para adaptar carga, descanso y nutrición con criterio.",
		tags: ["Salud deportiva", "Ciclo menstrual", "Nutrición", "Prevención"],
		inProgress: true,
	},
	{
		title: "Panel de citas para tatuadores",
		description:
			"Panel para estudios de tatuaje: reservas y seguimiento de clientes, calendario interactivo, tareas del día a día e integración con WhatsApp, con automatización e IA para cancelaciones y reprogramaciones.",
		tags: ["Flask", "PostgreSQL", "IA", "WhatsApp"],
		inProgress: true,
	},
]

export const projectsSectionTitle = "Webs y proyectos personales"

export const projectsIntroBefore =
	"Desde webs para empresas hasta proyectos personales donde aplico mis habilidades y conocimientos."

export const projectsIntroHighlight = "Playnotes.es es mi proyecto propio"

export const projectsIntroAfter =
	": producto que ideé y desarrollo de principio a fin, y del que más orgulloso estoy."

export const contactSectionTitle = "Contactame"

export const contactSectionSubtitle =
	"¿Tienes un proyecto en mente o encajo en tus proyectos? ¡Hablemos sobre ello!"

export const contactLocationTitle = "Ubicación"

export const contactConnectTitle = "Conecta conmigo"

export const contactConnectSubtitle =
	"Encuéntrame en LinkedIn o escríbeme por WhatsApp."
