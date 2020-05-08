import {useState, useEffect} from 'react'
import { connect } from 'react-redux'
import { useHistory } from 'react-router-dom'
import { validateUser } from './reducers/auth'

/**
 * Checks to make sure the User status has been validated
 * when protected routes are visited.
 */
const Authorization = ({hasRenewalToken, children, dispatch, ...rest}) => {
  // Keeps the user status from being checked with every route change
  const [loaded, setLoaded] = useState(false)
  const history = useHistory()

  const validateOnLoad = () => {
    if(hasRenewalToken){
      dispatch(validateUser(history, () => setLoaded(true)))
    } 
  }
  useEffect(validateOnLoad, [])

  const validateOnChange = () => {
    if (!loaded)
      setLoaded(true)
  }
  useEffect(validateOnChange, [hasRenewalToken])

  return loaded ? children : ''
}

const mapStateToProps = (state, props) => {
  return { 
    hasRenewalToken: state.auth.hasRenewalToken(),
  }
}

export default connect(mapStateToProps)(Authorization)
