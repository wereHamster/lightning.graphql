FROM node:10
ADD . /app
WORKDIR /app
RUN yarn
ENTRYPOINT ["yarn", "start"]
