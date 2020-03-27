FROM node:12
USER root

WORKDIR /usr/src/app
COPY ./src ./
RUN chmod 777 ./*

RUN npm install


CMD [ "npm", "start" ]
