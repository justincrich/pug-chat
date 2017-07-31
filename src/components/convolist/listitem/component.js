import React, {Component} from 'react';
import { Link } from 'react-router-dom';
//styling
import './styling.css';

let message = {
  author:"Athena Bringhurst",
  img:"https://scontent-sjc2-1.xx.fbcdn.net/v/t1.0-9/12036376_10206616766792024_2376180338732214314_n.jpg?oh=b7d147ec08172ed0bad19d08eddce7fe&oe=5A0230BD",
  text:"I Love You! Please bring home bacon.",
  date:"10:46 PM",
  id:1
};

class ListItem extends Component{
  constructor(props){
    super(props);
    this.state={
    }
  }



  render(){
    return(
      <Link to={'/convo/' + this.props.convo.id+'/'+this.props.convo.users[0].id}>
        <li className='convoListItem'>
            <div className='userImg'>
              <img
                src={this.props.convo.img}/>
            </div>
            <div className="msgLiContainer">
              <div className="authorMessage">
                <div className='authorText'>
                  {this.props.convo.author}
                </div>
                <div className='messageText'>
                  {this.props.convo.text}
                </div>
              </div>
            </div>
            <div className='date'>
              {this.props.convo.date}
            </div>
        </li>
      </Link>
    )
  }
}

export default ListItem;
