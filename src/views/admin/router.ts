import { RouteRecordRaw } from "vue-router"

const prefix = "/admin"

const routesItem: RouteRecordRaw[] = [
	{
		path: prefix + "/",
		name: "admin",
		component: () => import("./index.vue"),
	},
	{
		path: prefix + "/category",
		name: "adminCategory",
		component: () => import("./category.vue"),
	},
]

export default routesItem
