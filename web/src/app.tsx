import React from 'react'
import { useHelloQuery } from './generated/graphql'

const App = () => {
  const { data, loading } = useHelloQuery()

  if (loading) {
    return <div>loading...</div>
  }

  return <div className='App'>{data?.hello}</div>
}

export default App
