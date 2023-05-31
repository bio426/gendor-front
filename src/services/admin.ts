import base from "./_base"
import {
	ICategory,
	ICreateCategory,
	IVehicle,
	IVehicleBrand,
} from "../interfaces/admin"

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

async function getVehicles() {
	const res = await base.get(prefix + "/vehicle/brand")

	return await res.json<IVehicle[]>()
}

async function getVehicleBrands() {
	const res = await base.get(prefix + "/vehicle/brand")

	return await res.json<IVehicleBrand[]>()
}

async function createVehicle(body: { brand: number; model: string }) {
	await base.post(prefix + "/vehicle", {
		json: body,
	})
}

async function createVehicleAndBrand(body: { brand: string; model: string }) {
	await base.post(prefix + "/vehicle/with-brand", {
		json: body,
	})
}

export default {
	getCategories,
	createCategory,
	deleteCategory,
	getVehicles,
	getVehicleBrands,
	createVehicle,
	createVehicleAndBrand,
}
