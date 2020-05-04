import React from 'react'
import { Switch, Route } from 'react-router-dom'

import Dashboard from './basic/Dashboard'
import UserInfo from './basic/UserInfo'

const Basic = ({...rest}) => {
  return (
    <Switch>
      <Route exact path='/basic/user_info' component={UserInfo} />
      <Route component={Dashboard} />
    </Switch>
  )
}

export default Basic
