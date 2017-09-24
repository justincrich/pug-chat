/*Dependencies*/
import React, {Component} from 'react';
import {
  Navbar,
  FormGroup,
  FormControl
} from 'react-bootstrap';
import { Link } from 'react-router-dom'
import Popover from '../../popover/popoverComponent.js';
//styling
import './styling.css';
var popoverEvent;

class ListHead extends Component{
  constructor(props){
    super(props);
    this.state={
      searching:'icon',
      searchingField:'none',
      settings:'icon',
      newMsg:'icon',
      newMsgField:'none',
      popoverOpen:false
    }
    this.togglePopover = this.togglePopover.bind(this);

  }

  togglePopover(){
    this.setState(prevState => ({
      popoverOpen: !prevState.popoverOpen
    }));
  }

  componentWillMount(){
    console.log('hiii')
  }

  render(){
    return(
      <nav className="listNav">
        <div className='menuSelectionHolderBox'>
          <i className="fa-2x fa fa-cog chatSettingsIcon"
            aria-hidden="true"
            onClick={this.togglePopover}
            ></i>
            <Link to={"/newconvo"}>
              <i className="fa-2x fa fa-pencil-square-o newConvo"
                aria-hidden="true"
                onClick={this.props.newConvo}
                ></i>
            </Link>
        </div>
        {this.state.popoverOpen &&
          <Popover closePopover={this.togglePopover} logout= {this.props.logout}/>
        }
      </nav>

    )

  }
}


export default ListHead;
