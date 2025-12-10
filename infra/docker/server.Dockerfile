# Use Node.js 20 Alpine for backend
FROM node:20-alpine

# Set working directory inside container
WORKDIR /app

# Copy only package files first for caching npm install
COPY package.json package-lock.json ./

# Install dependencies
RUN npm ci

# Copy all backend files
COPY . .  # context is ../server, so all files inside server folder will copy here

# Expose backend port
EXPOSE 4000

# Default command to run
CMD ["npm", "start"]
