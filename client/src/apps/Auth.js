import React from 'react'
import { Switch, Route } from 'react-router-dom'

import Login from './auth/Login'
import Register from './auth/Register'

const Auth = ({...rest}) => {
  return (
    <Switch>
      <Route exact path='/auth/login' component={Login} />
      <Route exact path='/auth/register' component={Register} />
    </Switch>
  )
}

export default Auth
