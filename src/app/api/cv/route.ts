import { createElement } from "react"
import { NextResponse } from "next/server"
import { renderToBuffer } from "@react-pdf/renderer"
import { CVPdfDocument } from "@/components/cv-pdf-document"

export const runtime = "nodejs"
export const dynamic = "force-dynamic"

export async function GET() {
	const buffer = await renderToBuffer(createElement(CVPdfDocument))
	const filename = "CV-Pablo-Palacios.pdf"
	return new NextResponse(new Uint8Array(buffer), {
		status: 200,
		headers: {
			"Content-Type": "application/pdf",
			"Content-Disposition": `attachment; filename="${filename}"`,
			"Cache-Control": "public, max-age=3600",
		},
	})
}
