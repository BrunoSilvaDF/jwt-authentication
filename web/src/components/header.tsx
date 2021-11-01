import React from 'react'
import { Link, withRouter } from 'react-router-dom'
import { useLogoutMutation, useMeQuery } from '../generated/graphql'
import { setAccessToken } from '../accessToken'

export const Header = withRouter(({ history }) => {
  const { data, loading } = useMeQuery()
  const [logout, { client }] = useLogoutMutation()
  const isAuth = !loading && data && data.me
  if (loading) {
    return <div>...loading</div>
  }
  return (
    <header>
      <ul>
        <li>
          <Link to='/'>home</Link>
        </li>
        <li>
          <Link to='/users'>users</Link>
        </li>
        {!isAuth && (
          <li>
            <Link to='/register'>register</Link>
          </li>
        )}
        {!isAuth && (
          <li>
            <Link to='/login'>login</Link>
          </li>
        )}
        <li>
          <Link to='/bye'>bye</Link>
        </li>
        {isAuth && (
          <li>
            <button
              onClick={async () => {
                await logout()
                setAccessToken('')
                await client.resetStore()
                history.push('/')
              }}
            >
              logout
            </button>
          </li>
        )}
      </ul>
      {isAuth && `hello! you are logged in as ${data.me!.email}`}
    </header>
  )
})
