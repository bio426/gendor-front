import base from "./_base"
import { IProduct, ICreateProduct } from "../interfaces/product"

const prefix = "product"

async function create(body: ICreateProduct) {
	const res = await base.post(prefix, {
		json: body,
	})

	return res.status
}

async function list(query: { page: number; count: number; search: string }) {
	const res = await base.get(prefix, {
		searchParams: query,
	})

	return res.json<{
		total: number
		rows: IProduct[]
	}>()
}

async function read(id: string) {
	const res = await base.get(prefix + `/${id}`)

	return res.json()
}

export default {
	create,
	list,
	read,
}
