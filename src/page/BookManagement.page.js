import React from 'react';
import ReactDOM from 'react-dom';
import BookTable from '../conponent/BookTable'
import AppBar from 'material-ui/AppBar';
import MuiThemeProvider from 'material-ui/styles/MuiThemeProvider';

export default class BookManagementPage extends React.Component {
    constructor(props){
        super(props);
    }

    render(){
        return (
            <MuiThemeProvider>
                <BookTable style={{background : 'rgb(246, 239, 241)'}}/>
            </MuiThemeProvider>
        )
    }
}