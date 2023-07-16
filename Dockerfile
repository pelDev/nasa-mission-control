FROM node:16-alpine

WORKDIR /usr/src/app

COPY package*.json ./

COPY . .

RUN npm install

ENV NODE_ENV production

EXPOSE 8000

CMD [ "npm", "run", "deploy-cluster" ]
