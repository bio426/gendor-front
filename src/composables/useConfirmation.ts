import { ref, reactive, watch } from "vue"

const isActive = ref(false)
const acceptTrigger = ref(Symbol())
const rejectTrigger = ref(Symbol())
const modalContent = reactive({
	title: "",
	content: "",
})

function confirm(
	title: string = "Are you shure to realize this action?",
	content: string = "You would not be able to revert this!"
): Promise<boolean> {
	modalContent.title = title
	modalContent.content = content
	isActive.value = true
	return new Promise((resolve) => {
		watch(acceptTrigger, () => {
			resolve(true)
			isActive.value = false
		})
		watch(rejectTrigger, () => {
			resolve(false)
			isActive.value = false
		})
	})
}

export default function () {
	return {
		isActive,
		confirm,
		acceptTrigger,
		rejectTrigger,
		modalContent,
	}
}
