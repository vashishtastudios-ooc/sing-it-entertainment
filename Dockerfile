# Use Node image
FROM node:20-alpine

# Prisma needs OpenSSL on Alpine
RUN apk add --no-cache openssl

WORKDIR /app

# Install deps. Copy the Prisma schema first so the `postinstall`
# (prisma generate) can find prisma/schema.prisma.
COPY package*.json ./
COPY prisma ./prisma
RUN npm install

# Copy source
COPY . .

# Placeholder so the Prisma client can be imported during `next build`.
# The real DATABASE_URL is injected at runtime via docker-compose env_file,
# which overrides this value.
ENV DATABASE_URL="mongodb://placeholder:27017/build?replicaSet=rs0"

# Build Next.js app
RUN npm run build

# Expose port
EXPOSE 3000

# Start production server
CMD ["npm", "start"]
