import {useState, useEffect} from 'react'
import { connect } from 'react-redux'
import { validateUser } from './reducers/auth'

/**
 * Checks to make sure the User status has been validated
 * when protected routes are visited.
 */
const Authorization = ({isAuthenticated, children, dispatch, ...rest}) => {
  // Keeps the user status from being checked with every route change
  const [loaded, setLoaded] = useState(false)

  const validateOnLoad = () => {
    console.log(`Validating Client Token: ${isAuthenticated ? 'false' : 'true'}`)
    if(isAuthenticated){
      setLoaded(true)
    } else {
      dispatch(validateUser(() => setLoaded(true)))
    }
  }
  useEffect(validateOnLoad, [])

  const validateOnChange = () => {
    if (!loaded && isAuthenticated)
      setLoaded(true)
  }
  useEffect(validateOnChange, [isAuthenticated])

  return loaded ? children : ''
}

const mapStateToProps = (state, props) => {
  return { 
    isAuthenticated: state.auth.access_token && state.auth.renewal_token
  }
}

export default connect(mapStateToProps)(Authorization)
