import {ActionTypes} from './constants';
import BookService from '../services/Book.service';

module.exports = {
    getBooks : function(){
        return function(dispatch){
            dispatch(fetchBooks());
            return BookService.getBooks((err, data) => {
                if(err){
                    dispatch(fetchBooksFailed());
                } else {
                    dispatch(fetchBooksSuccess(data));
                }
            })
        }
    },
    getAuthors : function(){
        return function(dispatch){
            console.log(fetchAuthors());
            dispatch(fetchAuthors());
            return BookService.getAuthors((err, data) => {
                if(err){
                    dispatch(fetchAuthorsFailed());
                } else {
                    dispatch(fetchAuthorsSuccess(data));
                }
            })
        }
    },
    addBook : function(book){
        return function(dispatch){
            dispatch(addBook());
            return BookService.addBook(localStorage.getItem("jwt"), book, (err, book)=>{
                if(err){
                    dispatch(addBookFailed());
                } else {
                    dispatch(addBookSuccess(book));
                }
            })
        }
    },
    editBook : function(book){
        return function(dispatch){
            dispatch(editBook());
            return BookService.editBook(localStorage.getItem("jwt"), book, (err, book)=>{
                if(err){
                    dispatch(editBookFailed());
                } else {
                    dispatch(editBookSuccess(book));
                }
            })
        }
    },
    deleteBook : function(bookid){
        return function(dispatch){
            dispatch(deleteBook());
            return BookService.deleteBook(localStorage.getItem("jwt"), bookid, (err, book)=>{
                if(err){
                    dispatch(deleteBookFailed());
                } else {
                    dispatch(deleteBookSuccess(book));
                }
            })
        }
    }
}

function fetchBooks() {
    return {
        type : ActionTypes.ON_LOAD_BOOKS
    }
}

function fetchBooksSuccess(books) {
    return {
        type : ActionTypes.ON_LOAD_BOOKS_SUCCESS,
        payload : books
    }
}

function fetchBooksFailed() {
    return {
        type : ActionTypes.ON_LOAD_BOOKS_FAILED
    }
}

function fetchAuthors() {
    return {
        type : ActionTypes.ON_LOAD_AUTHORS
    }
}

function fetchAuthorsSuccess(authors) {
    return {
        type : ActionTypes.ON_LOAD_AUTHORS_SUCCESS,
        payload : authors
    }
}

function fetchAuthorsFailed() {
    return {
        type : ActionTypes.ON_LOAD_AUTHORS_FAILED
    }
}

function addBook(){
    return {
        type : ActionTypes.ON_ADD_BOOK
    }
}

function addBookSuccess(book){
    return {
        type : ActionTypes.ON_ADD_BOOK_SUCCESS,
        payload : book
    }
}

function addBookFailed() {
    return {
        type : ActionTypes.ON_ADD_BOOK_FAILED
    }
}

function editBook(){
    return {
        type : ActionTypes.ON_EDIT_BOOK
    }
}

function editBookSuccess(book){
    return {
        type : ActionTypes.ON_EDIT_BOOK_SUCCESS,
        payload : book
    }
}

function editBookFailed() {
    return {
        type : ActionTypes.ON_EDIT_BOOK_FAILED
    }
}

function deleteBook(){
    return {
        type : ActionTypes.ON_DELETE_BOOK
    }
}

function deleteBookSuccess(book){
    return {
        type : ActionTypes.ON_DELETE_BOOK_SUCCESS,
        payload : book
    }
}

function deleteBookFailed() {
    return {
        type : ActionTypes.ON_DELETE_BOOK_FAILED
    }
}