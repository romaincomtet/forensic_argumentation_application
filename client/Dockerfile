FROM node:20-alpine

WORKDIR /app

ENV NODE_ENV production


COPY package.json .

COPY ./public/forensic-server-0.2.0.tgz /app/public/forensic-server-0.2.0.tgz

RUN yarn

COPY . .

RUN yarn build

EXPOSE 3000

ENV NEXT_PUBLIC_URL_BACKEND http://localhost:3030

CMD yarn start