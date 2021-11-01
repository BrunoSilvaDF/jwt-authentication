import React, { useState } from 'react'
import { useLoginMutation } from '../generated/graphql'
import { setAccessToken } from '../accessToken'
import { RouteComponentProps } from 'react-router-dom'

interface LoginPageProps {}

export const LoginPage: React.FC<RouteComponentProps & LoginPageProps> = ({
  history,
}) => {
  const [login] = useLoginMutation()
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const [error, setError] = useState('')

  return (
    <div>
      <h3>Login</h3>
      <form
        onSubmit={async e => {
          e.preventDefault()
          try {
            const res = await login({
              variables: {
                email,
                password,
              },
            })
            if (res.data) {
              setAccessToken(res.data.login.accessToken)
              alert('login successful')
              history.push('/')
            }
          } catch (err: any) {
            setError(err?.message)
          }
        }}
      >
        <input
          value={email}
          placeholder='email'
          onChange={e => setEmail(e.target.value)}
        />
        <input
          value={password}
          placeholder='password'
          onChange={e => setPassword(e.target.value)}
        />
        <button type='submit'>login</button>
      </form>
      <span>{error}</span>
    </div>
  )
}
