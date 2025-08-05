
FROM node:20-alpine as builder
WORKDIR /app
COPY . .
RUN npm install && npm run build

# Step 2: Serve using NGINX
FROM nginx:alpine
COPY --from=builder /app/dist /usr/share/nginx/html
COPY nginx/default.conf /etc/nginx/conf.d/default.conf
EXPOSE 80
CMD ["nginx", "-g", "daemon off;"]
