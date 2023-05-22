import {} from "vue"
import { jsPDF } from "jspdf"

const content = {
	title: "Title of the business S.A.C.",
	address: "Address of the business",
	phone: "999999999",
	ruc: "1010199999999",
	website: "mybusinesss@mail.com",
	date: "10/10/10",
	customerName: "Jhon Doe Quispe",
	customerDni: "91919191",
	products: [
		{ quantity: "111", name: "product name 001", price: "20.00" },
		{
			quantity: "2",
			name: "product name very very long fr fr 002",
			price: "30.00",
		},
		{ quantity: "2", name: "product name 003", price: "30.00" },
		{ quantity: "2", name: "short name 04", price: "30.00" },
	],
}

const separator = Array(42).fill("-").join("")

function nextCursorY(doc: jsPDF, text: string, lineExtra: number = 0): number {
	const lineDiff = 2
	const pos = doc.getTextDimensions(text, {
		maxWidth: contentWidth,
		fontSize: doc.getFontSize(),
		// font: doc.getFont().fontName,
	})
	return pos.h + lineDiff + lineExtra
}

function nextCursorYProduct(
	doc: jsPDF,
	text: string,
	lineExtra: number = 0
): number {
	const lineDiff = 2
	const pos = doc.getTextDimensions(text, {
		maxWidth: (contentWidth / 12) * 6,
		fontSize: doc.getFontSize(),
		// font: doc.getFont().fontName,
	})
	return pos.h + lineDiff + lineExtra
}

const docWidth = 80
const docHeight = 300
const padding = 5
const contentWidth = docWidth - padding * 2
const lineDiff = 2

export default async function (): Promise<void> {
	let cursorX = padding
	let cursorY = padding * 2
	let text = ""
	// defaults
	// size:16,fontName: helvetica, fontStyle: normal
	// doc.setFont("helvetica", "normal", 400)
	const doc = new jsPDF({
		orientation: "p",
		unit: "mm",
		format: [docWidth, docHeight],
	})
	doc.setFontSize(14)

	// Image
	let img = await fetch("./pdfLogo.png")
	let body = await img.arrayBuffer()
	let imgData = new Uint8Array(body)
	const logoSize = 30
	doc.addImage(
		imgData,
		"png",
		docWidth / 2 - logoSize / 2,
		padding,
		logoSize,
		logoSize
	)
	cursorY += logoSize + lineDiff * 2

	// title
	doc.setFont("helvetica", "bold")
	cursorX = docWidth / 2
	text = content.title
	doc.text(text, cursorX, cursorY, {
		align: "center",
		maxWidth: contentWidth,
	})
	cursorY += nextCursorY(doc, text)

	// address
	doc.setFont("helvetica", "normal")
	text = content.address
	doc.text(text, cursorX, cursorY, {
		align: "center",
		maxWidth: contentWidth,
	})
	cursorY += nextCursorY(doc, text)

	// phone
	text = `Phone: ${content.phone}`
	doc.text(text, cursorX, cursorY, {
		align: "center",
		maxWidth: contentWidth,
	})
	cursorY += nextCursorY(doc, text)

	// ruc
	text = `Ruc: ${content.ruc}`
	doc.text(text, cursorX, cursorY, {
		align: "center",
		maxWidth: contentWidth,
	})
	cursorY += nextCursorY(doc, text)

	// website
	text = `Site: ${content.website}`
	doc.text(text, cursorX, cursorY, {
		align: "center",
		maxWidth: contentWidth,
	})
	cursorY += nextCursorY(doc, text)

	// separator
	doc.text(separator, cursorX, cursorY, {
		align: "center",
		maxWidth: contentWidth,
	})
	cursorY += nextCursorY(doc, separator)

	// document type
	text = `Business document type`
	doc.text(text, cursorX, cursorY, {
		align: "center",
		maxWidth: contentWidth,
	})
	cursorY += nextCursorY(doc, separator)

	// Document id
	text = `0000-00000000`
	doc.text(text, cursorX, cursorY, {
		align: "center",
		maxWidth: contentWidth,
	})
	cursorY += nextCursorY(doc, separator)

	// creation date
	cursorX = padding
	text = `Emission date: ${content.date}`
	doc.text(text, cursorX, cursorY, {
		align: "left",
		maxWidth: contentWidth,
	})
	cursorY += nextCursorY(doc, separator)

	// customer name
	text = `Customer: ${content.customerName}`
	doc.text(text, cursorX, cursorY, {
		align: "left",
		maxWidth: contentWidth,
	})
	cursorY += nextCursorY(doc, separator)

	// customer dni
	text = `Dni: ${content.customerDni}`
	doc.text(text, cursorX, cursorY, {
		align: "left",
		maxWidth: contentWidth,
	})
	cursorY += nextCursorY(doc, separator)

	// products header
	cursorX = docWidth / 2
	doc.text(separator, cursorX, cursorY, {
		align: "center",
		maxWidth: contentWidth,
	})
	cursorY += lineDiff * 2

	cursorX = padding
	text = `Qty.`
	doc.text(text, cursorX, cursorY, {
		align: "left",
		maxWidth: contentWidth,
	})
	cursorX += (contentWidth / 12) * 2

	text = `Product`
	doc.text(text, cursorX, cursorY, {
		align: "left",
		maxWidth: contentWidth,
	})
	cursorX += (contentWidth / 12) * 6

	text = `Up.`
	doc.text(text, cursorX, cursorY, {
		align: "left",
		maxWidth: contentWidth,
	})
	cursorX += (contentWidth / 12) * 2

	text = `Total`
	doc.text(text, cursorX, cursorY, {
		align: "left",
		maxWidth: contentWidth,
	})
	cursorY += lineDiff * 2

	cursorX = docWidth / 2
	doc.text(separator, cursorX, cursorY, {
		align: "center",
		maxWidth: contentWidth,
	})
	cursorY += nextCursorY(doc, separator)

	// products
	content.products.forEach((product) => {
		cursorX = padding
		doc.text(product.quantity, cursorX, cursorY, {
			align: "left",
			maxWidth: contentWidth,
		})
		cursorX += (contentWidth / 12) * 2

		doc.text(product.name, cursorX, cursorY, {
			align: "left",
			maxWidth: (contentWidth / 12) * 6,
		})
		cursorX += (contentWidth / 12) * 6

		doc.text(product.price, cursorX, cursorY, {
			align: "left",
			maxWidth: contentWidth,
		})
		cursorX += (contentWidth / 12) * 2

		doc.text(product.price, cursorX, cursorY, {
			align: "left",
			maxWidth: contentWidth,
		})
		// cursorY += lineDiff * 2
		cursorY += nextCursorYProduct(doc, product.name)
	})

	//products footer
	cursorX = docWidth / 2
	doc.text(separator, cursorX, cursorY, {
		align: "center",
		maxWidth: contentWidth,
	})
	cursorY += lineDiff * 2

	cursorX = padding
	text = `Contado`
	doc.text(text, cursorX, cursorY, {
		align: "left",
		maxWidth: contentWidth,
	})
	cursorX += (contentWidth / 12) * 6

	text = `Gvd. S./`
	doc.text(text, cursorX, cursorY, {
		align: "left",
		maxWidth: contentWidth,
	})
	cursorX += (contentWidth / 12) * 3

	text = `000.00`
	doc.text(text, cursorX, cursorY, {
		align: "left",
		maxWidth: contentWidth,
	})
	cursorY += nextCursorY(doc, text)
	cursorX = padding + (contentWidth / 12) * 6

	text = `Igv. S./`
	doc.text(text, cursorX, cursorY, {
		align: "left",
		maxWidth: contentWidth,
	})
	cursorX += (contentWidth / 12) * 3

	text = `000.00`
	doc.text(text, cursorX, cursorY, {
		align: "left",
		maxWidth: contentWidth,
	})
	cursorY += nextCursorY(doc, text)
	cursorX = padding + (contentWidth / 12) * 6

	text = `Tot. S./`
	doc.text(text, cursorX, cursorY, {
		align: "left",
		maxWidth: contentWidth,
	})
	cursorX += (contentWidth / 12) * 3

	text = `000.00`
	doc.text(text, cursorX, cursorY, {
		align: "left",
		maxWidth: contentWidth,
	})

	cursorY += lineDiff * 2
	cursorX = docWidth / 2
	doc.text(separator, cursorX, cursorY, {
		align: "center",
		maxWidth: contentWidth,
	})
	cursorY += nextCursorY(doc, separator)

	// doc.autoPrint()
	window.open(doc.output("bloburl"), "_blank")
}
