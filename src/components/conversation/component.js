/*Dependencies*/
import React, {Component} from 'react';
import ReactDOM from 'react-dom';
/*Components*/
import Message from './Message/component.js';
/*Styling*/
import './styling.css';




class Conversation extends Component{
  constructor(props){
    super(props);

  }
  messages(msg){

    return msg.map(message=>{
      let self = this.props.userID === message.user.id ? true : false;
      return (
        <Message
          author={message.user.name}
          img={message.user.imageUrl}
          text={message.text}
          date={message.createdAt}
          self={self}
          key={message.id}
        />
      );
    });
  }


  componentDidMount(){
    // msgs = this.messages(messages);
    // const node = ReactDOM.findDOMNode(msgs[msgs.length-1]);
    let objDiv = document.getElementById("convo");
    objDiv.scrollTop = objDiv.scrollHeight;


  }

  render(){
    return(

      <div className='conversationContainer'>
        <div id='convo' className='convoBody'>
          {this.messages(this.props.conversation.messages)}
        </div>
        
      </div>
    )
  }
}

export default Conversation;
