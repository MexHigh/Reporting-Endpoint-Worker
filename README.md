# Reporting Endpoint Worker

Todo

## Deploy

1. Copy `wrangler.example.toml` to `wrangler.toml` 
2. Fill in your worker and D1 details in `wrangler.toml`
3. Run `npm run deploy`

## Initializing the D1 database

This will delete all data in the database!

`npx wrangler d1 execute --remote --file ./schema.sql --yes`
