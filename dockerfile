FROM node:lts-slim

WORKDIR /pr-sum

COPY package.json pnpm-lock.yaml* ./

RUN corepack enable pnpm && pnpm i;

COPY . .

RUN pnpm install

EXPOSE 3333

CMD ["pnpm", "dev"]



