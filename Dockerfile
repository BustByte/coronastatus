FROM node:lts-buster-slim

RUN mkdir /app

COPY package.json yarn.lock /app/

WORKDIR /app
RUN yarn

CMD yarn dev
