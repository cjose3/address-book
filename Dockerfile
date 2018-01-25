FROM node:carbon-alpine

ARG NODE_ENV=development
ENV NODE_ENV=${NODE_ENV} \
  SRC_PATH=/usr/src/app

WORKDIR ${SRC_PATH}

COPY package*.json ./

RUN apk --no-cache add --virtual .build-deps \
  g++ gcc libgcc libstdc++ linux-headers make python && \
  npm install --quiet node-gyp -g && \
  chown -R node:node ${SRC_PATH} && \
  chown -R node:node ./* && \
  su node -c 'npm install' && \
  npm rebuild bcrypt --build-from-source && \
  npm cache clean --force && \
  apk del .build-deps

COPY . ./

USER node
CMD [ "node", "app.js" ]
