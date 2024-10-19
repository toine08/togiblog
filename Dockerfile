FROM nginx:alpine
FROM node:lts-bullseye-slim

COPY dist/ /usr/share/nginx/html

RUN corepack enable
RUN corepack prepare pnpm@latest-8 --activate

EXPOSE 80