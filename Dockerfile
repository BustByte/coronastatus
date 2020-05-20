FROM node:lts-buster-slim

RUN mkdir /app
WORKDIR /app

COPY package.json yarn.lock
COPY . .

RUN yarn
CMD yarn start
