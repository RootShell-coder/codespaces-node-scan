FROM node:current-alpine
COPY docker/entrypoint /usr/sbin
RUN set -eux; \
    apk add --update --no-cache \
    bash \
    grep; \
    npm install -g npm@latest; \
    addgroup -S node-scan; \
    adduser -S node-scan -G node-scan -h /home/node-scan -s /bin/ash; \
    chmod +x /usr/sbin/entrypoint;

USER node-scan:node-scan
WORKDIR /home/node-scan
COPY --chown=node-scan:node-scan docker/index.js docker/package.json ./
RUN npm update
ENTRYPOINT [ "entrypoint" ]
