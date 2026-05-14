import { Document, Page, Text, View, StyleSheet } from "@react-pdf/renderer"
import {
	aboutIntroPrimary,
	aboutIntroSecondary,
	cvPersonal,
	expertiseFeatures,
	projects,
	skillCategories,
	skillsSectionSubtitle,
} from "@/data/cv"

const styles = StyleSheet.create({
	page: {
		padding: 40,
		fontSize: 10,
		fontFamily: "Helvetica",
	},
	h1: {
		fontSize: 22,
		marginBottom: 4,
		fontFamily: "Helvetica-Bold",
	},
	headline: {
		fontSize: 10,
		color: "#333",
		marginBottom: 14,
		lineHeight: 1.4,
	},
	section: {
		marginTop: 12,
	},
	h2: {
		fontSize: 12,
		fontFamily: "Helvetica-Bold",
		marginBottom: 6,
		paddingBottom: 3,
		borderBottomWidth: 1,
		borderBottomColor: "#cccccc",
	},
	paragraph: {
		fontSize: 9,
		lineHeight: 1.45,
		marginBottom: 6,
		textAlign: "justify",
	},
	featureBlock: {
		marginBottom: 5,
	},
	featureTitle: {
		fontSize: 9,
		fontFamily: "Helvetica-Bold",
	},
	featureDesc: {
		fontSize: 8,
		lineHeight: 1.35,
		color: "#333",
	},
	contactLine: {
		fontSize: 9,
		marginBottom: 3,
	},
	skillCategory: {
		fontSize: 9,
		fontFamily: "Helvetica-Bold",
		marginTop: 5,
	},
	skillRow: {
		fontSize: 8,
		lineHeight: 1.4,
		marginBottom: 2,
		color: "#222",
	},
	projectTitle: {
		fontSize: 9,
		fontFamily: "Helvetica-Bold",
		marginTop: 6,
	},
	projectDesc: {
		fontSize: 8,
		lineHeight: 1.35,
		marginBottom: 3,
		color: "#333",
	},
	tagsRow: {
		flexDirection: "row",
		flexWrap: "wrap",
		marginBottom: 2,
	},
	tag: {
		fontSize: 7,
		marginRight: 6,
		marginBottom: 2,
		color: "#444",
	},
	ownNote: {
		fontSize: 7,
		fontFamily: "Helvetica-Bold",
		color: "#000",
		marginBottom: 2,
	},
	footer: {
		position: "absolute",
		bottom: 28,
		left: 40,
		right: 40,
		fontSize: 8,
		color: "#666",
		textAlign: "center",
	},
})

export function CVPdfDocument() {
	const headline = cvPersonal.heroPhrases.join(" · ")

	return (
		<Document title={`CV — ${cvPersonal.fullName}`} author={cvPersonal.fullName} language="es">
			<Page size="A4" style={styles.page}>
				<Text style={styles.h1}>{cvPersonal.fullName}</Text>
				<Text style={styles.headline}>{headline}</Text>

				<View style={styles.section}>
					<Text style={styles.h2}>Perfil</Text>
					<Text style={styles.paragraph}>{aboutIntroPrimary}</Text>
					<Text style={styles.paragraph}>{aboutIntroSecondary}</Text>
				</View>

				<View style={styles.section}>
					<Text style={styles.h2}>Enfoque</Text>
					{expertiseFeatures.map((f) => (
						<View key={f.id} style={styles.featureBlock} wrap={false}>
							<Text style={styles.featureTitle}>{f.title}</Text>
							<Text style={styles.featureDesc}>{f.description}</Text>
						</View>
					))}
				</View>

				<View style={styles.section}>
					<Text style={styles.h2}>Contacto</Text>
					<Text style={styles.contactLine}>Ubicación: {cvPersonal.location}</Text>
					<Text style={styles.contactLine}>LinkedIn: {cvPersonal.linkedinUrl}</Text>
					<Text style={styles.contactLine}>WhatsApp: {cvPersonal.whatsappDisplay}</Text>
				</View>

				<Text
					style={styles.footer}
					fixed
				>{`Generado desde el portfolio — ${new Date().toLocaleDateString("es-ES")}`}</Text>
			</Page>

			<Page size="A4" style={styles.page}>
				<View style={styles.section}>
					<Text style={styles.h2}>Habilidades técnicas</Text>
					<Text style={styles.paragraph}>{skillsSectionSubtitle}</Text>
					{skillCategories.map((cat) => (
						<View key={cat.category}>
							<Text style={styles.skillCategory}>{cat.category}</Text>
							<Text style={styles.skillRow}>{cat.skills.join(", ")}</Text>
						</View>
					))}
				</View>

				<View style={styles.section}>
					<Text style={styles.h2}>Proyectos</Text>
					{projects.map((p) => (
						<View key={p.title} wrap={false}>
							{p.ownProject ? <Text style={styles.ownNote}>Proyecto propio</Text> : null}
							<Text style={styles.projectTitle}>{p.title}</Text>
							<Text style={styles.projectDesc}>{p.description}</Text>
							<View style={styles.tagsRow}>
								{p.tags.map((t) => (
									<Text key={t} style={styles.tag}>
										[{t}]
									</Text>
								))}
							</View>
						</View>
					))}
				</View>

				<Text
					style={styles.footer}
					fixed
				>{`CV — ${cvPersonal.fullName}`}</Text>
			</Page>
		</Document>
	)
}
