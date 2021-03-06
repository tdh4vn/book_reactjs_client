var request = require('request');
const APIConfig = require('../configs/APIConfig')

module.exports = {
    getBooks : function(callback){
        let GET_BOOK_URI = APIConfig.API_URL + "book";
        request.get(GET_BOOK_URI, (err, res, body)=>{
            console.log(res);
            if(err || res.statusCode != 200){
                callback(new Error());
            } else {
                let booksRespons = JSON.parse(body);
                let data = [];
                booksRespons.forEach(function(element) {
                    data.push({
                        id : element.id,
                        name : element.name,
                        price : element.price,
                        author : element.authors
                    })
                });
                callback(null, data);
            }
        })
    },
    getAuthors : function(callback){
        let GET_AUTHOR_URI = APIConfig.API_URL + "author";
        request.get(GET_AUTHOR_URI, (err, res, body)=>{
            console.log(body);
            if(err || res.statusCode != 200){
                callback(new Error());
            } else {
                let authors = JSON.parse(body);
                let data = [];
                authors.forEach(function(element){
                    data.push({
                        name : element.name,
                        id : element.id
                    })
                });
                console.log(data);
                callback(null, data)
            }
        })
    },
    addBook : function(token, book, callback){
        let REGISTER_URI = APIConfig.API_URL + "book";
        console.log(token);
        request.post({
            url : REGISTER_URI,
            form : {
                token : token,
                name : book.name,
                price : book.price,
                authors : book.authors.id
            }
        }, 
        (err, res, body)=>{
            console.log(res);
            if(err || res.statusCode != 201){
                callback(new Error());
            } else {
                let jsonBody = JSON.parse(body);
                callback(null, {
                    name : jsonBody.name,
                    id : jsonBody.id,
                    price : jsonBody.price,
                    authors : jsonBody.authors
                })
            }
        })
    },
    editBook : function(token, book, callback){
        let REGISTER_URI = APIConfig.API_URL + "book/" + book.id;
        request.put({
            url : REGISTER_URI,
            form : {
                token : token,
                name : book.name,
                price : book.price,
                authors : book.authors.id
            }
        }, 
        (err, res, body)=>{
            console.log(res);
            if(err || res.statusCode != 200){
                callback(new Error());
            } else {
                let jsonBody = JSON.parse(body);
                callback(null, {
                    name : jsonBody.name,
                    id : jsonBody.id,
                    price : jsonBody.price,
                    authors : jsonBody.authors
                })
            }
        })
    },
    deleteBook : function(token, bookid, callback){
        var options = { 
            method: 'DELETE',
            url: APIConfig.API_URL + 'book/' + bookid,
            qs: { 
                token: token 
            },
            headers: { 
                'content-type': 'application/x-www-form-urlencoded' 
            } 
        };

        request(options, (err, res, body) => {
            console.log(res);
            if(err || res.statusCode != 200){
                callback(new Error());
            } else {
                let jsonBody = JSON.parse(body);
                callback(null, {
                    name : jsonBody.name,
                    id : jsonBody.id,
                    price : jsonBody.price,
                    authors : jsonBody.authors
                })
            }
        });

    }
}