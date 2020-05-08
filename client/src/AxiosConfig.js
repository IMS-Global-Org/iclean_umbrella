import axios from 'axios'
import store from './store'
import { logoutUser } from './reducers/auth'

export const createInterceptors = () => {
  /**
   * Set axios Intercepters for both requests and responses
   */
  axios.interceptors.request.use(
    config => {
      if(localStorage.access_token){
        // Don't override the defaults or any that are set in the reducer actions
        if(!config.headers.Authorization){
          config.headers.Authorization = localStorage.access_token
        }
      }
      return config
    },
    error => {
      const response = error.response
      if(response.status === 422){
        return false
      } else if(response.status === 401){
        const { dispatch } = store
        dispatch(logoutUser())
      }
      return Promise.reject(error)
    }
  )

  axios.interceptors.response.use(
    response => response,
    error => {
      const response = error.response
      if(response.status === 422){
        return false
      } else if(response.status === 401){
        const { dispatch } = store
        dispatch(logoutUser())
      }
      return Promise.reject(error)
    }
  )
}
