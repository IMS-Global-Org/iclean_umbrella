import React from 'react'
import { Link } from 'react-router-dom'
import { connect } from 'react-redux'
import { Menu, Dropdown, Icon, Input } from 'semantic-ui-react'
import styled from 'styled-components'

const BasicMenu = styled(Menu)`
  margin-left: 1rem;
  margin-right: 1rem;
`


const BasicAppBar = ({isAuthenticated, ...rest}) => {

  return (
    <BasicMenu secondary>
      <Dropdown item icon='bars' simple>
        <Dropdown.Menu>

          <Dropdown.Item>
            <Icon name='dropdown' />
            <span className='text'>Settings</span>
            <Dropdown.Menu>
              <Dropdown.Item
                as={Link}
                to='/basic/settings/account'
              >
                Account
              </Dropdown.Item>
              <Dropdown.Item
                as={Link}
                to='/basic/settings/work_groups'
              >
                Work Groups
              </Dropdown.Item>
            </Dropdown.Menu>
          </Dropdown.Item>

          <Dropdown.Item>
            <Icon name='dropdown' />
            <span className='text'>Employment</span>
            <Dropdown.Menu>
              <Dropdown.Item
                as={Link}
                to='/basic/employment/individual'
              >
                Individual
              </Dropdown.Item>
              <Dropdown.Item
                as={Link}
                to='/basic/employment/grouped'
              >
                Group
              </Dropdown.Item>
            </Dropdown.Menu>
          </Dropdown.Item>

        </Dropdown.Menu>
      </Dropdown>

      <Menu.Item>
        <Input icon='search' placeholder='Search Jobs...' />
      </Menu.Item>

      <Menu.Menu position='right'>
        {isAuthenticated ? (
          <Menu.Item
            as={Link}
            to='/auth/logout'
            name='logout'
          />
        ) : (
          <Menu.Item
            as={Link}
            to='/auth/login'
            name='login'
          />
        )}
      </Menu.Menu>

    </BasicMenu>
  )
}

const mapStateToProps = (state, props) => {
  return {
    isAuthenticated: state.auth.isAuthenticated(),
  }
}

export default connect(mapStateToProps)(BasicAppBar)
