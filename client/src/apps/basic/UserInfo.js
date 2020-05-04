import React, {useEffect} from 'react'
import { connect } from 'react-redux'
import { isEmpty } from 'lodash'
import { loadUser } from '../../reducers/user'

const UserInfo  = ({user, access_token, dispatch, ...rest}) => {

  const loadUserInfo = () => {
    if(isEmpty(user)){
      console.log(`Access Token: ${access_token}`)
      dispatch(loadUser(access_token))
    }
  }
  useEffect(loadUserInfo, [])

  return (
    <div>UserInfo</div>
  )
}

const mapStateToProps = (state, props) => {
  return {
    user: state.user,
    access_token: state.auth.access_token,
  }
}

export default connect(mapStateToProps)(UserInfo)
