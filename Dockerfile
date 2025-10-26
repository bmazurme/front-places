FROM node:21-alpine3.18 AS builder

WORKDIR /app

COPY package*.json ./
# RUN npm ci --no-audit --no-fund
RUN npm install
COPY . ./
RUN npm run build && rm -rf ./src

FROM nginx:1.23.1-alpine AS proxy

WORKDIR /app

COPY --from=builder /app/build /usr/share/nginx/html
COPY ./nginx/conf.d/default.conf /etc/nginx/conf.d

ENTRYPOINT [ "nginx", "-g", "daemon off;" ]
