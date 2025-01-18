# Reporting Endpoint Worker

Reporting API v1 Endpoint implementation based on [Cloudflare Workers](https://developers.cloudflare.com/workers/) as per www.w3.org/TR/reporting-1/. Uses [Cloudflare D1](https://developers.cloudflare.com/d1/) for storing reports. Compatible with the Workers Free Tier.

Currently, this tool only collects (and prunes) the reports, but does no analysis with it. It is however planned to add some alerting or summary functionality to this project.

Currently supported report types:
- CSP Violations &rarr; `csp-violation`
- Deprecations &rarr; `deprecation`
- Interventions &rarr; `intervention`
- Network Error Logging (NEL) &rarr; `network-error` _(experimental)_
- Crash Reports &rarr; `crash` _(experimental)_

See [here](https://developer.mozilla.org/de/docs/Web/HTTP/Headers/Reporting-Endpoints) for instructions on setting up the Reporting Headers to utilize this endpoint. Keep in mind that this Spec is currently experimental and only supported in Chromium based browsers out of the box (Firefox supports it via a config variable)!


## Deploy

1. [Login to Cloudflare with Wrangler](https://developers.cloudflare.com/workers/wrangler/commands/#login) (Wrangler can be invoked with `npx wrangler <commands>`)
1. [Create a D1 database](https://developers.cloudflare.com/d1/get-started/)
1. Copy `wrangler.example.toml` to `wrangler.toml`
1. Edit `wrangler.toml`:
    - Change the desired Worker name (optional)
    - Fill in your D1 details (`database_name` and `database_name`, do not edit the `binding`!)
1. Initialize the database: `npx wrangler d1 migrations apply --remote <database_name>`
1. Deploy the worker: `npm run deploy` (a new Worker will be created for you with the name, bindings and routes you have configured in `wrangler.toml`)


## Run D1 database migrations

Doing updates to this tool which require database migrations can be done without losing data. Just pull the current state of this repo and run the migrations:
- `git pull`
- `npx wrangler d1 migrations list --remote <database_name>` (to check which migrations must be applied)
- `npx wrangler d1 migrations apply --remote <database_name>`
- `npm run deploy`


## Pruning old reports

To prevent the database from filling up indefinitely, it is "pruned" every night at 00:00 UTC by deleting the oldest entries to reduce the table entry count to 1000 per report type. This results in a maximum of 4000 entries in total (4 report types * 1000) but may exceed over the day depinding on how many reports you are receiving.

The maximum number of reports per type to keep can be configured in `wrangler.toml` in the `[vars]` section via the `KEEP_REPORTS` variable.
