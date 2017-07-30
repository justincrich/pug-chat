import React, {Component} from 'react';
import './styling.css';

class Message extends Component{
  render(){
    return(
      <div className={
        this.props.self === true ?
        "selfMsgContainer"
        :
        "msgContainer"
      }>
        <div className="imgBody">
          <img src={this.props.img}/>
        </div>
        <div className="msgBody">
          <div className="msgText">
            {this.props.text}
          </div>
        </div>
      </div>
    )
  }
}


export default Message;
