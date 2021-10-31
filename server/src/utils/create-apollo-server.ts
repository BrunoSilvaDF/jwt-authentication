import 'reflect-metadata'
import { ApolloServer } from 'apollo-server-express'
import { buildSchema } from 'type-graphql'
import resolvers from '../resolvers'

export const createApollo = async () =>
  new ApolloServer({
    schema: await buildSchema({
      resolvers: [resolvers.UserResolver],
    }),
  })
