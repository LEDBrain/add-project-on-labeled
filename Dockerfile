FROM node:15-slim
WORKDIR /usr/src/app
COPY package.json package-lock.json ./
RUN npm ci --production
RUN npm cache clean --force
RUN npm run build
ENV NODE_ENV="production"
COPY . .
EXPOSE 3000
ENTRYPOINT [ "npm", "start" ]
