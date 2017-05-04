import React from "react"
import Button from "./Button"
import InputText from "./InputText"
import {connect} from 'react-redux';
import {loginUser, resetStatusText} from '../actions'
const UserService = require('../services/User.service')

class LoginForm extends React.Component {
    constructor(props){
        super(props);
        this.handleClickSignUp = this.handleClickSignUp.bind(this);
        this.onLoginListener = this.onLoginListener.bind(this);
        this.state = {
            isRegisterSucess : true
        }
         console.log(typeof this.props.dispatch);
         console.log(this.props);
    }

    componentWillReceiveProps(nextProps){  
    }


    onButtonLoginClicked = e => {
        loginUser(this.inpUsername.inpText.value, this.inpPassword.inpText.value)(this.props.dispatch);
    }

    onLoginListener(result){
        if(result && this.props.onLoginListener){
            this.props.onLoginListener(result);
        }
    }

    handleClickSignUp(e){
        if(this.props.handleClickSignUp){
            this.props.handleClickSignUp(e);
            this.props.dispatch(resetStatusText());
        }
    }

    render(){
        
        return (
            <form className="form">
                <p className="message">{this.props.user.isAuthenticated ? "" : this.props.user.statusText}</p>
                <InputText type="text" placeholder="username" ref={(ref) => this.inpUsername = ref}/>
                <InputText type="password" placeholder="password" ref={(ref) => this.inpPassword = ref}/>
                <Button name="LOGIN" loading={this.props.user.isAuthenticating} nameLoading={this.props.user.isAuthenticating ? "LOGGING" : "LOGIN"} ref={(ref) => this.btnLogin = ref} onButtonClick={this.onButtonLoginClicked}/>
                <p className="message">Not registered? <a onClick={this.handleClickSignUp} style={{cursor: 'pointer'}}>Create an account</a></p>
            </form>
        )
    }
}
const mapStateToProps = state => {
    return {
        user : state.user
    }
}
export default connect(mapStateToProps)(LoginForm);