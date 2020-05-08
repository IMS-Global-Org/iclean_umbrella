import React from 'react';
import { Route, Redirect } from 'react-router-dom';
import { isAuthenticated, hasRoleRights } from './reducers/auth'

const ProtectedRoute = ({component: Component, ...rest}) => {
  return (
    <Route {...rest} render={props => (
      (isAuthenticated() && hasRoleRights()) ? (
        <Component {...props}/>
       ) : (
         <Redirect to={{
           pathname: '/auth/login',
           state: { from: props.location }
         }}/>
       )
    )}/>
  )
}

export default ProtectedRoute;
