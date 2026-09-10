export const cvPersonal = {
	fullName: "Pablo Palacios",
	heroRole: "Estudiante de 2.º de Desarrollo de Aplicaciones Multiplataforma",
	heroLead:
		"Desarrollo proyectos web reales mientras continúo formándome como desarrollador.",
	heroSeeking: "Actualmente busco empresa para realizar mis prácticas de DAM.",
	location: "Gandia, Valencia, España",
	mapsUrl: "https://maps.google.com/?q=Gandia,Valencia,España",
	email: "pablopadev@gmail.com",
	websiteUrl: "https://pablopadev.com",
	websiteDisplay: "pablopadev.com",
	linkedinUrl: "https://www.linkedin.com/in/pablo-palacios-vicens-0750aa3a2",
	whatsappUrl: "https://wa.me/34657285571",
	whatsappDisplay: "+34 657 285 571",
} as const

export const aboutIntroPrimary =
	"Estoy cursando 2.º de Desarrollo de Aplicaciones Multiplataforma (DAM) en el IES Jaume II el Just. He desarrollado un proyecto personal publicado en producción y webs para clientes reales."

export const aboutIntroSecondary =
	"Busco una empresa donde hacer las prácticas de DAM: entrar en un equipo profesional, aportar en lo que pueda y ganar experiencia real."

export const skillCategories: { category: string; skills: string[] }[] = [
	{
		category: "Formación DAM",
		skills: [
			"Java",
			"SQL",
			"SQLite / bases de datos relacionales",
			"HTML",
			"CSS",
			"JavaScript",
			"Git",
			"JSON",
			"XML",
		],
	},
	{
		category: "Tecnologías utilizadas en proyectos",
		skills: [
			"TypeScript",
			"React",
			"Next.js",
			"Supabase",
			"PostgreSQL",
			"Tailwind CSS",
			"Vercel",
			"Docker",
			"APIs REST",
		],
	},
]

export const skillsSectionTitle = "Tecnologías"

export const skillsSectionSubtitle =
	"Tecnologías con las que he trabajado en clase y en proyectos. No implica dominio de todas."

export type ProjectEntry = {
	title: string
	description: string
	tags: string[]
	url?: string
	image?: string
	visitLabel?: string
	client?: string
	ownProject?: boolean
	freelance?: boolean
	inProgress?: boolean
	featured?: boolean
}

export const projects: ProjectEntry[] = [
	{
		title: "PlayNotes",
		description:
			"Aplicación web de videojuegos desarrollada y mantenida como proyecto personal, actualmente publicada en producción. Trabajo con Next.js, React, TypeScript, Supabase/PostgreSQL, APIs externas, autenticación y despliegue en Vercel. He participado en el desarrollo de funcionalidades, estructura de datos, integraciones, resolución de errores y mantenimiento.",
		tags: ["Next.js", "React", "TypeScript", "Supabase", "PostgreSQL", "Vercel"],
		url: "https://www.playnotes.es/",
		image: "/projects/playnotes.jpg",
		ownProject: true,
		featured: true,
	},
	{
		title: "Endurance3",
		description:
			"Web desarrollada para Carlos Cabrera, entrenador multidisciplinar. Proyecto freelance para un cliente real, publicado en producción.",
		tags: ["Next.js", "React", "Tailwind CSS"],
		url: "https://www.endurance3.es/",
		image: "/projects/endurance3.jpg",
		visitLabel: "Endurance3",
		client: "Carlos Cabrera, entrenador multidisciplinar",
		freelance: true,
	},
	{
		title: "VOLTA",
		description:
			"Web freelance para un cliente real: tienda de café de especialidad en Gandia, publicada en producción.",
		tags: ["Next.js", "React", "Tailwind CSS"],
		url: "https://www.voltaathletics.es/",
		image: "/projects/volta-athletics.jpg",
		visitLabel: "VOLTA",
		freelance: true,
	},
	{
		title: "Ciclo-Activa",
		description:
			"Herramienta para la prevención de lesiones en la mujer deportista mediante métricas de menstruación, alimentación y deporte: seguimiento integral para adaptar carga, descanso y nutrición con criterio.",
		tags: ["Salud deportiva", "Ciclo menstrual", "Nutrición", "Prevención"],
		inProgress: true,
	},
]

export const projectsSectionTitle = "Proyectos"

export const projectsIntroBefore =
	"Proyecto personal en producción y trabajos freelance para clientes reales."

export const projectsIntroHighlight = "PlayNotes es mi proyecto principal"

export const projectsIntroAfter =
	": lo desarrollo y mantengo de principio a fin."

export const contactSectionTitle = "Contacto"

export const contactSectionSubtitle =
	"Busco empresa para prácticas de DAM. Puedes escribirme por email, WhatsApp o LinkedIn."

export const contactLocationTitle = "Ubicación"

export const contactConnectTitle = "También en"

export const contactConnectSubtitle =
	"LinkedIn y WhatsApp."
