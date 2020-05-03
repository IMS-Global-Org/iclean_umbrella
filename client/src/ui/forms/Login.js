import React, {useState} from 'react'
import { connect } from 'react-redux'
import { useHistory } from 'react-router-dom'
import { loginUser } from '../../reducers/auth'


const defaults = {
  email: '',
  password: '',
}

const LoginBase = ({isAuthenticated, dispatch, ...rest}) => {
  const [state, setState] = useState({...defaults})
  const history = useHistory()

  const onSubmit = e => {
    e.preventDefault()
    if(hasValidInput()){
      dispatch(loginUser(
        state.email,
        state.password,
        history,
      ))
    } else {
      // TODO display flash message
    }
  }

  const onChange = ({target: {name, value}}) => {
    setState(state => ({
      ...state,
      [name]: value,
    }))
  }

  const hasValidInput = () => {
    const {email, password} = state
    if(email && password){
      return true
    }
    return false
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

      <input type='submit'/>
    </form>
  )
}

const mapStateToProps = (state, props) => {
  return {
    isAuthenticated: state.auth.isAuthenticated,
  }
}

const Login = connect(mapStateToProps)(LoginBase)
export { Login } 
