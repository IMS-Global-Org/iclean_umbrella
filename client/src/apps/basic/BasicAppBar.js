import React from 'react'
import { Link } from 'react-router-dom'
import { Menu, Dropdown, Icon, Input } from 'semantic-ui-react'

const BasicAppBar = ({...rest}) => {

  return (
    <Menu secondary>
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
        <Menu.Item
          as={Link}
          to='/auth/login'
          name='login'
        />
      </Menu.Menu>

    </Menu>
  )
}

export default BasicAppBar
