# Use Node.js Alpine image
FROM node:20-alpine

# Set working directory inside container
WORKDIR /app

# Copy package files for caching
COPY package.json package-lock.json ./

# Install dependencies
RUN npm ci

# Copy all frontend code
COPY . .

# Build frontend
RUN npm run build

# Expose frontend port
EXPOSE 3000

# Start frontend
CMD ["npm", "run", "start"]
