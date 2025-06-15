FROM node:18-alpine

WORKDIR /app

COPY . .

RUN npm install -g pm2
RUN npm install
RUN npm run build
RUN npm install -g serve

EXPOSE 5000

CMD ["pm2-runtime", "--name", "client", "--", "serve", "-s", "dist", "-l", "3000"]
