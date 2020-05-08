import React, { useState, useEffect } from 'react'
import { connect } from 'react-redux'
import { 
  loadCurrentEmployee,
  createCurrentEmployee,
  updateCurrentEmployee,
  deleteCurrentEmployee,
} from '../../../reducers/employee'
import { Form, Button } from 'semantic-ui-react'
import { isEmpty } from 'lodash'

const defaults = {
  id: '',
  first_name: '',
  middle_name: '',
  last_name1: '',
  last_name2: '',
  date_of_birth: '',
}

const Account = ({employee, dispatch, ...rest}) => {
  const [state, setState] = useState({...defaults})

  const loadBasicAccount = () => {
    dispatch(loadCurrentEmployee())
  }
  useEffect(loadBasicAccount, [])

  const updateBasicAccount = () => {
    if(!isEmpty(employee)){
      Object.entries(employee).forEach(([key, val]) => {
        if(!val){
          delete employee[key]
        }
      })
      setState(state => ({
        ...state,
        ...employee,
      }))
    } else {
      setState({...defaults})
    }
  }
  useEffect(updateBasicAccount, [employee])

  const onChange = ({target: {name, value}}) =>
    setState(state => ({...state, [name]: value}))

  const onClear = () => setState({...defaults})

  const onSubmit = (e) => {
    e.preventDefault()
    if(state.id){
      dispatch(updateCurrentEmployee(state))
    } else {
      dispatch(createCurrentEmployee(state))
    }
  }

  const onDelete = () => {
    if(state.id){
      // TODO show verification popup
      dispatch(deleteCurrentEmployee(state))
    }
  }

  return (
    <Form onSubmit={onSubmit}>
      <Form.Group>
        <Form.Input 
          width={6}
          required={true}
          label='First Name'
          name='first_name'
          value={state.first_name}
          onChange={onChange}
        />
        <Form.Input 
          width={4}
          label='Middle Name'
          name='middle_name'
          value={state.middle_name}
          onChange={onChange}
        />
        <Form.Input
          width={6}
          required={true}
          label='Last Name'
          name='last_name1'
          value={state.last_name1}
          onChange={onChange}
        />
      </Form.Group>
      <Form.Group>
        <Form.Input
          width={4}
          required={true}
          type='date'
          label='Date of Birth'
          name='date_of_birth'
          value={state.date_of_birth}
          onChange={onChange}
        />
      </Form.Group>
      <Button.Group floated='right'>
        <Button type='button' onClick={onClear}>Clear</Button>
        <Button type='submit'>Submit</Button>
        <Button type='button' negative onClick={onDelete}>Delete</Button>
      </Button.Group>
    </Form>
  )
}

const mapStateToProps = (state, props) => {
  return {
    employee: state.employee,
  }
}

export default connect(mapStateToProps)(Account)
