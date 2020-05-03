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
        localStorage.setItem('token', res.data.renewal_token)
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
        history.push('/');
      })
      .catch( err => {
        console.log(err.response.data)
      })
  }
}

export const logoutUser = (history) => {
  return dispatch => {
    const path = `/api/session`
    axios.delete(path)
      .then( res => {
        dispatch({ type: LOGOUT_USER });
        history.push('/login');
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
      axios.post(path, {...getState().auth})
        .then( res => {
          dispatch({ type: VALIDATE_USER, auth: res.data }) 
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
  api_access_token: '',
  renewal_token: '',
  isAuthenticated: function(){
    return this.api_access_token && this.renewal_token
  },
}

// Actual Reducer
export const auth = createReducer({...defaults}, {
  [REGISTER_USER]: registerUserReducer,
  [LOGIN_USER]: loginUserReducer,
  [LOGOUT_USER]: logoutUserReducer,
  [VALIDATE_USER]: validateUserReducer,
})
