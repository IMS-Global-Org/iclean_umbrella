import createReducer from './createReducer'
import axios from 'axios'

// Constants
const LOAD_CURRENT_EMPLOYEE = 'LOAD_CURRENT_EMPLOYEE'
const CREATE_CURRENT_EMPLOYEE = 'CREATE_CURRENT_EMPLOYEE'
const UPDATE_CURRENT_EMPLOYEE = 'UPDATE_CURRENT_EMPLOYEE'
const DELETE_CURRENT_EMPLOYEE = 'DELETE_CURRENT_EMPLOYEE'

// Actions
export const loadCurrentEmployee = () => {
  return (dispatch, getState) => {
    axios.get(`/api/employee/active`)
      .then(res => {
        dispatch({ type: LOAD_CURRENT_EMPLOYEE, employee: res.data })
      })
  }
}

export const createCurrentEmployee = (employee) => {
  return (dispatch, getState) => {
    axios.post(`/api/employees`,{ employee })
      .then(res => {
        dispatch({ type: CREATE_CURRENT_EMPLOYEE, employee: res.data })
      })
  }
}

export const updateCurrentEmployee = (employee) => {
  return (dispatch, getState) => {
    axios.patch(`/api/employees/${employee.id}`,{ employee })
      .then(res => {
        dispatch({ type: UPDATE_CURRENT_EMPLOYEE, employee: res.data })
      })
  }
}

export const deleteCurrentEmployee = (employee) => {
  return dispatch => {
    axios.delete(`/api/employees/${employee.id}`)
      .then(res => {
        dispatch({ type: DELETE_CURRENT_EMPLOYEE })
      })
  }
}

// Reducers
const loadCurrentEmployeeReducer = (state, action) => {
  return {...state, ...action.employee}
}

const createCurrentEmployeeReducer = (state, action) => {
  return {...state, ...action.employee}
}

const updateCurrentEmployeeReducer = (state, action) => {
  return {...state, ...action.employee}
}

const deleteCurrentEmployeeReducer = (state, action) => {
  return {...defaults}
}

// Defaults
const defaults = {}

// Reducer
export const employee = createReducer({...defaults}, {
  [LOAD_CURRENT_EMPLOYEE]: loadCurrentEmployeeReducer,
  [CREATE_CURRENT_EMPLOYEE]: createCurrentEmployeeReducer,
  [UPDATE_CURRENT_EMPLOYEE]: updateCurrentEmployeeReducer,
  [DELETE_CURRENT_EMPLOYEE]: deleteCurrentEmployeeReducer,
})

