import React from 'react';
import ReactDOM from 'react-dom';
import MuiThemeProvider from 'material-ui/styles/MuiThemeProvider';
import { MuiDataTable } from 'mui-data-table';
import Button from 'muicss/lib/react/button';
import Container from 'muicss/lib/react/container';
import AddBookDialog from './dialogs/AddBookDialog';
import {connect} from 'react-redux';
import Dialog from 'material-ui/Dialog';
import FlatButton from 'material-ui/FlatButton';
import RaisedButton from 'material-ui/RaisedButton';
import SelectField from 'material-ui/SelectField';
import MenuItem from 'material-ui/MenuItem';
import {bookActionCreator} from '../actions';
import EditBookDialog from './dialogs/EditBookDialog';
import {
    Table,
    TableBody,
    TableHeader,
    TableHeaderColumn,
    TableRow,
    TableRowColumn
} from 'material-ui/Table';



const BookService = require('../services/Book.service');


const buttonStyle = {
    'background' : '#4CAF50',
    'margin-right':' 10px'
}

class BookTable extends React.Component {

    constructor(props){
        super(props);
        this.getBooks = this.getBooks.bind(this);
        this.addBookClicked = this.addBookClicked.bind(this);
        this.onDoneAddBook = this.onDoneAddBook.bind(this);
        this.onCancelAddBook = this.onCancelAddBook.bind(this);
        this.books = this.props.books;
        this.state = {
            hasData : true,
            isOpenAddBook : false,
            isOpenEditBook : false,
            value : 1,
            books : this.props.books,
            rowSelect : -1,
            renderTable : 1,
            openDeleteComfirmDialog : false
            
        }
        this.getBooks();
    }

    componentWillReceiveProps(nextProps){
        console.log(nextProps);
        
        this.setState({
            renderTable : this.state.renderTable + 1,
            books : nextProps.books
        })
        this.forceUpdate();
    }

    getBooks(){
        bookActionCreator.getBooks()(this.props.dispatch);
    }

    addBookClicked(e){
        this.dialogAddBook.getWrappedInstance().showDialog();
    }

    editBookClicked = e => {
        if(this.state.rowSelect != -1){
            console.log("hhi");
            this.editBookDialog.getWrappedInstance().showDialog();
            this.editBookDialog.getWrappedInstance().setBook(this.props.books[this.state.rowSelect]);
        }
    }

    onDoneAddBook(book){
        console.log(book);
    }

    onCancelAddBook(){
        this.setState({
            isOpenAddBook : false
        })
    }

    onCancelEditBook(){
        this.setState({
            isOpenEditBook : false
        })
    }

    onComfirmDelete = (event) => {
        console.log(this.props.store);
        bookActionCreator.deleteBook(this.props.books[this.state.rowSelect].id)(this.props.dispatch);
        this.handleCloseDeleteComfirmDialog();
    }

    handleCloseDeleteComfirmDialog = (event) => {
        this.setState({openDeleteComfirmDialog: false});
    }

    openDeleteComfirmDialog = () => {
         if(this.state.rowSelect != -1){
            this.setState({openDeleteComfirmDialog: true});
         }
    }


    render(){

        let tableBody = [];

        this.props.books.forEach(function(element){
            tableBody.push(
                <TableRow
                    key={element.id}>
                    <TableRowColumn>{element.id}</TableRowColumn>
                    <TableRowColumn>{element.name}</TableRowColumn>
                    <TableRowColumn>{element.price}</TableRowColumn>
                    <TableRowColumn>{element.author.name}</TableRowColumn>
                </TableRow>
            )
        })

        const actionsDeleteBook = [
            <FlatButton
                label="Cancel"
                primary={true}
                onTouchTap={this.handleCloseDeleteComfirmDialog}
            />,
            <FlatButton
                label="Delete"
                primary={true}
                keyboardFocused={true}
                onTouchTap={this.onComfirmDelete}
            />,
        ];

        return (

            <div>
                <Container style={{'margin-bottom' : '10px'}}>
                    <RaisedButton label="Add Book" style={buttonStyle} primary={true} onClick={this.addBookClicked}/>
                    <RaisedButton label="Edit Book" style={buttonStyle} primary={true} onClick={this.editBookClicked}/>
                    <RaisedButton label="Delete Book" style={buttonStyle} primary={true} onClick={this.openDeleteComfirmDialog}/> 
                </Container>
                
                <Table
                    onRowSelection={(selectedRows) => {
                        if(selectedRows.length > 0){
                            console.log(selectedRows[0]);
                            this.setState({
                                rowSelect : selectedRows[0]
                            })
                        }
                    }}>
                    <TableHeader>
                    <TableRow>
                        <TableHeaderColumn>ID</TableHeaderColumn>
                        <TableHeaderColumn>Name</TableHeaderColumn>
                        <TableHeaderColumn>Price</TableHeaderColumn>
                        <TableHeaderColumn>Author</TableHeaderColumn>
                    </TableRow>
                    </TableHeader>
                    <TableBody>
                        {tableBody}
                    </TableBody>
                </Table>
                
                <AddBookDialog
                    ref={(ref) => this.dialogAddBook = ref}
                    onDone={this.onDoneAddBook}
                    onCancel={this.onCancelAddBook}>
                </AddBookDialog>
                
                <EditBookDialog
                    ref={(ref) => this.editBookDialog = ref}>
                </EditBookDialog>

                <div>
                    <Dialog
                        title="Delete Book"
                        actions={actionsDeleteBook}
                        modal={false}
                        open={this.state.openDeleteComfirmDialog}
                        onRequestClose={this.handleCloseDeleteComfirmDialog}
                    >
                    Are you sure you want to delete this book?
                    </Dialog>
                </div>
                
            </div>
        )
    }
}

const mapStateToProps = state => {
    return {
        books : state.book.books
    }
}

export default connect(mapStateToProps)(BookTable);