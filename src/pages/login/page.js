import React, {Component} from 'react';
import Header from '../../components/header/component.js';
import './styling.css';

class LoginView extends Component{
  _logout = () => {
    // remove token from local storage and reload page to reset apollo client
    window.localStorage.removeItem('graphcoolToken')
    window.location.reload()
  }

  _showSignup = () => {
    this.props.router.push('/signup')
  }
  render(){
    return(
      <div>
        <Header/>
        <div className='pageBody'>
          <div className="loginBody card">
            <div className="card-block">
              <div className="loginCardHeader">
                <h5>Login</h5>
              </div>
              <div className="loginCardContentBody">
                <div className='inputContainer input-group'>
                  <span className="input-group-addon" id="sizing-addon1">@</span>
                  <input type="text" className="form-control" placeholder="Username"
                    aria-describedby="sizing-addon1"/>
                </div>
                <div className='inputContainer input-group'>
                  <span className="input-group-addon" id="sizing-addon1">
                    <i className="fa fa-unlock-alt" aria-hidden="true"></i>
                  </span>
                  <input type="password" className="form-control" placeholder="Password"
                    aria-describedby="sizing-addon1"/>
                </div>
              </div>
              <div className='loginCardFooter'>
                <button type="button" className="btn btn-secondary">Signup</button>
                <button type="button" className="btn btn-primary">Login</button>
              </div>
            </div>
          </div>
        </div>
      </div>
    )
  }
}


export default LoginView;
