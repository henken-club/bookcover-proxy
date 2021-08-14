# whole dependencies
FROM node:16.4.2-slim AS deps
WORKDIR /app

COPY package.json yarn.lock .yarnrc ./
COPY .yarn ./.yarn
RUN yarn install --frozen-lockfile && yarn cache clean

# production only dependencies
FROM deps AS deps-production
WORKDIR /app

RUN npm prune --production

# builder
FROM deps AS builder
WORKDIR /app

COPY tsconfig.json tsconfig.build.json nest-cli.json ./
COPY src ./src
RUN yarn run build

# runner
FROM deps-production AS runner
WORKDIR /app

ENV PORT 4000
ENV NODE_ENV production

COPY --from=builder /app/dist ./dist

EXPOSE $PORT

CMD ["node", "dist/main.js"]
