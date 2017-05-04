import React from "react"

import InputText from "./InputText"
import validator from 'validator';
import Button  from './Button';
import {connect} from 'react-redux';
import ActionCreater from '../actions/index'; 
import {registerUser, resetStatusText} from '../actions';
const UserService = require('../services/User.service')

class RegisterForm extends React.Component {
    constructor(props){
        super(props);
        this.onButtonCreateClicked = this.onButtonCreateClicked.bind(this);
        this.handleClickSignIn = this.handleClickSignIn.bind(this);
        this.onTextChange = this.onTextChange.bind(this);
        this.onLoginListener = this.onLoginListener.bind(this);
        this.state = {
            isValidate : false,
            isRegisterSucess : true
        }
        this.isLoading = false;
       
    }

     componentWillReceiveProps(nextProps){
        
    }


    onButtonCreateClicked(e){
        if(this.state.isValidate){
            registerUser(this.inpUsername.getText(), this.inpPassword.getText(), this.inpEmail.getText())(this.props.dispatch);
        }
    }

    validatorInput(username, password, email){
        let usernameRegex = /^[a-zA-Z0-9]+$/;
        let passwordRegex = (/^(?=.*\d)(?=.*[a-z])(?=.*[A-Z])[0-9a-zA-Z]{8,}$/);
        if(!validator.isEmpty(email) && !validator.isEmail(email) ){
            this.messageValidator = "Email not validated"
            this.setState({
                isValidate : false
            })
            return;
        } else if(!validator.isEmpty(username) && !username.match(usernameRegex)){
            this.messageValidator = "Username not validated"
            this.setState({
                isValidate : false
            })
            return;
        } else if(!validator.isEmpty(password) && password.length < 8){
            this.messageValidator = "Password not validated"
            this.setState({
                isValidate : false
            })
            return;
        }
        this.messageValidator = "";
        this.setState({
            isValidate : true
        })
    }

    onTextChange(e){
        this.validatorInput(this.inpUsername.getText(), this.inpPassword.getText(), this.inpEmail.getText());
    }
    
    handleClickSignIn(e){
        if(this.props.handleClickSignIn){
            this.props.handleClickSignIn(e);
            this.props.dispatch(resetStatusText())
        }
    }

    onLoginListener(result){
        if(result && this.props.onLoginListener){
            this.props.onLoginListener(result);
        }
    }

    render(){
        return (
            <form className="form" style={{"display ": "block"}}>
                <InputText type="text" placeholder="username" ref={(ref) => this.inpUsername = ref} onTextChange={this.onTextChange}/>
                <InputText type="password" placeholder="password" ref={(ref) => this.inpPassword = ref} onTextChange={this.onTextChange}/>
                <InputText type="text" placeholder="email address" ref={(ref) => this.inpEmail = ref} onTextChange={this.onTextChange}/>
                <p className="message">{this.state.isValidate ? "" : this.messageValidator}</p>
                <p className="message">{this.props.user.isRegisted ? "" : this.props.user.registerStatusText}</p>
                <Button name="CREATE" loading={this.props.user.isRegisting} nameLoading="CREATING..." ref={(ref) => this.btnCreate = ref} onButtonClick={this.onButtonCreateClicked}/>
                <p className="message">Already registered? <a onClick={this.handleClickSignIn} style={{cursor: 'pointer'}}>Sign In</a></p>
            </form>
        )
    }
}


const mapStateToProps = state => {
    return {
        user : state.user
    }
}

export default connect(mapStateToProps)(RegisterForm);