import { defineStore } from "pinia"
import { ref, computed } from "vue"

import type { IPosProduct, ICartItem } from "../../interfaces/pos"

const useMainStore = defineStore("pos", () => {
	const cart = ref<ICartItem[]>([])

	const cartLength = computed(() =>
		cart.value.reduce((prev, cur) => {
			return prev + cur.quantity
		}, 0)
	)

	const cartPrice = computed(() =>
		cart.value.reduce((prev, cur) => {
			return prev + cur.price * cur.quantity
		}, 0)
	)

	function addToCart(item: IPosProduct) {
		let idx = cart.value.findIndex((cartItem) => cartItem.id == item.id)
		if (idx == -1) {
			cart.value.push({ ...item, quantity: 1 })
			return
		}
		cart.value[idx].quantity += 1
	}

	function removeFromCart(idx: number) {
		let item = cart.value[idx]
		if (item.quantity > 1) {
			item.quantity -= 1
			return
		}
		cart.value.splice(idx, 1)
	}

	return {
		cart,
		cartLength,
		cartPrice,
		addToCart,
		removeFromCart,
	}
})

export default useMainStore
