import {} from "vue"
import { jsPDF } from "jspdf"

function randomString(len: number) {
	let str = ""
	const characters =
		"ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789"
	while (str.length < len) {
		str += characters.charAt(Math.floor(Math.random() * characters.length))
	}
	return str
}

function nextCursorY(doc: jsPDF, text: string, lineExtra: number = 0): number {
	const lineDiff = 2
	const pos = doc.getTextDimensions(text, {
		maxWidth: contentWidth,
		fontSize: doc.getFontSize(),
		// font: doc.getFont().fontName,
	})
	return pos.h + lineDiff + lineExtra
}

const docWidth = 80
const padding = 5
const contentWidth = docWidth - padding * 2
const lineDiff = 2

export default function (): void {
	let cursorX = padding
	let cursorY = padding * 2
	let text = ""
	// defaults
	// size:16,fontName: helvetica, fontStyle: normal
	// doc.setFont("helvetica", "normal", 400)
	const doc = new jsPDF({
		orientation: "p",
		unit: "mm",
		format: [docWidth, docWidth],
	})
	doc.setFontSize(14)

	// title
	doc.setFont("helvetica", "bold")
	text = "Nombre de la empresa S.A.C."
	cursorX = docWidth / 2
	doc.text(text, cursorX, cursorY, {
		align: "center",
		maxWidth: contentWidth,
	})
	cursorY += nextCursorY(doc, text)

	// address
	doc.setFont("helvetica", "normal")
	text = "Direccion de la empresa"
	doc.text(text, cursorX, cursorY, {
		align: "center",
		maxWidth: contentWidth,
	})
	cursorY += nextCursorY(doc, text)

	// phone
	text = `Phone: ${999999999}`
	doc.text(text, cursorX, cursorY, {
		align: "center",
		maxWidth: contentWidth,
	})
	cursorY += nextCursorY(doc, text)

	// ruc
	text = `Ruc: ${12700999999999}`
	doc.text(text, cursorX, cursorY, {
		align: "center",
		maxWidth: contentWidth,
	})
	cursorY += nextCursorY(doc, text)

	// doc.autoPrint()
	window.open(doc.output("bloburl"), "_blank")
}
