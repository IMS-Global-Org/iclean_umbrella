import React from 'react'
import { Switch, Route } from 'react-router-dom'

import BasicAppBar from './basic/BasicAppBar'
import Dashboard from './basic/Dashboard'
import UserInfo from './basic/UserInfo'
import Settings from './basic/Settings'
import Employment from './basic/Employment'

const Basic = ({...rest}) => {
  return (
    <>
      <BasicAppBar />
      <Switch>
        <Route exact path='/basic/user_info' component={UserInfo} />
        <Route path='/basic/settings' component={Settings} />
        <Route path='/basic/employment' component={Employment} />
        <Route component={Dashboard} />
      </Switch>
    </>
  )
}

export default Basic
