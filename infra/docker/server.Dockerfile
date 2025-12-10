# Use Node.js Alpine image
FROM node:20-alpine

# Set working directory inside container
WORKDIR /app

# Copy only package files for caching
COPY package.json package-lock.json ./

# Install dependencies
RUN npm ci

# Copy the rest of backend code
COPY . .

# Expose backend port
EXPOSE 4000

# Start backend
CMD ["npm", "run", "start"]
