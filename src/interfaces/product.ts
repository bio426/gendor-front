import { ICategory } from "./admin"

interface IProduct {
	id: string
	name: string
	price: number
	createdAt: Date
	category: ICategory
}

interface ICreateProduct {
	name: string
	price: number
	category: number
}

export type { IProduct, ICreateProduct }
