FROM node:current-alpine

RUN apk add --no-cache libc6-compat

RUN npm i -g npm && npm -v

ENV NODE_ENV production
ENV PORT 3000

EXPOSE 3000

WORKDIR /home/nextjs/app

COPY package.json .
COPY yarn.lock .

RUN yarn install
RUN npx next telemetry disable

COPY . .

RUN yarn run build

CMD [ "yarn", "start" ]


