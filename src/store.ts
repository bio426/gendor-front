import { defineStore } from "pinia"
import { ref } from "vue"

const useMainStore = defineStore("main", () => {
	const user = ref(false)

	return {
		user,
	}
})

export default useMainStore
