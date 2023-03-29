import base from "./_base"

const prefix = "auth"

async function login(body: { email: string; password: string }) {
	const res = await base.post(prefix + "", {
		json: body,
	})

	return res.status
}

export default {
	login,
}
