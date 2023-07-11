<script setup lang="ts">
import { ref } from "vue"
import {
	MagnifyingGlassIcon,
	ArrowPathIcon,
	MinusIcon,
	ChevronUpIcon,
	ChevronDownIcon,
} from "@heroicons/vue/24/solid"

import Navigation from "../../components/Navigation.vue"
import Pagination from "@/components/Pagination.vue"

const curPage = ref(1)
</script>

<template>
	<div class="relative w-full min-h-screen">
		<div class="w-11/12 mx-auto">
			<h1 class="py-4 text-2xl font-bold text-center">Outcome</h1>
			<!-- Table -->
			<!-- Total & pagination -->
			<div class="mb-2">
				<div class="text-center mb-2">Showing 99 to 99 of 999 rows</div>
				<div class="flex justify-center">
					<Pagination :total="100" :count="20" v-model="curPage" />
				</div>
			</div>
			<!-- Showcount & search -->
			<div>
				<div class="flex justify-center items-center gap-2 mb-2">
					<span>Show</span>
					<select class="select select-sm w-20">
						<option selected>20</option>
						<option>50</option>
						<option>100</option>
					</select>
					<span>registers</span>
					<button class="btn btn-square">
						<ArrowPathIcon class="w-6 h-6" />
					</button>
				</div>
				<div class="flex justify-center">
					<div class="join">
						<input
							class="input input-bordered join-item"
							placeholder="Email"
						/>
						<button class="btn btn-square join-item">
							<MagnifyingGlassIcon class="w-6 h-6" />
						</button>
					</div>
				</div>
			</div>
			<table class="table">
				<thead>
					<tr>
						<th class="flex gap-2">
							Name
							<MinusIcon class="w-4 h-4" />
						</th>
						<th class="flex gap-2">
							Quantity
							<ChevronDownIcon class="w-4 h-4" />
						</th>
						<th>
							<div class="flex gap-2">
								Date
								<ChevronUpIcon class="w-4 h-4 text-white" />
							</div>
						</th>
					</tr>
				</thead>
				<tbody>
					<tr v-for="i in 20">
						<td>Test</td>
						<td>99</td>
						<td>11-11-11</td>
					</tr>
				</tbody>
			</table>
			<!--  -->
			<div class="w-full h-24"></div>
		</div>
		<Navigation />
	</div>
</template>
