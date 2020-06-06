#!/bin/sh -eu
./generate_env_js.sh > /var/www/__snowpack__/env.js
nginx -g "daemon off;"