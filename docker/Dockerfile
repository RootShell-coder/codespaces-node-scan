FROM node:current-alpine

COPY entrypoint /usr/sbin

RUN set -eux; \
    npm install -g npm@latest; \
    addgroup -S node-scan; \
    adduser -S node-scan -G node-scan -h /home/node-scan -s /bin/ash; \
    chmod +x /usr/sbin/entrypoint;

USER node-scan:node-scan

WORKDIR /home/node-scan

COPY --chown=node-scan:node-scan index.js package.json ./

RUN npm update

ENTRYPOINT [ "entrypoint" ]
