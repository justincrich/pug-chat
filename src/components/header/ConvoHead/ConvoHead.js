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


class ConvoHead extends Component{
  constructor(props){
    super(props);
    this.state={

    }


  }


  render(){
    console.log(this.props);
    return(

      <nav className="convoNav">
        <div className='convoSectionHolderBox'>
          {window.innerWidth<767 &&
            <Link className='backNav' to={"/"}>
                <i className="fa fa-chevron-left backIcon" aria-hidden="true"></i>
                <div className="backText">Home</div>
            </Link>
          }
          <div className="convoNav">
            <div id='peopleNav' className="peopleNav">
              <div className="peopleImg">
                <img
                  src={this.props.users[0].imageUrl}
                  ></img>
              </div>
              <div className="peopleName">
                {this.props.users[0].name}
              </div>
            </div>
          </div>
        </div>
      </nav>

    )

  }
}


export default ConvoHead;
