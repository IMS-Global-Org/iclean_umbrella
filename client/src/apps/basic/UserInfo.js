import React, {useEffect} from 'react'
import { connect } from 'react-redux'
import { isEmpty } from 'lodash'
import { loadEmployee } from '../../reducers/employee'

const UserInfo  = ({user, access_token, dispatch, ...rest}) => {

  const loadUserInfo = () => {
    if(isEmpty(user)){
      console.log(`Access Token: ${access_token}`)
      dispatch(loadEmployee(access_token))
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
