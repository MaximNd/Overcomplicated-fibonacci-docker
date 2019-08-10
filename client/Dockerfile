FROM node:alpine as builder
WORKDIR /app
COPY ./package.json ./
COPY ./package-lock.json ./
RUN npm i
COPY ./ ./
RUN npm run build

FROM nginx:alpine
EXPOSE 8080
COPY --from=builder /app/dist /usr/share/nginx/html
COPY ./nginx/default.conf /etc/nginx/conf.d/default.conf
