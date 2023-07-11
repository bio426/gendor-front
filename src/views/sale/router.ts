import { RouteRecordRaw } from "vue-router"

const prefix = "/sale"

const routesItem: RouteRecordRaw[] = [
	{
		path: prefix + "/",
		name: "sale",
		component: () => import("./index.vue"),
	},
	{
		path: prefix + "/income",
		name: "saleIncome",
		component: () => import("./income.vue"),
	},
	{
		path: prefix + "/outcome",
		name: "saleOutcome",
		component: () => import("./outcome.vue"),
	},
]

export default routesItem
