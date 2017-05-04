import {combineReducers} from 'redux';
import user from './user';
import {routerReducer} from 'react-router-redux';
import book from './book';

export default combineReducers({
    user,
    book,
    routing : routerReducer
});