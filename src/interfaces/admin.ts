interface ICategory {
	id: string
	name: string
	color: string
}

interface ICreateCategory {
	name: string
	color: string
}

interface IVehicle {
	id: number
	name: string
	brand: string
}

interface IVehicleBrand {
	id: number
	name: string
}

export type { ICategory, ICreateCategory, IVehicle, IVehicleBrand }
