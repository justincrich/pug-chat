import React, {Component} from 'react';
import "./styling.css";

class TextField extends Component{
  render(){
    return(
      <div className='messageTextFieldContainer'>
        <input type="text" placeholder="Type a message..."></input>
        <a className="messageTextFieldSubmit" href="#">
          Submit
        </a>
      </div>
    )
  }
}


export default TextField;
