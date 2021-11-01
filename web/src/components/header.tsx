import React from 'react'
import { Link } from 'react-router-dom'
import { useMeQuery } from '../generated/graphql'

export const Header: React.FC = () => {
  const { data } = useMeQuery()
  const isAuth = !!data?.me
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
      </ul>
      {isAuth && `hello! you are logged in as ${data.me!.email}`}
    </header>
  )
}
