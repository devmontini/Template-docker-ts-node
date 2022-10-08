FROM node:16-alpine

RUN npm install -g ts-node

WORKDIR /usr/src/app

COPY package*.json ./
COPY yarn.lock ./
COPY . .

RUN npm install
RUN yarn install

ENV NODE_ENV=production

# run scripts migrattions and seeders EJ:
# npm run db:reset

EXPOSE 8000

CMD ["npm","start"]