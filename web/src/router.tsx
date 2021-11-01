import React from 'react'
import { BrowserRouter, Link, Route, Switch } from 'react-router-dom'
import { HelloPage, HomePage, LoginPage, RegisterPage } from './pages'

const Router = () => {
  return (
    <BrowserRouter>
      <header>
        <ul>
          <li>
            <Link to='/'>home</Link>
          </li>
          <li>
            <Link to='/register'>register</Link>
          </li>
          <li>
            <Link to='/login'>login</Link>
          </li>
        </ul>
      </header>
      <Switch>
        <Route path='/login' component={LoginPage} />
        <Route path='/register' component={RegisterPage} />
        <Route path='/hello' component={HelloPage} />
        <Route path='/' component={HomePage} />
      </Switch>
    </BrowserRouter>
  )
}

export default Router