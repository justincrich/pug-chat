/*Dependencies*/
import React, {Component} from 'react';
/*Styling*/
import './signupStyling.css';

class Signup extends Component{

  render(){
    return(
      <div className="signupBody card">
        <div className="card-block">
          <div className="signupCardHeader">
            <h5 className="signupContainerHeader">Signup</h5>
          </div>
          <div className="signupCardContentBody">
            <div className='inputContainer input-group'>
              <span className="input-group-addon" id="sizing-addon1">@</span>
              <input type="text" className="form-control" placeholder="Email"
                aria-describedby="sizing-addon1"/>
            </div>
            <div className='inputContainer input-group'>
              <span className="input-group-addon" id="sizing-addon1">
                <i className="fa fa-unlock-alt" aria-hidden="true"></i>
              </span>
              <input type="text" className="form-control" placeholder="Password"
                aria-describedby="sizing-addon1"/>
            </div>
          </div>
          <div className='signupCardFooter'>
            <button type="button" className="btn btn-secondary" onClick={this.props.showLogin}>Login</button>
            <button type="button" className="btn btn-primary" onClick={this.props.signup}>Signup</button>
          </div>
        </div>
      </div>
    )
  }
}


export default Signup;
