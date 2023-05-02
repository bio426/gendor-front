import { IProduct } from "./product"

interface IPosProduct extends IProduct {}

interface ICartItem extends IPosProduct {
	quantity: number
}

export type { IPosProduct, ICartItem }
