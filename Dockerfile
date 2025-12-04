FROM node:24-alpine

# expose the server port
WORKDIR /usr/src/app

EXPOSE 4000

# configure container to work with pnpm
ENV PNPM_HOME="/pnpm"
ENV PATH="$PNPM_HOME:$PATH"
# allows running npm, pnpm, yarn from node without installation
RUN corepack enable

# copy config files early for caching
COPY package.json pnpm-lock.yaml tsconfig.json ./

# install needed deps
RUN pnpm i -g typescript
RUN pnpm i

COPY . .

# build prod files
RUN pnpm build

# start prod server
CMD ["pnpm","start"]


