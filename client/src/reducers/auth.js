import createReducer from './createReducer'
import axios from 'axios'

const setLocalStorage = ({access_token, renewal_token, role}) => {
  localStorage.setItem('access_token', access_token)
  localStorage.setItem('renewal_token', renewal_token)
  localStorage.setItem('role', role)
}

const clearLocalStorage = (cb = f => f) => {
  localStorage.removeItem('access_token')
  localStorage.removeItem('renewal_token')
  localStorage.removeItem('role')
  cb()
}


const defaultRoles = ['guest', 'basic', 'admin', 'uber', 'super']

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
        setLocalStorage(res.data)
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
        setLocalStorage(res.data)
        dispatch({ type: LOGIN_USER, auth: res.data });
        history.push('/basic');
      })
      .catch( err => {
        console.log(err.response.data)
      })
  }
}

export const logoutUser = (history = '') => {
  return (dispatch, getState) => {
    const path = `/api/session`

    axios.delete(path)
      .then( res => {
        clearLocalStorage()
        dispatch({ type: LOGOUT_USER });
        history && history.push('/auth/login')
      })
  }
}

export const validateUser = (history, cb = f => f) => {
  return (dispatch, getState) => {
    const path = `/api/session/renew`
    const renewal_token = localStorage.renewal_token
    if(renewal_token){
      clearLocalStorage(() => {
        axios({
          url: path,
          method: 'POST',
          headers: {
            'Authorization': renewal_token,
          },
        })
          .then( res => {
            setLocalStorage(res.data)
            cb()
            dispatch({ type: VALIDATE_USER, auth: res.data }) 
          })
          .catch(err => {
            cb()
            history.push('/auth/login');
          })
      })
    } else {
      cb()
    }
  }
}

export const tokens = () => {
  return {
    access_token: localStorage.access_token,
    renewal_token: localStorage.renewal_token,
  }
}

export const hasRenewalToken = () => {
  return localStorage.renewal_token !== ''
}

export const isAuthenticated = () => {
  return (localStorage.access_token && localStorage.renewal_token) ? true : false
}

export const hasRoleRights = (permission) => {
  const role = localStorage.role
  if(role){
    const required_level = defaultRoles.findIndex(r => r === permission)
    const user_level = defaultRoles.findIndex(r => r === role)
    return user_level >= required_level
  }
  return false
}

// Reducers
const loadAuthData = (state, action) => {
  return {...state, ...action.auth}
}

// Default attributes
const defaults = {
  role: '',
}


// Actual Reducer
export const auth = createReducer({...defaults}, {
  [LOGIN_USER]: loadAuthData,
  [LOGOUT_USER]: loadAuthData,
  [VALIDATE_USER]: loadAuthData,
  [REGISTER_USER]: loadAuthData,
})
