/*Dependencies*/
import React, {Component} from 'react';
import {
  Navbar,
  FormGroup,
  FormControl
} from 'react-bootstrap';
import { Link } from 'react-router-dom'

//styling
import './styling.css';

const convo = {
  createdAt: "10:46 AM",
  id: 0,
  senderId: 0,
  users:[
    {name:'Athena'},
    {name:'Justin'}
  ],
  messages:[
    {
      id:1111,
      text:'I love you',
      createdAt:'1:00 PM',
      user:{
        name:'Athena',
        id:1,
        img:"https://scontent-sjc2-1.xx.fbcdn.net/v/t1.0-9/12036376_10206616766792024_2376180338732214314_n.jpg?oh=b7d147ec08172ed0bad19d08eddce7fe&oe=5A0230BD"
      }
    },
    {
      id:1112,
      text:'You\'re my love',
      createdAt:'1:01 PM',
      user:{
        name:'Justin',
        id:2,
        img:"https://scontent-lax3-2.xx.fbcdn.net/v/t1.0-9/14718805_10102886022829089_1236249216051883866_n.jpg?oh=81eabce7bb9fa19753259cbb2f7540c4&oe=5A04DD64"
      }
    }
  ]
}

class Header extends Component{
  constructor(props){
    super(props);
    this.state={
    }
    this.type.bind(this);
  }
  type(test){
    console.log(test);
    switch(test){
      case 'search':{
        return (<div className='navSearch input-group'>
          <i className="fa fa-search input-group-addon" aria-hidden="true"></i>
          <input className="form-control mr-sm-2" type="text"/>

        </div>);
      }
      break;
      case 'convo':{

        return (
          <div className="convoNav">
            <Link className="backNav" to={"/"}>
              <i className="fa fa-chevron-left backIcon" aria-hidden="true"></i>
              <div className="backText">Home</div>
            </Link>
            <div className="peopleNav">
              <div className="peopleImg">
                <img
                  src="https://scontent-sjc2-1.xx.fbcdn.net/v/t1.0-9/12036376_10206616766792024_2376180338732214314_n.jpg?oh=b7d147ec08172ed0bad19d08eddce7fe&oe=5A0230BD"
                  ></img>
              </div>
              <div className="peopleName">
                Athena
              </div>
            </div>
          </div>
        )
      }
      break;

    }
  }
  render(){
    return(
      <nav className="navbar navbar-dark bg-faded fixed-top">
        {
          this.type(this.props.status)
        }
      </nav>
    )
  }
}


export default Header;

{/*

  this.props.status ==='search' ?
  (<div className='navSearch input-group'>
    <i className="fa fa-search input-group-addon" aria-hidden="true"></i>
    <input className="form-control mr-sm-2" type="text"/>

  </div>)
  :
  (
    this.props.status === 'convo' ?
      ("convo")
    :
      "nothin"
  )


   */}
