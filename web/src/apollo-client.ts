import {
  ApolloClient,
  createHttpLink,
  InMemoryCache,
  from,
} from '@apollo/client'
import { setContext } from '@apollo/client/link/context'
import { TokenRefreshLink } from 'apollo-link-token-refresh'
import jwtDecode, { JwtPayload } from 'jwt-decode'
import { getAccessToken, setAccessToken } from './accessToken'

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

const tokenRefresherLink = new TokenRefreshLink({
  accessTokenField: 'accessToken',
  isTokenValidOrUndefined: () => {
    const token = getAccessToken()
    if (!token) {
      return true
    }
    try {
      const { exp } = jwtDecode<JwtPayload>(token)
      if (exp && Date.now() >= exp * 1000) {
        return false
      }
      return true
    } catch {
      return false
    }
  },
  fetchAccessToken: () => {
    return fetch('http://localhost:4000/refresh-token', {
      method: 'post',
      credentials: 'include',
    })
  },
  handleFetch: (accessToken: string) => setAccessToken(accessToken),
  handleError: err => {
    console.warn('Your refresh token is invalid. Try to relogin')
    console.error(err)
  },
})

export default new ApolloClient({
  uri: 'http://localhost:4000/graphql',
  credentials: 'include',
  cache: new InMemoryCache(),
  link: from([tokenRefresherLink, authLink, httpLink]),
})
