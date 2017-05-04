import React from 'react';
import 'react-select/dist/react-select.css';
import Select from 'react-select';
import TextField from 'material-ui/TextField';
import SelectField from 'material-ui/SelectField';
import MenuItem from 'material-ui/MenuItem';
import RaisedButton from 'material-ui/RaisedButton';
import FlatButton from 'material-ui/FlatButton';
import Dialog from 'material-ui/Dialog';
const BookService = require('../../services/Book.service');
import {connect} from 'react-redux';
import {bookActionCreator} from '../../actions'; 


const buttonStyle = {
    'background' : '#4CAF50',
    'margin-right':' 10px'
}

class EditBookDialog extends React.Component {

    constructor(props){
        super(props);
        this.state = {
            isAuthorLoaded : false,
            authorSelect : 1,
            authors : [],
            open : false,
            textRequiredName : "This field is required",
            textRequiredPrice : "This field is required",
            validate : true,
            book : null
        }
        this.bookName = "";
        this.bookPrice = "";
        this.bookId = null;
        this.authors = [];
        this.loadAuthor = this.loadAuthor.bind(this);
        this.getBook = this.getBook.bind(this);
        this.showDialog = this.showDialog.bind(this);
        this.dismiss = this.dismiss.bind(this);
        this.loadAuthor();
    }

    showDialog(){
        this.setState({
            open : true,
            textRequiredName : "This field is required",
            textRequiredPrice : "This field is required",
            validate : true
        })
    }

    dismiss(){
        this.setState({
            open : false
        })
    }

    setBook = book => {
        console.log(book);
        this.bookName = book.name;
        this.bookPrice = book.price;
        this.bookId = book.id;
        this.setState({
            book,
            authorSelect : book.author.id,
            textRequiredName : "",
            textRequiredPrice : "",
            validate : false
        })
    }


    loadAuthor(){
        bookActionCreator.getAuthors()(this.props.dispatch);
    }

    getBook(){

        let author = {};
        this.props.authors.forEach((element)=>{
            if(element.id === this.state.authorSelect){
                author = element
            }
        })


        return {
            id : this.bookId,
            name : this.bookName,
            price : this.bookPrice,
            authors : author
        }
    }

    editBook = () => {
        if(this.bookName.toString().length > 0 && this.bookPrice.toString().length > 0){
            bookActionCreator.editBook(this.getBook())(this.props.dispatch);
        }
    }

    handleChange = (event, index, author) => {
        console.log(author);
        this.setState({authorSelect : author}) 
    };

    handleClose = (event) => {
        this.setState({open: false});
    }

    render() {
        const actions = [
            <FlatButton
                label="Cancel"
                
                primary={true}
                onTouchTap={this.handleClose}
            />,
            <FlatButton
                ref={(ref)=>this.btnSubmit=ref}
                disabled={this.state.validate}
                label="Edit"
                primary={true}
                keyboardFocused={true}
                onTouchTap={() => {
                    this.editBook();
                    
                    this.handleClose();
                }}
            />,
        ];
        return (
            <Dialog
                title="Add Book"
                actions={actions}
                modal={false}
                open={this.state.open}
                onRequestClose={this.handleClose}>
                    <TextField
                        ref={(ref)=>this.inpName=ref}
                        hintText="Hint Text"
                        floatingLabelText="Name"
                        value={this.bookName}
                        errorText={this.state.textRequiredName}
                        floatingLabelFixed={true}
                        onChange={(event, str) => {
                            this.bookName = str;
                            if (str.toString().length > 0){
                                this.setState({textRequiredName : ""});
                                if(this.bookPrice.toString().length > 0){
                                    this.setState({validate : false})
                                }
                            } else {
                                this.setState({textRequiredName : "This field is required", validate : true});
                                
                            }
                        }}
                    /><br/>
                    <TextField
                        ref={(ref) => this.inpPrice = ref}
                        hintText="Hint Text"
                        floatingLabelText="Price"
                        value={this.bookPrice}
                        errorText={this.state.textRequiredPrice}
                        floatingLabelFixed={true}
                        onChange={(e, str)=>{
                            this.bookPrice = str;
                            if (str.toString().length > 0){
                                this.setState({textRequiredPrice : ""});
                                if(this.bookName.toString().length > 0){
                                    this.setState({validate : false})
                                }
                            } else {
                                this.setState({textRequiredPrice : "This field is required", validate : true});
                            }
                        }}
                    /><br />

                    <SelectField
                        floatingLabelText="Author"
                        value={this.state.authorSelect}
                        onChange={this.handleChange}
                    >
                        {this.props.authors_render}
                    </SelectField>
                    <br />
            </Dialog>
        );
    }
}

const mapStateToProps = state => {
    console.log(state);
    let options = [];
    state.book.authors.forEach(function(element){
        options.push(<MenuItem key={element.id} value={element.id} primaryText={element.name} />)
    })
    return {
        authors : state.book.authors,
        authors_render : options
    }
}

export default connect(mapStateToProps, null, null, { withRef: true })(EditBookDialog);//set to access to function