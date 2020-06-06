FROM node:12 AS build-stage

WORKDIR /app

COPY package*.json /app/
COPY yarn.lock /app/
RUN yarn
COPY ./ /app/
RUN yarn build

FROM nginx:1.14.1-alpine
RUN apk add --no-cache jq

COPY --from=build-stage /app/build/ /var/www/
COPY ./nginx.conf /etc/nginx/conf.d/default.conf

COPY docker-entrypoint.sh generate_env_js.sh /
RUN chmod +x docker-entrypoint.sh generate_env_js.sh

ENTRYPOINT ["/docker-entrypoint.sh"]