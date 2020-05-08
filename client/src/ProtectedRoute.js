import React from 'react';
import { Route, Redirect } from 'react-router-dom';
import { connect } from 'react-redux';

const ProtectedRoute = ({
  isAuthenticated,
  hasRoleRights, 
  component: Component, 
  ...rest
}) => (
  <Route {...rest} render={props => (
    isAuthenticated && hasRoleRights ? (
      <Component {...props}/>
     ) : (
       <Redirect to={{
         pathname: '/auth/login',
         state: { from: props.location }
       }}/>
     )
  )}/>
)

const mapStateToProps = (state, props) => {
  return { 
    isAuthenticated: state.auth.isAuthenticated(),
    hasRoleRights: state.auth.hasRoleRights(props.roles),
  }
}

export default connect(mapStateToProps)(ProtectedRoute);
