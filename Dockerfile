FROM nginx:alpine
FROM node:lts-bullseye-slim
RUN corepack enable
RUN corepack prepare pnpm@latest-8 --activate

COPY dist/ /usr/share/nginx/html



EXPOSE 80