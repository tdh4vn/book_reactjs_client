import {ActionTypes} from './constants';
import UserService from '../services/User.service';

export function loginRequest(){
    return {
        type : ActionTypes.ON_LOGIN
    }
}

export function loginSuccess(jwt, username){
    console.log(jwt);
    localStorage.setItem("jwt", jwt);
    localStorage.setItem("username", username);
    return {
        type : ActionTypes.ON_LOGIN_SUCCESS,
        payload : {
            username : username,
            token : jwt
        }
    }
}

export function loginFailed(){
    return {
        type : ActionTypes.ON_LOGIN_FAILED,
        payload : {
            statusText : "Login Failed",
            isAuthenticating : false
        }
    }
}

export function registerRequest(){
    return {
        type : ActionTypes.ON_REGISTER,
    }
}

export function registerFailed(){
    return {
        type : ActionTypes.ON_REGISTER_FAILED
    }
}

export function registerSuccess(jwt, username, email){
    return {
        type :  ActionTypes.ON_REGISTER_SUCCESS,
        payload : {
            token : jwt,
            username : username,
            email : email
        }
    }
}

export function resetStatusText(){
    return {
        type : ActionTypes.RESET_STATUS_TEXT,
        payload : {
            statusText : null,
            registerStatusText : null
        }
    }
}

export function loginUser(username, password) {
    return function(dispatch){
        dispatch(loginRequest());
        return UserService.loginAPI(username, password, (err, body) => {
            console.log(err);
            if(err){
                dispatch(loginFailed());
            } else {
                body = JSON.parse(body);
                dispatch(loginSuccess(body.jwt, body.username));
            }
        })
    }
}

export function registerUser(username, password, email){
    return function(dispatch){
        dispatch(registerRequest());
        return UserService.registerAPI(username, password, email, (err, body) => {
            if(err){
                dispatch(registerFailed());
            } else {
                dispatch(registerSuccess(body.jwt, body.username, body.email));
            }
        })
    }
}