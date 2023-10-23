# Stage 1: Angular Build
FROM node:14.15.4 as node
WORKDIR /app
COPY . .
RUN npm install
RUN npm run build --prod

# Stage 2: Nginx
FROM nginx:alpine

COPY ./nginx-config/default.conf /etc/nginx/conf.d/default.conf

COPY --from=node /app/dist/northwind-frontend /usr/share/nginx/html
