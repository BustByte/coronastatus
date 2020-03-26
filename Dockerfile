FROM node:lts-alpine

RUN mkdir /app

COPY package.json yarn.lock /app/

WORKDIR /app
RUN yarn

CMD yarn dev
