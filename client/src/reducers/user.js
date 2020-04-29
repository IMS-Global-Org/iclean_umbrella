import createReducer from './createReducer'

const LOAD_USER = 'LOAD_USER'

const loadUser = (state, action) => {
  return state
}

const defaults = {}

export const user = createReducer({...defaults}, {
  [LOAD_USER]: loadUser,
})

