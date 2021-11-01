import React, { useState } from 'react'
import { useLoginMutation } from '../generated/graphql'

interface LoginPageProps {}

export const LoginPage: React.FC<LoginPageProps> = () => {
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
            console.log(res.data)
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
