import config from "@/config"

const events = new EventSource(config.sseUrl)

events.addEventListener("open", (e) => {
	console.log("Connection for sse")
	console.log(e)
})

events.addEventListener("message", (e) => {
	console.log(e)
})
