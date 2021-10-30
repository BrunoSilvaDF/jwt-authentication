import 'reflect-metadata'
import { ApolloServer } from 'apollo-server-express'
import { buildSchema } from 'type-graphql'
import { UserResolver } from './user-resolver'

export const createApollo = async () =>
  new ApolloServer({
    schema: await buildSchema({
      resolvers: [UserResolver],
    }),
  })
