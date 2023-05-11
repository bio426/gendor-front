<script setup lang="ts">
import { ref } from "vue"
import {
	MagnifyingGlassIcon,
	FunnelIcon,
	Square3Stack3DIcon,
	CurrencyDollarIcon,
	PlusIcon,
} from "@heroicons/vue/24/solid"

import type { IPosProduct } from "../../interfaces/pos"
import useToast from "../../composables/useToast"
import posService from "../../services/pos"
import usePosStore from "./_store"
import Navigation from "../../components/Navigation.vue"
import Sidebar from "../../components/Sidebar.vue"
import Pagination from "../../components/Pagination.vue"
import IndexSC from "./_components/indexSC.vue"

const { showToast } = useToast()
const posStore = usePosStore()

const search = ref("")
const showSidebar = ref(false)

const rows = ref<IPosProduct[]>([])

// Pagination
const page = ref(1)
const count = ref(10)
const total = ref(10)
async function getItems() {
	const query = {
		page: page.value,
		count: count.value,
		search: search.value,
	}
	const res = await posService.searchProducts(query)
	total.value = res.total
	rows.value = res.rows
}
getItems()

function toCart(item: IPosProduct) {
	posStore.addToCart(item)
	showToast(`${item.name} added to cart`, 2000)
}
</script>

<template>
	<Sidebar :show="showSidebar" @closing="showSidebar = false">
		<div class="relative w-full min-h-screen">
			<div class="w-11/12 mx-auto">
				<h1 class="py-4 text-2xl font-bold text-center">POS</h1>
				<form @submit.prevent="getItems">
					<div class="form-control mb-8">
						<div class="input-group">
							<input
								class="input input-bordered flex-grow"
								type="text"
								placeholder="Search…"
								v-model="search"
							/>
							<button
								class="btn btn-square"
								type="button"
								@click="showSidebar = true"
							>
								<FunnelIcon class="w-6" />
							</button>
							<button
								class="btn btn-square"
								type="submit"
								@click="getItems"
							>
								<MagnifyingGlassIcon class="w-6" />
							</button>
						</div>
					</div>
				</form>
				<!-- Table -->
				<div class="overflow-x-auto mb-4">
					<table class="table table-zebra w-full">
						<thead>
							<tr>
								<th>Image</th>
								<th>Name</th>
								<th>Price (S/.)</th>
								<th>Actions</th>
							</tr>
						</thead>
						<tbody>
							<tr v-for="(row, i) in rows">
								<td>
									<img
										class="block rounded w-10"
										src="https://via.placeholder.com/400"
									/>
								</td>
								<td>
									<span
										class="link"
										:to="{
											name: 'itemId',
											params: { id: row.name },
										}"
									>
										{{ row.name }}
									</span>
								</td>
								<td>{{ row.price.toFixed(2) }}</td>
								<td>
									<button
										class="btn btn-sm btn-success"
										@click="toCart(row)"
									>
										<PlusIcon class="w-4" />
									</button>
								</td>
							</tr>
							<tr class="text-center" v-if="rows.length == 0">
								<td colspan="4">No items</td>
							</tr>
						</tbody>
					</table>
				</div>
				<Pagination v-model="page" :total="total" :count="count" />
				<div class="w-full h-24"></div>
			</div>
			<!-- Bottom actions -->
			<div class="fixed left-0 bottom-16 w-full py-1 bg-base-100">
				<div class="grid grid-cols-2 gap-4 w-11/12 mx-auto">
					<div class="flex justify-center gap-4">
						<div class="badge badge-info gap-2">
							<Square3Stack3DIcon class="w-4" />
							{{ posStore.cartLength }}
						</div>
						<div class="badge badge-info gap-2">
							<CurrencyDollarIcon class="w-4" />
							{{ posStore.cartPrice.toFixed(2) }}
						</div>
					</div>
					<router-link
						class="btn btn-sm btn-success btn-block"
						:to="{ name: 'posCart' }"
					>
						Cart
					</router-link>
				</div>
			</div>
			<Navigation />
		</div>
		<template v-slot:content>
			<IndexSC />
		</template>
	</Sidebar>
</template>
