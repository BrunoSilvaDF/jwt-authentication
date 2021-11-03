# JWT Authentication

Code based on Ben Awad's tutorial "JWT Authentication Node.js Tutorial with GraphQL and React" (https://youtu.be/25GS0MLT8JU)

Small commits (with AngularJS Git Commit Message Conventions)

Added docker compose to build the project

## Running

### With docker compose

run `docker-compose up -d`

###  With npm/yarn

1. on ./server
	1. run `npm run up` / `yarn up`
	2. run `npm run dev` / `yarn dev`
2. on ./web
	1. run `npm start` / `yarn start`
## Techs

Typescript :: GraphQL :: TypeGraphQL :: TypeORM :: PostgreSQL :: React :: Apollo

## Backend

1. Setup a GraphQL Server using TypeGraphQL and TypeORM
1. Register a user
1. Login and create access and refresh tokens
1. Authenticated mutations/queries
1. Refresh the token
1. Revoke tokens for a suser

## Frontend

1. Setup Apollo and GraphQL Code Generator
1. React Router
1. Register / Login
1. Persisting session on refresh
1. Handling expired tokens
1. Fetching curr user in header, etc...
