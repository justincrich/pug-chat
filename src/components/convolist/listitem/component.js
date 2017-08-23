/*Dependencies*/
import React, {Component} from 'react';
import { Link, Route } from 'react-router-dom';
import Conversation from '../../conversation/component.js';

//styling
import './styling.css';

// let message = {
//   author:"Athena Bringhurst",
//   img:"https://scontent-sjc2-1.xx.fbcdn.net/v/t1.0-9/12036376_10206616766792024_2376180338732214314_n.jpg?oh=b7d147ec08172ed0bad19d08eddce7fe&oe=5A0230BD",
//   text:"I Love You! Please bring home bacon.",
//   date:"10:46 PM",
//   id:1
// };

class ListItem extends Component{
  constructor(props){
    super(props);
    this.state={
    }
  }



  render(){
    return(
      <Link to={'/'+this.props.userID+'/convo/' + this.props.convo.id+'/'}>
        <li className='convoListItem'>
            <div className='userImg'>
              <img
                src={this.props.users[0].imageUrl}/>
            </div>
            <div className="msgLiContainer">
              <div className="authorMessage">
                <div className='authorText'>
                  {this.props.users[0].name}
                </div>
                <div className='messageText'>
                  {this.props.message?
                    this.props.message.text
                    :
                    <div></div>
                  }
                </div>
              </div>
            </div>
            <div className='date'>
              {this.props.message?
                  this.props.message.createdAt
                :
                  <div></div>
              }
            </div>
            <i className="deleteConvoInList fa fa-times"
              aria-hidden="true"
              onClick={()=>this.props.deleteConvo(this.props.convo)}></i>
        </li>
      </Link>
    )
  }
}

export default ListItem;
