import React, { useEffect, useState } from 'react'
import { setAccessToken } from './accessToken'
import { Router } from './router'

export const App: React.FC = () => {
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    fetch('http://localhost:4000/refresh-token', {
      method: 'post',
      credentials: 'include',
    })
      .then(res => res.json())
      .then(({ accessToken }) => {
        setAccessToken(accessToken)
        setLoading(false)
      })
  }, [])

  if (loading) {
    return <div>loading...</div>
  }

  return <Router />
}
