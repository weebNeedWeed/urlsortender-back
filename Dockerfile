FROM node:14.15.3-alpine3.12

WORKDIR /app

COPY . .

RUN npm install

CMD npm run build && node /app/dist/main.js