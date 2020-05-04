import React from 'react'
import { connect } from 'react-redux'
import { Switch, Route } from 'react-router-dom'

import Authorization from './Authorization'
import NoRoute from './NoRoute'
import Auth from './apps/Auth'
import Admin from './apps/Admin'
import Basic from './apps/Basic'
import Guest from './apps/Guest'


const App = ({...rest}) => (
  <div>
    <Authorization>
      <Switch>
        <Route exact path='/' component={Guest} />
        <Route path='/auth' component={Auth} />
        <Route path='/admin' component={Admin} />
        <Route path='/basic' component={Basic} />
        <Route path='/guest' component={Guest} />
        <Route component={NoRoute} />
      </Switch>
    </Authorization>
  </div>
)

/**
 * Must connect to Redux Store or Authorization Component
 * will not have access to the proper tokens and the tokens
 * will not be kept in state.
 */
export default connect()(App)
