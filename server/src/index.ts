import 'reflect-metadata'
import express from 'express'
import cors from 'cors'
import { createConnection } from 'typeorm'
import { createApollo } from './utils'

const server = async () => {
  const app = express()
  const port = 4000

  app.get('/', (_, res) => res.send('Server started'))

  await createConnection()

  app.use(
    cors({
      origin: ['*', 'https://studio.apollographql.com'],
      credentials: true,
    })
  )

  const apollo = await createApollo()
  await apollo.start()
  apollo.applyMiddleware({ app, cors: false })

  app.listen(port, () => {
    console.log('[server] express server started at', port)
  })
}

server().catch(err => console.error(err.message))

// createConnection()
//   .then(async connection => {
//     console.log('Inserting a new user into the database...')
//     const user = new User()
//     user.firstName = 'Timber'
//     user.lastName = 'Saw'
//     user.age = 25
//     await connection.manager.save(user)
//     console.log('Saved a new user with id: ' + user.id)

//     console.log('Loading users from the database...')
//     const users = await connection.manager.find(User)
//     console.log('Loaded users: ', users)

//     console.log('Here you can setup and run express/koa/any other framework.')
//   })
//   .catch(error => console.log(error))
