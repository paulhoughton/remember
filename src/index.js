import React from 'react';
import { render } from 'react-dom';
import { createStore, compose, applyMiddleware } from 'redux';
import { Provider } from 'react-redux';
import { Router, Route, IndexRoute, hashHistory } from 'react-router';
import reducer from './reducers';
import Main from './containers/Main';
import About from './components/About';
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

function hideDrawer() {
  document.querySelector('.mdl-layout__obfuscator').classList.remove('is-visible');
  document.querySelector('.mdl-layout__drawer').classList.remove('is-visible');
}

render(
  <Provider store={ createPersistentStore(reducer) }>
    <Router history={ hashHistory } onUpdate={ hideDrawer }>
      <Route path="/" component={ App }>
        <IndexRoute component={ Main }/>
        <Route path="about" component={ About }/>
        <Route path="demo" component={ Main } demo={ true }/>
      </Route>
    </Router>
  </Provider>,
  document.getElementById('react-root')
);
