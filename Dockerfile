FROM node:latest

RUN apt update \
    && apt upgrade \
    && npm install -g npm@latest
WORKDIR /home/node
COPY .. /home/node
COPY entrypoint /usr/bin
RUN chmod +x /usr/bin/entrypoint \
    && rm /home/node/entrypoint
ENTRYPOINT [ "entrypoint" ]
