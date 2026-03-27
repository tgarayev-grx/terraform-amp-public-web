# Build stage: Node + pnpm, Next.js standalone output
FROM node:20-alpine AS builder

RUN corepack enable && corepack prepare pnpm@9.0.0 --activate
WORKDIR /usr/src

COPY package.json pnpm-lock.yaml pnpm-workspace.yaml turbo.json ./
COPY apps/web/package.json ./apps/web/
COPY packages/ui/package.json ./packages/ui/
COPY packages/ui ./packages/ui

RUN pnpm install --frozen-lockfile

COPY apps/web ./apps/web
# Ensure public dir exists for COPY in runner (Next.js may not create it)
RUN mkdir -p apps/web/public

ARG NEXT_PUBLIC_RECAPTCHA_SITE_KEY
ENV NEXT_PUBLIC_RECAPTCHA_SITE_KEY=$NEXT_PUBLIC_RECAPTCHA_SITE_KEY

RUN pnpm build

# Run stage: Node.js serves via standalone server
# Monorepo: standalone output is at apps/web/.next/standalone/apps/web/
FROM node:20-alpine AS runner

WORKDIR /app
ENV NODE_ENV=production
ENV PORT=80
ENV HOSTNAME="0.0.0.0"

RUN addgroup --system --gid 1001 nodejs
RUN adduser --system --uid 1001 nextjs

COPY --from=builder --chown=nextjs:nodejs /usr/src/apps/web/.next/standalone ./
COPY --from=builder --chown=nextjs:nodejs /usr/src/apps/web/.next/static ./apps/web/.next/static
COPY --from=builder --chown=nextjs:nodejs /usr/src/apps/web/public ./apps/web/public

USER nextjs
EXPOSE 80
# Monorepo: server.js is nested at apps/web/, run from there so .next is found
WORKDIR /app/apps/web
CMD ["node", "server.js"]
