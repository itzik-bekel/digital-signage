# Build stage
FROM node:16-alpine AS builder

# Set working directory
WORKDIR /app

# Install build dependencies
RUN apk add --no-cache python3 make g++

# Install dependencies first (for better caching)
COPY package*.json ./
RUN npm cache clean --force && npm install --legacy-peer-deps --loglevel=error --fetch-timeout=600000

# Copy source files
COPY . .

# Build the Next.js application
ENV NODE_ENV=production
ENV NODE_OPTIONS="--max_old_space_size=4096"
RUN npx cross-env NODE_ENV=production npm run build

# Production stage
FROM node:16-alpine

WORKDIR /app

# Install production dependencies only
COPY package*.json ./
RUN npm cache clean --force && npm install --production --legacy-peer-deps --loglevel=error --fetch-timeout=600000

# Copy built assets from builder stage
COPY --from=builder /app/.next ./.next

# Copy application files
COPY api ./api
COPY actions ./actions
COPY components ./components
COPY helpers ./helpers
COPY pages ./pages
COPY services ./services
COPY stores ./stores
COPY styles ./styles
COPY widgets ./widgets
COPY .env.example ./.env
COPY keys.js ./
COPY server.js ./
COPY routes.js ./
COPY .babelrc ./

# Expose the port
ENV PORT=80
EXPOSE 80

# Set production environment
ENV NODE_ENV=production
ENV ENVIRON=PROD

# Add required Node options
ENV NODE_OPTIONS=''

# Start the server
CMD ["node", "server.js"]
