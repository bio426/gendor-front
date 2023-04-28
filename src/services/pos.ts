import base from "./_base"

const prefix = "pos"

async function searchProducts(query: { search: string }) {
	const res = await base.get(prefix + "/search-product", {
		searchParams: query,
	})

	return res.json<{}>()
}

export default {
	searchProducts,
}
