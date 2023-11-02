# People Manager

**Version:** 1.0.0

**License:** MIT

**Type:** ES Module

## Description
Simple nodejs cli app, that will allow you to manage people.

This was made with typescript
Dockerized with two environments:
1. Dev
2. Production

(See futher information below)

## Usage Production App (docker compose)

you just only need to have installed docker and docker compose and run:

```bash
docker compose -f docker-compose.production.yml up -d && docker attach tech_test_chernandez_cli_prod
```

Or even easier, if you have already installed node along side yarn, just run

```bash
yarn docker:prod:run
```

You can reset the environment deleting container, image, volumes and networks with the following command

```bash
yarn docker:dev:clean
```

## Usage Development App (docker compose)

```bash
docker compose -f docker-compose.dev.yml up -d && docker attach tech_test_chernandez_cli_dev
```

Or even easier with yarn:

```bash
yarn docker:dev:run
```

(This will watch the changes that you can made to the code)

You can reset the environment deleting container, image, volumes and networks with the following command

```bash
yarn docker:dev:clean
```

---
## Usage Production App (Vanilla)

Make sure you have at least node **14.20** (or prior) to run this project

```bash
yarn install && yarn start
```

## Usage Development App (Vanilla)

Make sure you have at least node **14.20** (or prior) to run this project

```bash
yarn install && yarn ts-watch
```
