import createReducer from './createReducer'

const LOAD_TOKEN = 'LOAD_TOKEN'

const loadToken = (state, action) => {
  return state
}

const defaults = {}

export const auth = createReducer({...defaults}, {
  [LOAD_TOKEN]: loadToken,
})
