import React from "react"
import ButtonCSS from './Button.css'
export default class Button extends React.Component {
    constructor(props){
        super(props);
        this.handleClick = this.handleClick.bind(this);
    }


    handleClick(e){
        if(this.props.onButtonClick){
            this.props.onButtonClick(e);
        }
    }

    render(){
        return(
            <button type="button" className="form-button" disabled={this.props.loading} onClick={this.handleClick}>{this.props.loading ? this.props.nameLoading : this.props.name}</button>
        )
    }
}