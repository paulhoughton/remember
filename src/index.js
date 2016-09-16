import React from 'react';
import { render } from 'react-dom';
import { createStore, compose, applyMiddleware } from 'redux';
import { Provider } from 'react-redux';
import reducer from './reducers';
import App from './containers/App';
import persistState from './middleware/persistState';
import './style.css';

if (process.env.NODE_ENV === 'production' && navigator.serviceWorker) {
  navigator.serviceWorker.register('./sw.js')
  .then(() => console.log('Service worker registered'))
  .catch(err => console.log(`Service worker registration failed! ${err}`));
}

const createPersistentStore = compose(
  applyMiddleware(persistState('rememberV2', 'main', 'locations'))
)(createStore);

render(
  <Provider store={ createPersistentStore(reducer) }>
    <App/>
  </Provider>,
  document.getElementById('react-root')
);
