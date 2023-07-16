FROM node:16-alpine

WORKDIR /usr/src/app

COPY package*.json ./

COPY .env ./

COPY . .

RUN npm install

ENV NODE_ENV production

EXPOSE ${PORT}

CMD [ "npm", "run", "deploy-cluster" ]
