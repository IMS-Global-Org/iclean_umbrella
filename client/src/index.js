import React from 'react';
import ReactDOM from 'react-dom';
import { BrowserRouter, Switch, Route } from 'react-router-dom'
import { Provider } from 'react-redux'
import store from './store'
import axios from 'axios'
import * as serviceWorker from './serviceWorker';

import Authorization from './Authorization'
import ProtectedRoute from './ProtectedRoute'
import NoRoute from './NoRoute'
import Auth from './apps/Auth'
import Admin from './apps/Admin'
import Basic from './apps/Basic'
import Guest from './apps/Guest'

import 'semantic-ui-css/semantic.min.css'

/**
 * Set axios Intercepters for both requests and responses
 */
axios.interceptors.request.use(
  config => {
    if(localStorage.access_token){
      // Don't override the defaults or any that are set in the reducer actions
      if(config.headers.Authorization !== localStorage.renewal_token){
        config.headers.Authorization = localStorage.access_token
      }
    }
    return config
  },
  error => {
    // TODO display as a flash message
    const response = error.response
    if(response.status === 422){
      return false
    }
    return Promise.reject(error)
  }
)

axios.interceptors.response.use(
  response => response,
  error => {
    // TODO display as a flash message
    const response = error.response
    if(response.status === 422){
      return false
    }
    return Promise.reject(error)
  }
)

ReactDOM.render(
  <Provider store={store}>
    <BrowserRouter>
      <Authorization>
        <Switch>
          <Route exact path='/' component={Guest} />
          <Route path='/guest' component={Guest} />
          <Route path='/auth' component={Auth} />
          <ProtectedRoute role={'basic'} path='/basic' component={Basic} />
          <ProtectedRoute role={'admin'} path='/admin' component={Admin} />
          <Route component={NoRoute} />
        </Switch>
      </Authorization>
    </BrowserRouter>
  </Provider>,
  document.getElementById('root')
);

// If you want your app to work offline and load faster, you can change
// unregister() to register() below. Note this comes with some pitfalls.
// Learn more about service workers: https://bit.ly/CRA-PWA
serviceWorker.unregister();
