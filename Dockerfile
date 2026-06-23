# Production Multi-Stage Dockerfile for Nexus Events AI
# ---------------------------------------------------

# Stage 1: Build Frontend Assets & Compile Server
FROM node:20-alpine AS builder
WORKDIR /app

# Install dependencies first for caching optimization
COPY package*.json ./
RUN npm ci

# Copy full source and compile
COPY . .
RUN npm run build

# Stage 2: Minimalist Production Runner
FROM node:20-alpine AS runner
WORKDIR /app
ENV NODE_ENV=production
ENV PORT=3000

# Copy necessary production artifacts from builder
COPY --from=builder /app/package*.json ./
COPY --from=builder /app/dist ./dist

# Install production-only dependencies
RUN npm ci --only=production

# Expose standard container ingress port
EXPOSE 3000

# Execute server bundle
CMD ["npm", "start"]
