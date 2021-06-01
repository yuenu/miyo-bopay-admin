FROM node:lts-buster-slim AS builder
ARG ENV
WORKDIR /app
COPY package.json yarn.lock /app/
RUN yarn install -s --production=true --pure-lockfile --non-interactive
COPY . /app/
RUN yarn build:$ENV

FROM spinach.azurecr.io/spinach/web/server:latest
COPY --from=builder /app/build/ /usr/share/nginx/html