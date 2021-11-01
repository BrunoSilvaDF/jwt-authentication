import React from 'react'
import { BrowserRouter, Link, Route, Switch } from 'react-router-dom'
import {
  HelloPage,
  HomePage,
  LoginPage,
  RegisterPage,
  ByePage,
  UsersPage,
} from './pages'

export const Router = () => {
  return (
    <BrowserRouter>
      <header>
        <ul>
          <li>
            <Link to='/'>home</Link>
          </li>
          <li>
            <Link to='/users'>users</Link>
          </li>
          <li>
            <Link to='/register'>register</Link>
          </li>
          <li>
            <Link to='/login'>login</Link>
          </li>
          <li>
            <Link to='/bye'>bye</Link>
          </li>
        </ul>
      </header>
      <Switch>
        <Route path='/login' component={LoginPage} />
        <Route path='/register' component={RegisterPage} />
        <Route path='/users' component={UsersPage} />
        <Route path='/hello' component={HelloPage} />
        <Route path='/bye' component={ByePage} />
        <Route path='/' component={HomePage} />
      </Switch>
    </BrowserRouter>
  )
}
