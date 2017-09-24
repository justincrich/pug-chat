import React, {Component} from 'react';
import ReactDOM from 'react-dom';
//styling
import './styling.css';

export default class Popover extends Component{
  constructor(props){
    super(props);
  }
  componentWillMount() {
    // add event listener for clicks
    document.addEventListener('click', this.handleClick, false);
  }

  componentWillUnmount() {
    // make sure you remove the listener when the component is destroyed
    document.removeEventListener('click', this.handleClick, false);
  }

  handleClick = e => {
    // this is the key part - ReactDOM.findDOMNode(this) gives you a reference
    // to your CalendarPopup component;
    // e.target is the element which was clicked upon.
    // check whether the element clicked upon is in your component - if not,
    // then call the close logic
    if(!ReactDOM.findDOMNode(this).contains(e.target)) {
      // the click was outside your component, so handle closing here
      this.props.closePopover();
    }
  }

  render(){
    return(
      <div id="settingsPopover" className="popover" role="tooltip">
        <div className="popover-arrow">
        </div>
        <div className="popover-arrow-inner">
        </div>
        <div className="popover-content">
            <div className='popover-option popover-logout'
              key="b"
              onClick = {this.props.logout}
              >
              <i  className="fa fa-sign-out fa-lg" aria-hidden="true"></i>
              <span>Logout</span>
            </div>
        </div>
      </div>
    );
  }
}
