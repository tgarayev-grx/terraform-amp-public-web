# Build stage: Node + pnpm, static export to apps/web/out
FROM node:20-alpine AS builder

RUN corepack enable && corepack prepare pnpm@9.0.0 --activate
WORKDIR /usr/src

COPY package.json pnpm-lock.yaml pnpm-workspace.yaml turbo.json ./
COPY apps/web/package.json ./apps/web/
COPY packages/ui/package.json ./packages/ui/
COPY packages/ui ./packages/ui

RUN pnpm install --frozen-lockfile

COPY apps/web ./apps/web

RUN pnpm build

# Serve stage: nginx serves static files from Next.js export
FROM nginx:1.17.9-alpine AS final

COPY --from=builder /usr/src/apps/web/out /usr/share/nginx/html
RUN rm -f /etc/nginx/conf.d/default.conf
COPY apps/web/nginx.conf /etc/nginx/conf.d/default.conf
EXPOSE 80
CMD ["nginx", "-g", "daemon off;"]
