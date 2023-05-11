import base from "./_base"
import type { IPosProduct } from "../interfaces/pos"

const prefix = "pos"

async function searchProducts(query: {
	page: number
	count: number
	search: string
}) {
	const res = await base.get(prefix + "/product", {
		searchParams: query,
	})

	return res.json<{
		total: number
		rows: IPosProduct[]
	}>()
}

async function findClient(query: { ruc: number }) {
	const res = await base.get(prefix + "/find-client", {
		searchParams: query,
	})
}

export default {
	searchProducts,
}
