import React, { useState, useEffect } from 'react'
import { Switch, Route, Link, useLocation } from 'react-router-dom'
import { Grid, Segment, Menu } from 'semantic-ui-react'

import Individual from './employment/Individual'
import Grouped from './employment/Grouped'

const Employment = ({...rest}) => {
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
    <Grid>
      <Grid.Column width={4}>
        <Menu fluid vertical tabular>
          <Menu.Item
            as={Link}
            to='/basic/employment/individual'
            name='individual'
            active={active === 'individual'}
            onClick={onClick}
          />
          <Menu.Item
            as={Link}
            to='/basic/employment/grouped'
            name='grouped'
            active={active === 'grouped'}
            onClick={onClick}
          />
        </Menu>
      </Grid.Column>
      <Grid.Column stretched width={12}>
        <Segment>
          <Switch>
            <Route exact path='/basic/employment/individual' component={Individual} />
            <Route exact path='/basic/employment/grouped' component={Grouped} />
            <Route component={Individual} />
          </Switch>
        </Segment>
      </Grid.Column>
    </Grid>
  )
}

export default Employment
