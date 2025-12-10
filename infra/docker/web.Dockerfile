# Use Node.js 20 Alpine for small image size
FROM node:20-alpine

# Set working directory inside container
WORKDIR /app

# Copy only package files first for caching npm install
COPY package.json package-lock.json ./

# Install dependencies
RUN npm ci

# Copy all frontend files
COPY . .  # context is ../web, so all files inside web folder will copy here

# Build frontend
RUN npm run build

# Expose port
EXPOSE 3000

# Default command to run
CMD ["npm", "start"]
