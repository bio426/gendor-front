import { createRouter, createWebHistory, RouteRecordRaw } from "vue-router"
import useGlobalStore from "./store"

import productRouter from "./views/product/router"
import posRouter from "./views/pos/router"
import adminRouter from "./views/admin/router"
import saleRouter from "./views/sale/router"

const routes: RouteRecordRaw[] = [
	{ path: "/", name: "index", component: () => import("./views/index.vue") },
	{ path: "/dev", name: "dev", component: () => import("./views/dev.vue") },
	{
		path: "/auth",
		name: "auth",
		component: () => import("./views/auth.vue"),
	},
	...productRouter,
	...posRouter,
	...adminRouter,
	...saleRouter,
]

const router = createRouter({
	routes,
	history: createWebHistory(),
})

router.beforeEach((to, from) => {
	const { user } = useGlobalStore()
	if (to.name != "auth" && !user) {
		return { name: "auth" }
	}
})

export default router
