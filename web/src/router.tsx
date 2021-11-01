import React from 'react'
import { BrowserRouter, Route, Switch } from 'react-router-dom'
import { Header } from './components/header'
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
      <Header />
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
