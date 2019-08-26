FROM node:12
ADD . /app
WORKDIR /app
RUN yarn
ENTRYPOINT ["yarn", "start"]
