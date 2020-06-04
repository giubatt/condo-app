import React from 'react'
import { BrowserRouter, Route, Switch, Redirect } from 'react-router-dom'
import LoginPage from 'src/pages/auth/Login'
import RegisterPage from 'src/pages/auth/Register'
import DashboardPage from 'src/pages/Dashboard'

const Routes: React.FC = () => {
  return (
    <BrowserRouter>
      <Switch>
        <Route exact path="/">
          <Redirect to="/dashboard"></Redirect>
        </Route>
        <Route path="/login">
          <LoginPage />
        </Route>
        <Route path="/cadastrar">
          <RegisterPage />
        </Route>
        <Route path="/dashboard">
          <DashboardPage>
            <Switch>
              <Route exact path="/dashboard/apartamento/:apartmentId">
                apartamento
              </Route>
              <Route
                exact
                path="/dashboard/apartamento/:apartmentId/morador/:tenantId"
              >
                morador
              </Route>
            </Switch>
          </DashboardPage>
        </Route>
      </Switch>
    </BrowserRouter>
  )
}

Routes.defaultProps = {}

export default Routes
