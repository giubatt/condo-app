import React from 'react'
import { BrowserRouter, Route, Switch, Redirect } from 'react-router-dom'
import LoginPage from '../pages/auth/Login'
import RegisterPage from '../pages/auth/Register'

const Routes: React.FC = () => {
  return (
    <BrowserRouter>
      <Switch>
        <Route exact path="/">
          <Redirect to="/login"></Redirect>
        </Route>
        <Route path="/login">
          <LoginPage />
        </Route>
        <Route path="/cadastrar">
          <RegisterPage />
        </Route>
      </Switch>
    </BrowserRouter>
  )
}

Routes.defaultProps = {}

export default Routes
