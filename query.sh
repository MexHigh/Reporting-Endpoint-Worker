#!/bin/bash

ACCOUNT_ID='FILL_ME_IN'
DATABASE_ID='FILL_ME_IN'
API_TOKEN='FILL_ME_IN'

QUERY='SELECT * FROM CSPReports LIMIT 25;'
#QUERY='SELECT * FROM CrashReports LIMIT 25;'
#QUERY='SELECT * FROM DeprecationReports LIMIT 25;'
#QUERY='SELECT * FROM InterventionReports LIMIT 25;'
#QUERY='SELECT * FROM NetworkErrorReports LIMIT 25;'
#QUERY='SELECT * FROM PermissionsPolicyReports LIMIT 25;'

curl --silent \
    "https://api.cloudflare.com/client/v4/accounts/$ACCOUNT_ID/d1/database/$DATABASE_ID/query" \
    -H "Authorization: Bearer $API_TOKEN" \
    -H "Content-Type: application/json" \
    -d "{ \"sql\": \"$QUERY\" }" | jq ".result[0].results"
