FROM node:14.15.3-alpine3.12

WORKDIR /app

COPY . .

RUN npm install

RUN npm run build

CMD echo $PORT && node /app/dist/main.js