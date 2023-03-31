import { defineStore } from "pinia"
import { ref, computed } from "vue"

const useMainStore = defineStore("main", () => {
	const user = ref(false)
	const isUserLogged = computed(() => false)

	return {
		user,
		isUserLogged,
	}
})

export default useMainStore
