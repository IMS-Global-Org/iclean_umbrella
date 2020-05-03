import { combineReducers } from 'redux'

// Composed Reducers
import { auth } from './auth'
import { user } from './user'

const rootReducer = combineReducers({
  auth,
  user,
})

export default rootReducer
