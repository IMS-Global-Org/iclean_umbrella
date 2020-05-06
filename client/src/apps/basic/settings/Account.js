import React, { useState, useEffect } from 'react'
import { connect } from 'react-redux'
import { loadUser } from '../../../reducers/user'
import { Form } from 'semantic-ui-react'

const defaults = {
  firstName: '',
  middleName: '',
  lastName1: '',
  lastName2: '',
  dateOfBirth: '',
}

const Account = ({user, dispatch, ...rest}) => {
  const [state, setState] = useState({...defaults})

  const loadBasicAccount = () => {
    dispatch(loadUser())
  }
  useEffect(loadBasicAccount, [])

  const updateBasicAccount = () => {
    if(user){
      setState(state => ({
        ...state,
        ...user
      }))
    }
  }
  useEffect(updateBasicAccount, [user])

  const onChange = ({target: {name, value}}) =>
    setState(state => ({...state, [name]: value}))

  return (
    <Form>
      <Form.Group>
        <Form.Input 
          width={6}
          label='First Name'
          name='firstName'
          value={state.firstName}
          onChange={onChange}
        />
        <Form.Input 
          width={4}
          label='Middle Name'
          name='middleName'
          value={state.middleName}
          onChange={onChange}
        />
        <Form.Input
          width={6}
          label='Last Name'
          name='lastName'
          value={state.lastName}
          onChange={onChange}
        />
      </Form.Group>
      <Form.Group>
        <Form.Input
          width={4}
          type='date'
          label='Date of Birth'
          name='dateOfBirth'
          value={state.dateOfBirth}
          onChange={onChange}
        />
      </Form.Group>
    </Form>
  )
}

const mapStateToProps = (state, props) => {
  return {
    user: state.user,
  }
}

export default connect(mapStateToProps)(Account)
