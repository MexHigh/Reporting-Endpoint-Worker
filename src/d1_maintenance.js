/**
 * Clears the oldest entries exceeding a fixed number of entries per D1 table.
 * Used to stay withing the storage limits of the free tier.
 * @param {*} env Cloudflare env object (used for accessing the D1 database) 
 * @returns {D1Result} Database delete operation result
 */
export async function clearOldEntriesFromD1(env) {
    const tablesToPrune = [
        "CSPReports", 
        "DeprecationReports", 
        "InterventionReports", 
        "NetworkErrorReports",
        "CrashReports",
    ]
    
    let statements = []
    tablesToPrune.forEach(tableName => {
        const statement = env.D1_REPORTS.prepare(
            `DELETE FROM ${tableName} WHERE _ID IN (
                SELECT _ID
                FROM ${tableName}
                WHERE (SELECT COUNT(*) FROM ${tableName}) > ${env.KEEP_REPORTS || 1000}
                ORDER BY _CREATED ASC
                LIMIT (SELECT COUNT(*) FROM ${tableName}) - ${env.KEEP_REPORTS || 1000}
            );`
        )
        statements.push(statement)
    })

    return await env.D1_REPORTS.batch(statements)
}
