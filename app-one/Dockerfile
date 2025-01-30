FROM node:18-alpine

WORKDIR /app

COPY --chown=node:node package.json .

RUN npm install

RUN npm i -g serve

COPY --chown=node:node . .

RUN ["chmod", "+x", "node_modules/.bin/tsc"]
RUN ["chmod", "+x", "node_modules/.bin/vite"]

RUN npm run build

EXPOSE 3000

CMD [ "serve", "-s", "dist" ]