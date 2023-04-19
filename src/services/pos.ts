import base from "./_base"

const prefix = "/pos"

async function getItems(query: { search: string }) {
	const res = await base.get(prefix, {
		searchParams: {},
	})

	return res.json<{}>()
}

export default {
	getItems,
}
