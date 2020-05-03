import React from 'react'
import { connect } from 'react-redux'
import { useHistory } from 'react-router-dom'
import { logoutUser } from '../../reducers/auth'


// Namespace
const Logout = {}

const Button = ({dispatch, ...rest}) => {
  const history = useHistory()

  return (
    <button 
      onClick={() => dispatch(logoutUser(history))}
    >
      Logout
    </button>
  )
}

Logout.Button = connect()(Button)

export { Logout }
