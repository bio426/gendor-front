import base from "./_base"
import { ICategory, ICreateCategory } from "../interfaces/admin"

const prefix = "admin"

async function getCategories() {
	const res = await base.get(prefix + "/category")

	return await res.json<ICategory[]>()
}
async function createCategory(body: ICreateCategory) {
	await base.post(prefix + "/category", {
		json: body,
	})
}
async function deleteCategory(id: string) {}

export default {
	getCategories,
	createCategory,
	deleteCategory,
}
