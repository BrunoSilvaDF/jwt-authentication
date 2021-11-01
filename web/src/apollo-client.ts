import {
  ApolloClient,
  createHttpLink,
  InMemoryCache,
  ApolloLink,
} from '@apollo/client'
import { setContext } from '@apollo/client/link/context'
import { TokenRefreshLink } from 'apollo-link-token-refresh'
import jwtDecode, { JwtPayload } from 'jwt-decode'
import { getAccessToken } from './accessToken'

const httpLink = createHttpLink({
  uri: 'http://localhost:4000/graphql',
  credentials: 'include',
})

const authLink = setContext((_, { headers }) => {
  const tok = getAccessToken()
  return {
    headers: {
      ...headers,
      authorization: tok ? `bearer ${tok}` : undefined,
    },
  }
})

// const tokenRefresher = ApolloLink.from([
//   new TokenRefreshLink({
//     accessTokenField: 'accessToken',
//     isTokenValidOrUndefined: () => {
//       const token = getAccessToken()
//       if (!token) {
//         return true
//       }
//       try {
//         const { exp } = jwtDecode<JwtPayload>(token)
//         if (exp && Date.now() >= exp * 1000) {
//           return false
//         }
//         return true
//       } catch {
//         return false
//       }
//     },
//     fetchAccessToken: () => Promise.resolve({}),
//     handleFetch: (accessToken: string) => {},
//   })
// ])

export default new ApolloClient({
  uri: 'http://localhost:4000/graphql',
  credentials: 'include',
  cache: new InMemoryCache(),
  link: authLink.concat(httpLink),
})
