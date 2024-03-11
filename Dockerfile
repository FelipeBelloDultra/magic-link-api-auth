FROM node:20-slim

RUN apt update -y && \
  apt install openssl -y

USER node

WORKDIR /home/node/app

CMD [ "tail", "-f", "/dev/null" ]
