FROM node:12.12.0-alpine

WORKDIR /usr/src/app
COPY ./src ./

RUN apk update && \
    npm install -g npm @vue/cli &&\
    rm -rf node_modules package-lock.json && \
    npm install
RUN chmod 777 ./*

WORKDIR /usr/src/app/web-console
CMD ["npm", "run", "serve"]
