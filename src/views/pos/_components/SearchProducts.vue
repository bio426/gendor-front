<script setup lang="ts">
import { ref } from "vue"
import { useDebounceFn } from "@vueuse/core"

import type { IItem } from "../_types"
import productService from "../../../services/product"

const emit = defineEmits<{
	(event: "found", item: IItem): void
}>()

const search = ref("")
const options = ref<IItem[]>([])

const searchOpts = useDebounceFn(async () => {
	const res = await productService.list({
		page: 1,
		count: 20,
		search: search.value,
	})
	options.value = res.rows.map((row) => ({
		id: row.id,
		name: row.name,
		price: row.price,
	}))
}, 200)

function handleSelected(item: IItem) {
	emit("found", item)
	options.value = []
}
</script>

<template>
	<div class="relative">
		<input
			class="input input-bordered flex-grow w-full"
			type="text"
			placeholder="Search…"
			list="opts"
			v-model="search"
			@input="searchOpts"
		/>
		<div
			class="absolute top-full w-full bg-base-100"
			v-if="options.length > 0"
		>
			<ul class="border border-neutral-content">
				<li
					class="p-4 hover:bg-base-200"
					v-for="option in options"
					:key="option.id"
					@click="handleSelected(option)"
				>
					{{ option.name }}
				</li>
			</ul>
		</div>
	</div>
</template>
