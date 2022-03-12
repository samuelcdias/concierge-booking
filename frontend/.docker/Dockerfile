FROM node:14.19.0-alpine3.15 AS base

RUN apk --no-cache add yarn --repository=http://dl-cdn.alpinelinux.org/alpine/edge/community

FROM base AS development

USER node

WORKDIR /home/node/app

CMD ls


# Source stage
# ---------------------------------------
FROM base AS source

USER node
WORKDIR /usr/src/app
COPY package*.json ./
RUN npm ci && npm cache clean --force
COPY . .