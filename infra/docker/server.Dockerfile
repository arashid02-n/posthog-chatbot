# Use Node.js Alpine image
FROM node:20-alpine

# Set working directory
WORKDIR /app

# Copy only package files for caching
COPY package.json package-lock.json ./

# Install dependencies
RUN npm ci

# Copy the full backend source code
COPY . .

# Build TypeScript → JavaScript
RUN npm run build   # <-- REQUIRED

# Expose backend port
EXPOSE 4000

# Start backend from dist folder
CMD ["node", "dist/index.js"]
