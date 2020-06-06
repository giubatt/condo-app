FROM node:12 AS build-stage

WORKDIR /app

COPY package*.json /app/
COPY yarn.lock /app/
RUN yarn
COPY ./ /app/
RUN yarn build

FROM node:slim

WORKDIR /app
COPY --from=build-stage /app/dist/ /app
COPY --from=build-stage /app/package*.json /app
COPY --from=build-stage /app/yarn.lock /app
RUN ls -la
RUN yarn --production

COPY docker-entrypoint.sh /
RUN chmod +x /docker-entrypoint.sh

ENTRYPOINT ["/docker-entrypoint.sh"]