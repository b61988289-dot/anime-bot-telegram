FROM node:20-slim

RUN npm install -g pnpm

WORKDIR /app

COPY package.json pnpm-lock.yaml* ./
RUN pnpm install --frozen-lockfile 2>/dev/null || pnpm install

COPY . .
RUN pnpm run build

RUN mkdir -p /app/data

EXPOSE 3000

CMD ["node", "--enable-source-maps", "dist/index.mjs"]
