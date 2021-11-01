import React, { useState } from 'react'
import { RouteComponentProps } from 'react-router-dom'
import { useRegisterMutation } from '../generated/graphql'

interface RegisterPageProps {}

export const RegisterPage: React.FC<RouteComponentProps & RegisterPageProps> =
  ({ history }) => {
    const [register] = useRegisterMutation()
    const [email, setEmail] = useState('')
    const [password, setPassword] = useState('')
    const [error, setError] = useState('')

    return (
      <div>
        <h3>Register</h3>
        <form
          onSubmit={async e => {
            e.preventDefault()
            const res = await register({
              variables: {
                email,
                password,
              },
            })
            if (!res.data?.register) {
              setError('something went wrong')
            }
            history.push('/')
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
          <button type='submit'>register</button>
        </form>
        <span>{error}</span>
      </div>
    )
  }
