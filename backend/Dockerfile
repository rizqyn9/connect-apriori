FROM node:alpine3.16 as base

WORKDIR /app

FROM base as builder

COPY . .

RUN yarn install

RUN yarn build

FROM base

COPY --from=builder /app/ /app/

EXPOSE 28000

CMD ["yarn", "start"]
