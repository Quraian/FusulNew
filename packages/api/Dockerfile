# Base image
FROM node:22 AS builder

# Set working directory
WORKDIR /app

# Copy workspace files
COPY pnpm-lock.yaml package.json pnpm-workspace.yaml tsconfig.base.json ./
COPY packages/api/package.json packages/api/
COPY packages/common/package.json packages/common/

# Install dependencies using pnpm
RUN corepack enable && pnpm install --frozen-lockfile

COPY packages/common packages/common
RUN pnpm common build

# Copy source code
COPY packages/api packages/api

# Build the app
WORKDIR /app/packages/api
RUN pnpm run build

# ---- Production Image ----
FROM node:22

# Set working directory
WORKDIR /app

# Copy only necessary files from builder
COPY --from=builder /app/packages/api/node_modules packages/api/node_modules
COPY --from=builder /app/packages/common/node_modules packages/common/node_modules
COPY --from=builder /app/packages/api/dist packages/api/dist
COPY --from=builder /app/packages/api/package.json packages/api/

# Set environment variables
ENV NODE_ENV=production
EXPOSE 3000

# Start the server
CMD ["node", "packages/api/dist/main.js"]
