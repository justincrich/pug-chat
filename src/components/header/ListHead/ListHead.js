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


class ListHead extends Component{
  constructor(props){
    super(props);
    this.state={
      searching:'icon',
      searchingField:'none',
      settings:'icon',
      newMsg:'icon',
      newMsgField:'none',
    }


  }

  render(){
    return(
      <nav className="listNav">
        <div className='menuSelectionHolderBox'>
            <div className='navSearch input-group'>
              <i className="inputLabel fa fa-search input-group-addon" aria-hidden="true"></i>
              <input id="navSearch" className="form-control mr-sm-2" type="text"/>
            </div>
            <Link to={"/newconvo"}>
              <i className="fa-2x fa fa-pencil-square-o newConvo"
                aria-hidden="true"
                onClick={this.props.newConvo}
                ></i>
            </Link>
        </div>
      </nav>

    )

  }
}


export default ListHead;
