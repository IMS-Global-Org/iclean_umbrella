import React from 'react';
import ReactDOM from 'react-dom';
import { BrowserRouter, Switch, Route } from 'react-router-dom'
import { Provider } from 'react-redux'
import store from './store.js'
import * as serviceWorker from './serviceWorker';

import NoRoute from './NoRoute'
import Admin from './apps/Admin'
import Basic from './apps/Basic'
import Guest from './apps/Guest'

ReactDOM.render(
  <React.StrictMode>
    <Provider store={store}>
      <BrowserRouter>
        <Switch>
          <Route path='/' component={Guest} />
          <Route path='/admin' component={Admin} />
          <Route path='/basic' component={Basic} />
          <Route path='/guest' component={Guest} />
          <Route component={NoRoute} />
        </Switch>
      </BrowserRouter>
    </Provider>
  </React.StrictMode>,
  document.getElementById('root')
);

// If you want your app to work offline and load faster, you can change
// unregister() to register() below. Note this comes with some pitfalls.
// Learn more about service workers: https://bit.ly/CRA-PWA
serviceWorker.unregister();
