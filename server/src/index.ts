import 'reflect-metadata'
import 'dotenv/config'
import express from 'express'
import cors from 'cors'
import { createConnection } from 'typeorm'
import cookieParser from 'cookie-parser'
import { createApollo } from './utils'
import { refreshTokenRoute } from './routes'
import { applyCors } from './middleware'

const server = async () => {
  const app = express()
  const port = process.env.PORT

  app.use(cookieParser())
  app.use(applyCors())

  app.get('/', (_, res) => res.send('Server started'))

  app.post('/refresh-token', refreshTokenRoute)

  const conn = await createConnection({
    type: 'postgres',
    host: process.env.DATABASE_HOST,
    port: 5432,
    username: 'postgres',
    password: 'postgres',
    database: 'jwt-auth-tuto',
    synchronize: true,
    logging: false,
    entities: ['src/entities/**/*.ts'],
    migrations: ['src/migration/**/*.ts'],
    subscribers: ['src/subscriber/**/*.ts'],
    cli: {
      entitiesDir: 'src/entities',
      migrationsDir: 'src/migration',
      subscribersDir: 'src/subscriber',
    },
  })

  console.log('[database] db connection = ', conn.isConnected)

  const apollo = await createApollo()
  await apollo.start()
  apollo.applyMiddleware({ app, cors: false })

  app.listen(port, () => {
    console.log('[server] express server started at', port)
  })
}

server().catch(err => console.error(err.message))
