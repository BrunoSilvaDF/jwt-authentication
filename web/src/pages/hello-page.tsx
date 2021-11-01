import React from 'react'
import { useHelloQuery } from '../generated/graphql'

export const HelloPage: React.FC = () => {
  const { data, loading } = useHelloQuery()

  if (loading) {
    return <div>loading...</div>
  }

  if (!loading && !data) {
    return <div>data not found</div>
  }

  return <div>{data?.hello}</div>
}
