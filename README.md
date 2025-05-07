# pueth-conversion

A fullstack app that tracks and visualizes the real-time **pufETH conversion rate** using the `PufferVaultV2` smart contract.  
Built with React, TypeScript, Node, Express, PrismaORM, and PostgreSQL.

## Live Demo

some-url

## Local Setup

## 1. Clone the repo

```bash
git clone https://github.com/marins1897/pueth-conversion.git
cd pufeth-conversion
```

## 2. Backend setup

```bash
cd server
cp .env.example .env  # fill in real values
```

## Install deps and prepare

```bash
yarn install
yarn prisma generate
yarn prisma migrate deploy
yarn build
yarn start
```

## 3. Frontend setup

```bash
cd client
cp .env.example .env  # insert correct backend URL

yarn install
yarn build
yarn preview
```
