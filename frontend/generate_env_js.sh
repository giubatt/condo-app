#!/bin/sh -eu
if [ -z "${GRAPHQL_URL:-}" ]; then
    GRAPHQL_URL=undefined
else
    GRAPHQL_URL=$(jq -n --arg graphql_url $GRAPHQL_URL '$graphql_url')
fi
 
cat <<EOF
export default {
  SNOWPACK_PUBLIC_GRAPHQL_URL: $GRAPHQL_URL,
  MODE: 'production',
  NODE_ENV: 'production',
}
EOF