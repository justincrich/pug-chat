/*Dependencies*/
import React, {Component} from 'react';
import {
  Navbar,
  FormGroup,
  FormControl
} from 'react-bootstrap';
import ReactCSSTransitionGroup from 'react-addons-css-transition-group';
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
          <i id="cogButton" className="fa-2x fa fa-cog chatSettingsIcon"
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
        <ReactCSSTransitionGroup
          transitionName="settingsPopoverTransition"
          transitionEnterTimeout={100}
          transitionLeaveTimeout={100}
          >
          {this.state.popoverOpen &&
            <Popover closePopover={this.togglePopover} logout= {this.props.logout}/>
          }
        </ReactCSSTransitionGroup>
      </nav>

    )

  }
}


export default ListHead;
