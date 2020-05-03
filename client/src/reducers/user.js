import createReducer from './createReducer'

const LOAD_USER = 'LOAD_USER'

const loadUser = (state, action) => {
  return state
}

const defaults = {
  id: 21,
}

export const user = createReducer({...defaults}, {
  [LOAD_USER]: loadUser,
})

