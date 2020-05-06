import createReducer from './createReducer'
import axios from 'axios'

// Constants
const LOAD_USER = 'LOAD_USER'

// Actions
export const loadUser = (access_token) => {
  return (dispatch, getState) => {
    const { access_token } = getState().auth
    axios({
      url: `/api/users/1`,
      method: 'GET',
      headers: { 'Authorization': access_token },
    })
      .then(res => {
        dispatch({ type: LOAD_USER, user: res.data })
      })
      .catch(err => {
        console.log(err.response.data)
      })
  }
}

// Reducers
const loadUserReducer = (state, action) => {
  return {...state, ...action.user}
}

// Defaults
const defaults = {}

// Reducer
export const user = createReducer({...defaults}, {
  [LOAD_USER]: loadUserReducer,
})

