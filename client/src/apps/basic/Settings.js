import React, { useState, useEffect } from 'react'
import { Switch, Route, Link, useLocation } from 'react-router-dom'
import { Grid, Segment, Menu } from 'semantic-ui-react'
import styled from 'styled-components'

import Account from './settings/Account'
import WorkGroups from './settings/WorkGroups'

const GridBlock = styled.div`
  margin-left: 1rem;
  margin-right: 1rem;
`

const Settings = ({...rest}) => {
  const location = useLocation()
  const [active, setActive] = useState('')

  const updateActiveMenu = () => {
    const { pathname } = location
    if( pathname ) {
      const menuName = pathname.match(/\/(\w+)$/)[1]
      setActive(menuName)
    }
  }
  useEffect(updateActiveMenu, [location])

  const onClick = (e, {name}) => setActive(name)

  return (
    <GridBlock>
      <Grid>
        <Grid.Column width={4}>
          <Menu fluid vertical tabular>
            <Menu.Item
              as={Link}
              to='/basic/settings/account'
              name='profile'
              active={active === 'profile'}
              onClick={onClick}
            />
            <Menu.Item
              as={Link}
              to='/basic/settings/work_groups'
              name='work_groups'
              active={active === 'work_groups'}
              onClick={onClick}
            />
          </Menu>
        </Grid.Column>
        <Grid.Column stretched width={12}>
          <Segment>
            <Switch>
              <Route exact path='/basic/settings/account' component={Account} />
              <Route exact path='/basic/settings/work_groups' component={WorkGroups} />
              <Route component={Account} />
            </Switch>
          </Segment>
        </Grid.Column>
      </Grid>
    </GridBlock>
  )
}

export default Settings
