<script setup lang="ts">
import {} from "vue"
import { useRouter } from "vue-router"
import { useField } from "vee-validate"
import * as yup from "yup"

import authService from "../services/auth"

import useGlobalStore from "../store"

const router = useRouter()
const globalStore = useGlobalStore()

const {
	value: email,
	errorMessage: emailE,
	validate: emailC,
} = useField<string>("email", yup.string().required(), {
	initialValue: "mama@mail.com",
})

const {
	value: password,
	errorMessage: passwordE,
	validate: passwordC,
} = useField<string>("email", yup.string().required(), {
	initialValue: "mamapass",
})

async function allValid(): Promise<boolean> {
	const results = await Promise.all([emailC(), passwordC()])
	if (results.some((res) => !res.valid)) return false
	return true
}

async function login() {
	if (!(await allValid())) return
	await authService.login({ email: email.value, password: password.value })
	console.log("././.")
	globalStore.$patch({
		user: true,
	})
	router.push({ name: "index" })
}
</script>

<template>
	<div class="relative w-screen min-h-screen">
		<div class="w-11/12 mx-auto">
			<h1 class="py-4 text-2xl font-bold text-center">Authentication</h1>
			<div class="form-control w-full">
				<label class="label">
					<span class="label-text">Email</span>
				</label>
				<input
					class="input input-bordered w-full"
					type="text"
					v-model="email"
					:class="{ 'input-error': !!emailE }"
				/>
				<label class="label">
					<span class="label-text-alt" v-if="emailE">{{
						emailE
					}}</span>
				</label>
			</div>
			<div class="form-control w-full">
				<label class="label">
					<span class="label-text">Password</span>
				</label>
				<input
					class="input input-bordered w-full"
					type="text"
					v-model="password"
					:class="{ 'input-error': !!passwordE }"
				/>
				<label class="label">
					<span class="label-text-alt" v-if="passwordE">{{
						passwordE
					}}</span>
				</label>
			</div>
			<!-- bottom actions -->
			<div class="fixed left-0 bottom-0 w-full bg-base-100">
				<div class="w-11/12 mx-auto py-4">
					<button class="btn btn-success btn-block" @click="login">
						Login
					</button>
				</div>
			</div>
		</div>
	</div>
</template>
