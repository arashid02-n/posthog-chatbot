# Use Node.js Alpine image
FROM node:20-alpine

# Set working directory
WORKDIR /app

# Copy only package files
COPY package.json package-lock.json ./

# Install dependencies
RUN npm ci

# Copy backend source
COPY . .

# Build TypeScript to JavaScript
RUN npm run build   # <-- VERY IMPORTANT

# Expose backend port
EXPOSE 4000

# Start backend (runs dist/index.js)
CMD ["npm", "run", "start"]
