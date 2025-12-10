# Backend Dockerfile (MCP Server + Node)
FROM node:20-alpine

WORKDIR /app

COPY server/package.json server/package-lock.json ./
RUN npm ci

COPY server/ ./

EXPOSE 4000
CMD ["npm", "run", "dev"]
