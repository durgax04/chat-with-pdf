# Stage-1 install dependencies
FROM node:22-alpine AS deps
WORKDIR /app

RUN corepack enable pnpm
RUN corepack prepare pnpm@10.17.1 --activate

COPY package.json pnpm-lock.yaml ./
COPY prisma ./prisma/

RUN pnpm install --frozen-lockfile

# Stage-2 Build the application
FROM node:22-alpine AS builder
WORKDIR /app

RUN corepack enable pnpm
RUN corepack prepare pnpm@10.17.1 --activate

COPY --from=deps /app/node_modules ./node_modules
COPY . .

RUN npx prisma generate
RUN pnpm build

# Stage-3 Prod Runner
FROM node:22-alpine AS runner
WORKDIR /app

ENV NODE_ENV=production
# Disable telemetry during runtime
ENV NEXT_TELEMETRY_DISABLED=1


# Create a non-root system user for security
RUN addgroup --system --gid 1001 nodejs
RUN adduser --system --uid 1001 nextjs

# Copy public assets and static files 
COPY --from=builder /app/public ./public

# Copy the actual standalone application files
COPY --from=builder --chown=nextjs:nodejs /app/.next/standalone ./
COPY --from=builder --chown=nextjs:nodejs /app/.next/static ./.next/static

# Automatically leverages standalone output trace
# This includes a minimal, bundled node_modules directory
COPY --from=builder --chown=nextjs:nodejs /app/node_modules/.pnpm/prisma@* /app/node_modules/.pnpm/prisma@*
COPY --from=builder --chown=nextjs:nodejs /app/node_modules/.pnpm/@prisma+client@* /app/node_modules/.pnpm/@prisma+client@*

# Copy Prisma schema and engines for production database migrations/queries
COPY --from=builder --chown=nextjs:nodejs /app/prisma ./prisma

USER nextjs

EXPOSE 3000
ENV PORT=3000
ENV HOSTNAME="0.0.0.0"

CMD ["node", "server.js"]
