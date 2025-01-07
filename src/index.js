import { corsResponse } from "./cors"
import { handleReportingAPIReport, handleLegacyCSPReport, handleTLSRPTReport, handleCAAReport } from "./handlers"

export default {
	async fetch(request, env, ctx) {
		// respond to CORS requests
		if (request.method === "OPTIONS") {
			return corsResponse("ok")
		}

		// reject non-POST requests
		if (request.method !== "POST") {
			return corsResponse("Method not allowed", { status: 405 })
		}

		// check correct content type (only log warning)
		let contentType = request.headers.get("content-type")
		if (!contentType || !contentType.includes("application/reports+json")) {
			console.log({ message: `content-type of incoming POST request is not "application/reports+json", got "${contentType}" instead` })
		}

		// get body
		let body
		try {
			body = await request.json()
		} catch (e) {
			return corsResponse("Missing or malformed request body", { status: 400 })
		}

		// match route
		let url = new URL(request.url)
		switch (url.pathname) { // `url.pathname` only contains path without query params
			// web reporting api endpoint
			case "/reporting":
				return await handleReportingAPIReport(env, ctx, body)
			
			// legacy CSP endpoints
			case "/csp/enforcing":
				return await handleLegacyCSPReport(env, ctx, "enforcing", body)
			case "/csp/reportOnly":
				return await handleLegacyCSPReport(env, ctx, "report only", body)
			
			// TLS-RPT (SMTP TLS) reporting
			case "/tlsrpt":
				return await handleTLSRPTReport(env, ctx, body)

			// CAA reporting
			case "/caa":
				return await handleCAAReport(env, ctx, body)

			// not found
			default:
				console.log({ message: "unknown endpoint hit", endpoint_hit: url })
				return corsResponse("Not found", { status: 404 })
		}
	},
}
