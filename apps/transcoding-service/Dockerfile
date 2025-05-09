# === Base build stage ===
FROM node:22-alpine AS builder

WORKDIR /app

RUN corepack enable && corepack prepare yarn@4.3.1

COPY . .

RUN yarn install --frozen-lockfile

RUN yarn build:transcoding

RUN yarn workspaces focus --all --production

# === Final lightweight stage ===
FROM node:22-alpine AS runtime

WORKDIR /app

RUN corepack enable && corepack prepare yarn@4.3.1

COPY --from=builder /app/yarn.lock ./yarn.lock
COPY --from=builder /app/.yarn /app/.yarn
COPY --from=builder /app/node_modules /app/node_modules
COPY --from=builder /app/dist/apps/transcoding-service /app/dist
COPY --from=builder /app/package.json ./package.json

WORKDIR /app/dist/apps/transcoding-service

ENV NODE_ENV=production

CMD ["node", "src/main.js"]
