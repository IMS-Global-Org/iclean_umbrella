import React from 'react';
import ReactDOM from 'react-dom';
import { BrowserRouter, Switch, Route } from 'react-router-dom'
import { Provider } from 'react-redux'
import store from './store'
import axios from 'axios'
import * as serviceWorker from './serviceWorker';

import Authorization from './Authorization'
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
      config.headers.Authorization = localStorage.access_token
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
          <Route path='/auth' component={Auth} />
          <Route path='/admin' component={Admin} />
          <Route path='/basic' component={Basic} />
          <Route path='/guest' component={Guest} />
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
