# Get Node.js image
FROM node:14.20.0-alpine3.15 as base

# Cd into app directory
WORKDIR /app

# Copy package*.json
COPY package*.json ./

# Install dependencies with yarn package manager
RUN yarn install

# Copy our project files into the container
COPY . .


# Run the project

FROM base as prod
# Build the project
RUN yarn build
CMD [ "node", "./dist/index.js" ]

FROM base as dev
# watch changes
CMD ["yarn", "ts-watch"]

LABEL authors="carloshernandez"
