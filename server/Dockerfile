FROM node:20-alpine

WORKDIR /app


COPY package.json .

RUN yarn

COPY . .
ENV NODE_ENV production

RUN yarn compile

CMD yarn migrate && yarn start