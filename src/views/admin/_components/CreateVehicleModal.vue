<script setup lang="ts">
import { ref } from "vue"
import { useField } from "vee-validate"
import * as yup from "yup"
import { PlusIcon, ArrowUturnLeftIcon } from "@heroicons/vue/24/solid"

import adminService from "../../../services/admin"
import useToast from "../../../composables/useToast"
import Modal from "../../../components/Modal.vue"

const { showToast } = useToast()
const props = defineProps<{
	show: boolean
}>()
const emit = defineEmits(["closing"])
function handleClose() {
	modelR()
	brandR()
	newBrandR()
	emit("closing")
}

const brandOpts = ref<{ value: number; text: string }[]>([])

const {
	value: model,
	errorMessage: modelE,
	validate: modelV,
	resetField: modelR,
} = useField<string>("model", yup.string().required(), { initialValue: "" })

const {
	value: brand,
	errorMessage: brandE,
	validate: brandV,
	resetField: brandR,
} = useField<number>("brand", yup.number().required(), { initialValue: 0 })

const {
	value: newBrand,
	errorMessage: newBrandE,
	validate: newBrandV,
	resetField: newBrandR,
} = useField<string>("newBrand", yup.string().required(), { initialValue: "" })

async function allValid(): Promise<boolean> {
	const toValidate = [brandV(), modelV()]
	if (createBrand.value) {
		toValidate.push(newBrandV())
	}
	const results = await Promise.all(toValidate)
	if (results.some((res) => !res.valid)) return false
	return true
}

async function save() {
	if (!(await allValid())) return
	const body = {
		name: brand.value,
		color: model.value,
	}
	// await adminService.createCategory(body)
	showToast("New tag succesfully created", 2000)
	handleClose()
}

const createBrand = ref(false)
</script>

<template>
	<Modal title="Create Vehicle" :show="show" @closing="handleClose">
		<div class="form-control w-full mb-4">
			<label class="label cursor-pointer">
				<span class="label-text">Is new brand?</span>
				<input
					class="checkbox"
					type="checkbox"
					name="method"
					v-model="createBrand"
				/>
			</label>
		</div>
		<div class="form-control w-full mb-2">
			<label class="label">
				<span class="label-text">Model</span>
			</label>
			<input
				type="text"
				class="input input-bordered w-full"
				:class="{ 'input-error': !!modelE }"
				v-model="model"
			/>
			<label class="label">
				<span class="label-text-alt" v-if="modelE">{{ modelE }}</span>
			</label>
		</div>
		<div class="form-control w-full mb-8" v-if="!createBrand">
			<label class="label">
				<span class="label-text">Brand</span>
			</label>
			<select
				class="select select-bordered w-full"
				:class="{ 'select-error': !!brandE }"
				v-model="brand"
				v-if="!createBrand"
			>
				<option v-for="opt in brandOpts" :value="opt.value">
					{{ opt.text }}
				</option>
			</select>
			<label class="label">
				<span class="label-text-alt" v-if="brandE">{{ brandE }}</span>
			</label>
		</div>
		<div class="form-control w-full mb-8" v-else>
			<label class="label">
				<span class="label-text">New Brand</span>
				<span class="label-text-alt">
					<button
						class="btn btn-xs btn-success"
						v-if="!createBrand"
						@click.prevent="createBrand = !createBrand"
					>
						<PlusIcon class="w-4 h-4" />
					</button>
				</span>
			</label>
			<input
				type="text"
				class="input input-bordered w-full"
				:class="{ 'input-error': !!newBrandE }"
				v-model="newBrand"
			/>
			<label class="label">
				<span class="label-text-alt" v-if="newBrandE">
					{{ newBrandE }}
				</span>
			</label>
		</div>
		<button class="btn btn-success btn-block" @click="save">Save</button>
	</Modal>
</template>
