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


class NewConvoHead extends Component{
  constructor(props){
    super(props);
    this.state={

    }


  }


  render(){
    return(

      <nav className="convoNav">
        <div className='convoSectionHolderBox'>
          <div className='newConvoHeaderText'>New Conversation</div>
          <Link className='newConvoBackNav' to={"/"}>
              <i className="fa fa-2x fa-times backIcon" aria-hidden="true"></i>
          </Link>
        </div>
      </nav>

    )

  }
}


export default NewConvoHead;
