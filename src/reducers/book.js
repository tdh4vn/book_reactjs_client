import {ActionTypes} from '../actions/constants';
import {createReducer} from '../utils';

const initialState = {
    books : [],
    authors : []
};

export default createReducer(initialState, {
    [ActionTypes.ON_LOAD_BOOKS_SUCCESS] : (state, payload) => {
        return Object.assign({}, state, {
            books : payload  
        })
    },
    [ActionTypes.ON_LOAD_AUTHORS_SUCCESS] : (state, payload) => {
        return Object.assign({}, state, {
            authors : payload
        })
    },
    [ActionTypes.ON_ADD_BOOK_SUCCESS] : (state, payload) => {
        let newBooks = state.books.slice(0);
        newBooks.push({
            name : payload.name,
            id : payload.id,
            price : payload.price,
            author : payload.authors
        });
        console.log(newBooks);
        return Object.assign({}, state, {
            books : newBooks
        })
    },
    [ActionTypes.ON_EDIT_BOOK_SUCCESS] : (state, payload) => {
        let newBooks = state.books.slice(0);
        newBooks = newBooks.map(function(element) {
            return element.id == payload.id ? {id : payload.id, name : payload.name, author : payload.authors, price : payload.price} : element;
        })
        return Object.assign({}, state, {
            books : newBooks
        })
    },
    [ActionTypes.ON_DELETE_BOOK_SUCCESS] : (state, payload) => {
        let newBooks = [];
        state.books.forEach(function(element){
            if(element.id != payload.id){
                newBooks.push(element);
            }
        })
        return Object.assign({}, state, {
            books : newBooks
        })
    }
});