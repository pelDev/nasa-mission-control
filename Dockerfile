FROM node:16-alpine

WORKDIR /usr/src/app

COPY package*.json ./

COPY . .

RUN npm install

ENV NODE_ENV production

ARG PORT
ENV PORT ${PORT}

EXPOSE ${PORT}

CMD [ "npm", "run", "deploy-cluster" ]
