import {createStore, applyMiddleware} from 'redux';
import {createLogger} from 'redux-logger';
import {browserHistory} from 'react-router';
import {routerMiddleware} from 'react-router-redux';
import rootReducer from './reducers/index';

const logger = createLogger();
const router = routerMiddleware(browserHistory);

const createStoreMiddleware = applyMiddleware(router, logger)(createStore);

export function configureStore(initialState) {
    return createStoreMiddleware(rootReducer, initialState);
}