import React, { useState, useEffect } from 'react'
import { connect } from 'react-redux'
import { loadEmployee } from '../../../reducers/employee'
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
    dispatch(loadEmployee())
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
          required={true}
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
          required={true}
          label='Last Name'
          name='lastName1'
          value={state.lastName1}
          onChange={onChange}
        />
      </Form.Group>
      <Form.Group>
        <Form.Input
          width={4}
          required={true}
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
