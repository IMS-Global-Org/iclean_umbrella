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
        localStorage.setItem('renewal_token', res.data.renewal_token)
        localStorage.setItem('access_token', res.data.access_token)
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
        localStorage.setItem('renewal_token', res.data.renewal_token)
        localStorage.setItem('access_token', res.data.access_token)
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
    const { access_token } = getState().auth.tokens()

    axios({
      url: path,
      method: 'DELETE',
      headers: { 'Authorization': access_token }
    })
      .then( res => {
        dispatch({ type: LOGOUT_USER });
        localStorage.removeItem('renewal_token')
        localStorage.removeItem('access_token')
        history.push('/auth/login');
      })
      .catch( err => {
        console.log(err.response.data)
      });
  }
}

export const validateUser = (history, cb = f => f) => {
  return (dispatch, getState) => {
    const path = `/api/session/renew`
    const { renewal_token } = getState().auth.tokens()

    if(renewal_token){
      axios({
        url: path,
        method: 'POST',
        headers: {
          'Authorization': renewal_token,
        },
      })
        .then( res => {
          dispatch({ type: VALIDATE_USER, auth: res.data }) 
          localStorage.setItem('renewal_token', res.data.renewal_token)
          localStorage.setItem('access_token', res.data.access_token)
        })
        .catch(err => {
          cb()
          history.push('/auth/login');
        })
    } else {
      cb()
      history.push('/auth/login');
    }
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
  roles: [],
  tokens: function(){
    return {
      access_token: localStorage.access_token,
      renewal_token: localStorage.renewal_token,
    }
  },
  isAuthenticated: function(){
    const { access_token, renewal_token } = this.tokens()
    return access_token && renewal_token
  },
  hasRoleRights: function(routeRoles){
    return routeRoles.every(role => this.roles.includes(role))
  }
}


// Actual Reducer
export const auth = createReducer({...defaults}, {
  [REGISTER_USER]: registerUserReducer,
  [LOGIN_USER]: loginUserReducer,
  [LOGOUT_USER]: logoutUserReducer,
  [VALIDATE_USER]: validateUserReducer,
})
