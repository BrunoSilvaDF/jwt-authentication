import ReactDOM from 'react-dom'
import { ApolloProvider } from '@apollo/client'
import apolloClient from './apollo-client'
import { App } from './app'

ReactDOM.render(
  <ApolloProvider client={apolloClient}>
    <App />
  </ApolloProvider>,
  document.getElementById('root')
)
