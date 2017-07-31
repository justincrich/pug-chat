import React, {Component} from 'react';
import ReactDOM from 'react-dom';
import Message from './Message/component.js';
import TextField from './TextField/component.js';
import './styling.css';

let messages = [
  {
    author:"Athena Bringhurst",
    img:"https://scontent-sjc2-1.xx.fbcdn.net/v/t1.0-9/12036376_10206616766792024_2376180338732214314_n.jpg?oh=b7d147ec08172ed0bad19d08eddce7fe&oe=5A0230BD",
    text:"I Love You! Please bring home bacon.",
    date:"10:46 AM",
    id:1,
    self:false
  },
  {
    author:"Justin Rich",
    img:"https://scontent-lax3-2.xx.fbcdn.net/v/t1.0-9/14718805_10102886022829089_1236249216051883866_n.jpg?oh=81eabce7bb9fa19753259cbb2f7540c4&oe=5A04DD64",
    text:"I want to marry you!",
    date:"11:00 AM",
    id:2,
    self:true
  },
  {
    author:"Athena Bringhurst",
    img:"https://scontent-sjc2-1.xx.fbcdn.net/v/t1.0-9/12036376_10206616766792024_2376180338732214314_n.jpg?oh=b7d147ec08172ed0bad19d08eddce7fe&oe=5A0230BD",
    text:"OK!",
    date:"11:10 AM",
    id:3,
    self:false
  },
];


class Conversation extends Component{
  messages(msg){
    return msg.map(message=>{
      return (
        <Message
          author={message.author}
          img={message.img}
          text={message.text}
          date={message.date}
          self={message.self}
          key={message.id}
        />
      );
    });
  }

  componentDidMount(){
    // msgs = this.messages(messages);
    // const node = ReactDOM.findDOMNode(msgs[msgs.length-1]);
    let objDiv = document.getElementById("convo");
    console.log(objDiv);
    objDiv.scrollTop = objDiv.scrollHeight;

  }

  render(){
    let msgs = this.messages(messages);
    return(

      <div className='conversationContainer'>
        <div id='convo' className='convoBody'>
          {msgs}

        </div>
        <TextField/>
      </div>
    )
  }
}

export default Conversation;
