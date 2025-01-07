/**
 * Adds common CORS headers to the response 
 * @param {BodyInit | null} body Used as-is
 * @param {ResponseInit} init With added CORS headers
 * @returns {Response} new Response(body, init)
 */
export function corsResponse(body, init = {}) {
    if (!init.headers) {
        init.headers = new Headers()
    }
    init.headers.set("access-control-allow-origin", "*")
    init.headers.set("access-control-allow-methods", "POST")
    init.headers.set("access-control-allow-headers", "Content-Type")

    return new Response(body, init)
}