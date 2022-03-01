### Stage 1: Build ###
FROM node:16 as base
WORKDIR /home/node/app
COPY package*.json ./
RUN npm install
COPY . .
COPY app app

### Stage 2: Run ###
#FROM nginx:latest
#COPY --from=build-step /app /usr/share/nginx/html
##COPY nginx.conf etc/nginx/nginx.conf
#EXPOSE 8000:80