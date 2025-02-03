FROM node:lts-slim
RUN corepack enable
RUN corepack prepare pnpm@10.0.0 --activate

WORKDIR /pr-sum

COPY . .

RUN pnpm install

EXPOSE 3333

CMD ["pnpm", "dev"]



