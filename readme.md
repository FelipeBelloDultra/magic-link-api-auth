# Magic Link API Auth

Backend application for user authentication using magic link

## How to run?

- Clone this repository
- Copy and replace values from .env.example to .env
- Run the docker compose to create all containers with `docker compose up -d`
- Generate MongoDB document schema using `docker exec -it api-magic-link npm run db:generate`
- Running the HTTP server with `docker exec -it api-magic-link npm run dev:watch`

## How it works?

- Make HTTP request to create account with name + email in the body request `[POST] /account`
- Make HTTP request to send authentication link to the account email with email in the body request `[POST] /account/auth`
- Get the token generated in the email sent and use it to authenticate in `[POST] /account/verify/${TOKEN}`
- Make HTTP request to protected route to see authenticated account `[POST] /account/me`

## Technologies used

- NodeJS
- Typescript
- BullMQ
- Fastify
- tsyringe
- zod
- Vitest
