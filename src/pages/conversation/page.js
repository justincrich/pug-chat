/*Dependencies*/
import React, {Component} from 'react';
import './styling.css';
/*Components*/
import Conversation from '../../components/conversation/component.js';
import TextField from '../../components/conversation/TextField/component.js';
import Header from '../../components/header/component.js';
/*Data*/
const convo = {
  date:"10:46 PM",
  id:1111,
  messages:[
    {
      text:"Hello",
      user:{
        name:"Athena Bringhurst",
        id:1
      }
    },
    {
      text:"I Love You",
      user:{
        name:"Justin Rich",
        id:2
      }
    },
    {
      text:"You're my love",
      user:{
        name:"Athena Bringhurst",
        id:3
      }
    },
    {
      text:"You're my love",
      user:{
        name:"Athena Bringhurst",
        id:3
      }
    },
    {
      text:"You're my love",
      user:{
        name:"Athena Bringhurst",
        id:3
      }
    },
    {
      text:"You're my love",
      user:{
        name:"Athena Bringhurst",
        id:3
      }
    }
  ],
  users:[
    {
      name:"Athena Bringhurst",
      id:1,
      img:"https://scontent-sjc2-1.xx.fbcdn.net/v/t1.0-9/12036376_10206616766792024_2376180338732214314_n.jpg?oh=b7d147ec08172ed0bad19d08eddce7fe&oe=5A0230BD"
    },
    {
      name:"Justin Rich",
      id:2,
      img:"https://scontent-lax3-2.xx.fbcdn.net/v/t1.0-9/14718805_10102886022829089_1236249216051883866_n.jpg?oh=81eabce7bb9fa19753259cbb2f7540c4&oe=5A04DD64"
    }
  ]
};

class ConversationView extends Component{
  constructor(props){
    super(props);
    this.state={
    }
  }

  render(){
    //console.log(this.props.match.params.convoId, this.props.match.params.senderId)
    return(
      <div className='convoPageContainer'>
        <Header status='convo'/>
        <Conversation/>
        <TextField/>
      </div>
    )
  }
}


export default ConversationView;
