# syntax=docker/dockerfile:1

# Base image
FROM node:20-alpine AS base
WORKDIR /app

# Install dependencies separately for better layer caching
COPY package.json package-lock.json* ./
ENV NPM_CONFIG_LEGACY_PEER_DEPS=true
RUN npm ci --no-audit --no-fund || npm install --no-audit --no-fund

# ---------- Development ----------
FROM base AS dev
ENV NODE_ENV=development
WORKDIR /app
COPY . .
EXPOSE 3000
CMD ["npm", "run", "dev", "--", "-p", "3000", "-H", "0.0.0.0"]

# ---------- Build ----------
FROM base AS build
ENV NODE_ENV=production
WORKDIR /app
COPY . .
RUN npm run build

# ---------- Production ----------
FROM node:20-alpine AS prod
ENV NODE_ENV=production
WORKDIR /app
COPY package.json package-lock.json* ./
RUN npm ci --omit=dev --no-audit --no-fund || npm install --omit=dev --no-audit --no-fund
COPY --from=build /app/.next ./.next
COPY public ./public
EXPOSE 3000
CMD ["npm", "run", "start"]




