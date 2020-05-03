import React, {useState} from 'react'
import { connect } from 'react-redux'
import { useHistory } from 'react-router-dom'
import { registerUser } from '../../reducers/auth'
import { isEmpty } from 'lodash'

const defaults = {
  email: '',
  password: '',
  confirmation: '',
}

const RegisterBase = ({dispatch, ...rest}) => {
  const [state, setState] = useState({...defaults})
  const history = useHistory()

  const onSubmit = (e) => {
    e.preventDefault()
    if(hasValidInput()){
      dispatch(registerUser(
        state.email,
        state.password,
        state.confirmation,
        history,
      ))
    }
  }

  const hasValidInput = () => {
    return Object.values(state).every(value => !isEmpty(value))
  }

  const onChange = ({target: {name, value}}) =>{
    setState(state => ({
      ...state,
      [name]: value,
    }))
  }

  return (
    <form onSubmit={onSubmit}>
      <h1>Login</h1>

      <label>Username</label>
      <input
        name='email'
        placeholder='E-mail Address'
        value={state.email}
        onChange={onChange}
      /><br/>

      <label>Password</label>
      <input
        type='password'
        name='password'
        placeholder='Password'
        value={state.password}
        onChange={onChange}
      /><br/>

      <label>Confirmation</label>
      <input
        type='password'
        name='confirmation'
        placeholder='Password Confirmation'
        value={state.confirmation}
        onChange={onChange}
      /><br/>

      <input type='submit'/>
    </form>
  )
}

const Register = connect()(RegisterBase)
export { Register }

