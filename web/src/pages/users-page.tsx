import React from 'react'
import { useUsersQuery } from '../generated/graphql'

interface UsersPageProps {}

export const UsersPage: React.FC<UsersPageProps> = () => {
  const { data, loading } = useUsersQuery({ fetchPolicy: 'network-only' })

  if (loading) {
    return <div>loading...</div>
  }

  if (!loading && !data) {
    return <div>data not found</div>
  }

  return (
    <div>
      {data?.users.map(u => (
        <div style={{ border: '1px solid #ccc' }}>
          <div>id: {u.id}</div>
          <div>email: {u.email}</div>
          <div>createdAt: {u.createdAt}</div>
        </div>
      ))}
    </div>
  )
}
