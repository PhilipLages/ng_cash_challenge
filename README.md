
# NG.CASH Challenge

This is a dockerized application developed with the dimensions of a mobile device in mind. For a better experience, go to inspect and enable mobile mode on device toolbar.


## Demo

<img src='./ng.gif' width='300px'>


## Features

- Creating an account;
- Logging into an account;
- Creating financial transactions between users;
- Listing transactions for logged in users;
- Protection by authentication.


## Tech Stack

**Client:** React, TypeScript, Context API, CSS3, 

**Server:** Node, Express, TypeScript, Prisma ORM, JWT

**DataBase:** PostgreSQL

## Environment Variables

To run this application you will need to add the following environment variables to the .env file in the backend folder:

`DATABASE_URL="postgresql://root:password@db:5432/NgCashDB?schema=mySchema"`

`JWT_SECRET = 'any_string'`

## Run locally

Clone the repository

```bash
  git clone git@github.com:PhilipLages/ng_cash_challenge.git
```

go to project's directory

```bash
  cd ng_cash_challenge
```

Start containers

```bash
  docker-compose up -d
```

Attach to backend container

```bash
  docker exec -it ng_cash_challenge_backend bash
```
Install dependencies

```bash
  npm install
```

Create database

```bash
  npm run migration
```

Start server

```bash
  npm run dev
```

Access the ng_cash_challenge_frontend container via VSCode's DevContainers extension

Install dependencies

```bash
  npm install
```

```bash
  npm run dev
```
Access the link created by Vite

## Back-End: API e Endpoints

#### base URL 

```http
  http://localhost:3001
```

#### Create new account 

```http
  POST /users/signup
```

| Parameters | Type     |
| :-------- | :------- |
| `username` | `string` |
| `password` | `string` |

#### Login

```http
  POST /users/login
```

| Parameters | Type     |
| :-------- | :------- |
| `username` | `string` |
| `password` | `string` |

#### Get a user account

```http
  GET /users/:id
```

| Parameters | Type     |
| :-------- | :------- |
| `id` | `number` |

#### Create new transaction

```http
  POST /users/:id/transactions
```

| Parameters | Type     |
| :-------- | :------- |
| `username` | `string` |
| `value` | `number` |
| `id` | `number` |

#### Get all transactions by a specific user

```http
  GET /users/:id/transactions
```

| Parameters | Type     |
| :-------- | :------- |
| `id` | `number` |


