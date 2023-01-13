FROM node:18-alpine
RUN wget -qO /bin/pnpm "https://github.com/pnpm/pnpm/releases/latest/download/pnpm-linuxstatic-x64" && chmod +x /bin/pnpm
COPY . /app
WORKDIR /app
RUN pnpm i
EXPOSE 3001

CMD ["pnpm", "start"]

