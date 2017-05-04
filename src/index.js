import React from 'react';
import ReactDOM from 'react-dom';
import App from './App';
import './index.css';
import {Provider} from 'react-redux';
import {configureStore} from './store';
import createRoutes from './routes';
import {Router, browserHistory} from 'react-router';
import {syncHistoryWithStore} from 'react-router-redux';

const store = configureStore();
const history = syncHistoryWithStore(browserHistory, store);
const routes = createRoutes();

ReactDOM.render(
  <Provider store={store}>
    <Router history={history} routes={routes}/>
  </Provider>,
  document.getElementById('app-container')
);