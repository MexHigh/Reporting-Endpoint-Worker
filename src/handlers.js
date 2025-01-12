import { corsResponse } from "./cors"

export async function handleReportingAPIReport(env, ctx, body) {
	console.log({ message: "Recieved reporting API payload", reports: body })

	if (!Array.isArray(body)) {
		console.error({ message: "Reporting API payload is not an array" })
		return corsResponse(`Body should be an array of report objects`, { status: 400 })
	}

	let statements = []
	body.forEach((report, index) => {
		if (!report.type) {
			console.error({ message: `"type" field of report ${index} is empty`, report: report })
			return corsResponse(`"type" field of report ${index} is empty`, { status: 400 })
		}
		if (!report.body) {
			console.error({ message: `"body" field of report ${index} is empty`, report: report })
			return corsResponse(`"body" field of report ${index} is empty`, { status: 400 })
		}
		if (!report.url) {
			console.error({ message: `"url" field of report ${index} is empty`, report: report })
			return corsResponse(`"url" field of report ${index} is empty`, { status: 400 })
		}
		if (!report.user_agent) {
			console.error({ message: `"user_agent" field of report ${index} is empty`, report: report })
			return corsResponse(`"user_agent" field of report ${index} is empty`, { status: 400 })
		}
		if (!report.age) {
			console.error({ message: `"age" field of report ${index} is empty`, report: report })
			return corsResponse(`"age" field of report ${index} is empty`, { status: 400 })
		}

		const b = report.body
		let statement = null
		switch (report.type) {
			case "csp-violation":
				statement = env.D1_REPORTS.prepare(
					"INSERT INTO CSPReports VALUES (NULL, datetime('now'), ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?)"
				).bind(
					report.url,
					report.user_agent,
					report.age,
					b.blockedURL         ? b.blockedURL         : null,
					b.statusCode         ? b.statusCode         : null,
					b.referrer           ? b.referrer           : null,
					b.documentURL        ? b.documentURL        : null,
					b.disposition        ? b.disposition        : null,
					b.sourceFile         ? b.sourceFile         : null,
					b.lineNumber         ? b.lineNumber         : null,
					b.columnNumber       ? b.columnNumber       : null,
					b.originalPolicy     ? b.originalPolicy     : null,
					b.effectiveDirective ? b.effectiveDirective : null,
					b.sample             ? b.sample             : null,
				)
				break
			
			case "deprecation":
				statement = env.D1_REPORTS.prepare(
					"INSERT INTO DeprecationReports VALUES (NULL, datetime('now'), ?, ?, ?, ?, ?, ?, ?, ?, ?)"
				).bind(
					report.url,
					report.user_agent,
					report.age,
					b.id                 ? b.id                 : null,
					b.anticipatedRemoval ? b.anticipatedRemoval : null,
					b.message            ? b.message            : null,
					b.sourceFile         ? b.sourceFile         : null,
					b.lineNumber         ? b.lineNumber         : null,
					b.columnNumber       ? b.columnNumber       : null,
				)
				break
			
			case "intervention":
				statement = env.D1_REPORTS.prepare(
					"INSERT INTO InterventionReports VALUES (NULL, datetime('now'), ?, ?, ?, ?, ?, ?, ?, ?)"
				).bind(
					report.url,
					report.user_agent,
					report.age,
					b.id                 ? b.id                 : null,
					b.message            ? b.message            : null,
					b.sourceFile         ? b.sourceFile         : null,
					b.lineNumber         ? b.lineNumber         : null,
					b.columnNumber       ? b.columnNumber       : null,
				)
				break

			case "network-error":
				statement = env.D1_REPORTS.prepare(
					"INSERT INTO NetworkErrorReports VALUES (NULL, datetime('now'), ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?)"
				).bind(
					report.url,
					report.user_agent,
					report.age,
					b.method             ? b.method             : null,
					b.phase              ? b.phase              : null,
					b.protocol           ? b.protocol           : null,
					b.referrer           ? b.referrer           : null,
					b.server_ip          ? b.server_ip          : null,
					b.type               ? b.type               : null,
					b.elapsed_time       ? b.elapsed_time       : null,
					b.sampling_fraction  ? b.sampling_fraction  : null,
					b.status_code        ? b.status_code        : null,
				)
				break
	
			default:
				console.error({ message: `Report type "${report.type}" in report ${index} unsupported or unknown`, report: report })
				return corsResponse(`Report type "${report.type}" in report ${index} unsupported or unknown`, { status: 400 })
		}

		if (statement !== null) {
			console.log({ message: `Adding D1 statement to create a new report of type "${report.type}"` })
			statements.push(statement)
		} else {
			console.error({ message: "Got empty statement in handleReportingAPIReport, not adding an D1 statement" })
		}
	})

	// run all statements
	if (statements.length > 0) {
		console.log({ message: `Queueing ${statements.length} statement(s) for D1` })
		ctx.waitUntil(env.D1_REPORTS.batch(statements))
	} else {
		console.log({ message: "No statements recorded, not connecting to D1" })
	}

	console.log({ message: "All reports processed, writing ok response" })
	return corsResponse("ok", { status: 201 })
}

export async function handleLegacyCSPReport(env, ctx, type, body) {
	console.log({ message: "Recieved legacy CSP reporting payload", report: body, type: type })

	// TODO later
	return corsResponse("Not implemented", { status: 501 })
}

export async function handleTLSRPTReport(env, ctx, body) {
	console.log({ message: "Recieved TLS-RPT payload", report: body })

	// TODO later
	return corsResponse("Not implemented", { status: 501 })
}

export async function handleCAAReport(env, ctx, body) {
	console.log({ message: "Recieved CAA report payload", report: body })

	// TODO later
	return corsResponse("Not implemented", { status: 501 })
}