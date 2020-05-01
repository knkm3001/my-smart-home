FROM node:12.12.0-alpine

WORKDIR /usr/src/app
COPY ./src ./

RUN apk update && \
    npm install -g npm @vue/cli
RUN chmod 777 ./*

RUN cd web-console

