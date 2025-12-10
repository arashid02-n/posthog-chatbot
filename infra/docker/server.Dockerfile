# Server Dockerfile
FROM node:20-alpine

WORKDIR /app

COPY package*.json ./
RUN npm ci

COPY . .    # این یعنی همه فایل‌های context (../server) را در کانتینر /app می‌ریزد

EXPOSE 4000

CMD ["npm", "run", "dev"]
