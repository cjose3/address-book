FROM node:carbon-alpine

ENV HOME=/home/node/app

RUN apk --no-cache add --virtual native-deps \
  g++ gcc libgcc libstdc++ linux-headers make python && \
  npm install --quiet node-gyp -g &&\
  mkdir -p ${HOME} && \
  chown -R node:node ${HOME}

WORKDIR ${HOME}

COPY package*.json ./
RUN chown -R node:node ./*


USER node
RUN npm install
USER root

RUN apk del native-deps

COPY . ./
RUN chown -R node:node $HOME/*

USER node
CMD [ "node", "app.js" ]
