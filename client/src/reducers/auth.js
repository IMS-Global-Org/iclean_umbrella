import createReducer from './createReducer'
import axios from 'axios'

// Constants
const REGISTER_USER = 'REGISTER_USER'
const LOGIN_USER = 'LOGIN_USER'
const LOGOUT_USER = 'LOGOUT_USER'
const VALIDATE_USER = 'VALIDATE_USER'

// Actions
export const registerUser = (email, password, password_confirmation, history) => {
  return dispatch => {
    const path = `/api/registration`
    const user = {
      email, 
      password, 
      password_confirmation,
    }
    axios.post(path, { user })
      .then( res => {
        dispatch({ type: REGISTER_USER, auth: res.data });
        history.push('/');
      })
      .catch( err => {
        console.log(err.response.data)
      });
  }
}

export const loginUser = (email, password, history) => {
  return dispatch => {
    const path = `/api/session`
    const user = { email, password }
    axios.post(path, { user })
      .then( res => {
        dispatch({ type: LOGIN_USER, auth: res.data });
        localStorage.setItem('token', res.data.renewal_token)
        history.push('/basic');
      })
      .catch( err => {
        console.log(err.response.data)
      })
  }
}

export const logoutUser = (history) => {
  return (dispatch, getState) => {
    const path = `/api/session`
    const { access_token } = getState().auth

    axios({
      url: path,
      method: 'DELETE',
      headers: { 'Authorization': access_token }
    })
      .then( res => {
        dispatch({ type: LOGOUT_USER });
        localStorage.removeItem('token')
        history.push('/auth/login');
      })
      .catch( err => {
        console.log(err.response.data)
      });
  }
}

export const validateUser = (cb = f => f) => {
  return (dispatch, getState) => {
    const path = `/api/session/renew`
    const token = localStorage.token

    if(token){
      axios({
        url: path,
        method: 'POST',
        headers: {
          'Authorization': token,
        },
      })
        .then( res => {
          dispatch({ type: VALIDATE_USER, auth: res.data }) 
          localStorage.setItem('token', res.data.renewal_token)
        })
        .catch(cb)
    }
    cb()
  }
}

// Reducers
const registerUserReducer = (state, action) => {
  return {...state, ...action.auth}
}

const loginUserReducer = (state, action) => {
  return {...state, ...action.auth}
}

const logoutUserReducer = (state, action) => {
  return {...defaults}
}

const validateUserReducer = (state, action) => {
  return {...state, ...action.auth}
}

// Default attributes
const defaults = {
  access_token: '',
  renewal_token: '',
}

// Actual Reducer
export const auth = createReducer({...defaults}, {
  [REGISTER_USER]: registerUserReducer,
  [LOGIN_USER]: loginUserReducer,
  [LOGOUT_USER]: logoutUserReducer,
  [VALIDATE_USER]: validateUserReducer,
})
