import React from 'react'
import { gql, useQuery } from '@apollo/client'

const App = () => {
  const { data, loading } = useQuery(gql`
    query {
      hello
    }
  `)

  if (loading) {
    return <div>loading...</div>
  }

  return <div className='App'>{data.hello}</div>
}

export default App
