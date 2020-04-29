import { createStore, compose, applyMiddleware } from 'redux';
import thunk from 'redux-thunk';
//import apiMiddleware from 'redux-devise-axios';
import axiosMiddleware from 'redux-axios-middleware'
import rootReducer from './reducers/index';
import axios from 'axios';

/*
 *const options = {
 *  axios
 *}
 */
const client = axios.create({ //all axios can be used
  baseURL:'http://localhost:4000/api',
  responseType: 'json'
});

const enhancers = compose(
  //applyMiddleware(thunk, apiMiddleware(options)),
  // window.devToolsExtension ? window.devToolsExtension() : f => f
  applyMiddleware(thunk, axiosMiddleware(client)),
  window.devToolsExtension ? window.__REDUX_DEVTOOLS_EXTENSION__() : f => f
)

const store = createStore(rootReducer, {}, enhancers)

if(module.hot) {
  module.hot.accept('./reducers/', () => {
    const nextRootReducer = require('./reducers/index').default
    store.replaceReducer(nextRootReducer)
  })
}

export default store
