FROM node:20-alpine AS builder
WORKDIR /usr/src/app
COPY package.json yarn.lock ./
RUN apk add --no-cache python3 make g++ \
  && yarn install --frozen-lockfile
COPY . .
RUN yarn build

FROM node:20-alpine AS runner
WORKDIR /usr/src/app
COPY --from=builder /usr/src/app/dist ./dist
COPY package.json yarn.lock ./
RUN yarn install --production --frozen-lockfile
ENV NODE_ENV=production
EXPOSE 3000
CMD ["node", "dist/index.js"]
