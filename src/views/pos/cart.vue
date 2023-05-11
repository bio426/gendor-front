<script setup lang="ts">
import { ref } from "vue"
import {
	ArrowUturnLeftIcon,
	XCircleIcon,
	PlusIcon,
	TrashIcon,
} from "@heroicons/vue/24/solid"

import type { IPosProduct } from "../../interfaces/pos"
import usePosStore from "./_store"

const posStore = usePosStore()
</script>

<template>
	<div class="relative w-full min-h-screen">
		<div class="w-11/12 mx-auto">
			<h1 class="py-4 text-2xl font-bold text-center">
				<button
					class="inline float-left cursor-pointer"
					@click="$router.back()"
				>
					<ArrowUturnLeftIcon class="w-6 mt-1" />
				</button>
				Cart
				<button
					class="inline float-right cursor-pointer"
					@click="$router.push({ name: 'pos' })"
				>
					<XCircleIcon class="w-6 mt-1" />
				</button>
			</h1>
			<!-- Table -->
			<div class="overflow-x-auto mb-4">
				<table class="table table-zebra w-full">
					<thead class="text-center">
						<tr>
							<th>Image</th>
							<th>Name</th>
							<th>Quantity</th>
							<th>Price (S/.)</th>
							<th>Actions</th>
						</tr>
					</thead>
					<tbody class="text-center">
						<tr v-for="(product, i) in posStore.cart">
							<td>
								<img
									class="block rounded w-10"
									src="https://via.placeholder.com/400"
								/>
							</td>
							<td>{{ product.name }}</td>
							<td>{{ product.quantity }}</td>
							<td>
								<span>
									{{
										(
											product.price * product.quantity
										).toFixed(2)
									}}
								</span>
								<br />
								<small v-if="product.quantity != 1">
									U. {{ product.price.toFixed(2) }}
								</small>
							</td>
							<td>
								<button
									class="btn btn-sm btn-info mr-4"
									@click="posStore.addToCart(product)"
								>
									<PlusIcon class="w-4" />
								</button>
								<button
									class="btn btn-sm btn-error"
									@click="posStore.removeFromCart(i)"
								>
									<TrashIcon class="w-4" />
								</button>
							</td>
						</tr>
						<tr class="text-center" v-if="posStore.cartLength == 0">
							<td colspan="5">No items</td>
						</tr>
					</tbody>
				</table>
			</div>
			<div class="w-full h-20"></div>
		</div>
		<div class="fixed left-0 bottom-0 w-full py-1 bg-base-100">
			<div class="grid grid-cols-1 gap-4 w-11/12 mx-auto">
				<router-link
					class="btn btn-sm btn-success btn-block"
					:to="{ name: 'posClient' }"
				>
					Client
				</router-link>
			</div>
		</div>
	</div>
</template>
