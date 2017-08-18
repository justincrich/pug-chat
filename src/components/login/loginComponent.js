/*Dependencies*/
import React, {Component} from 'react';
/*Styling*/
import './loginStyling.css';

class Login extends Component{
  constructor(props) {
    super(props);
    this.state = {
      email:'',
      password:'',
    };
    //login method
    this.login.bind(this);
  }
  login(){
    let eml = this.state.email;
    let pswrd = this.state.password;


    this.props.login(eml,pswrd);
  }
  render(){
    return(
      <div className="loginBody card">
        <div className="card-block">
          <div className="loginCardHeader">
            <h5 className="loginContainerHeader">Login</h5>
          </div>
          <div className="loginCardContentBody">
            <div hidden id="generalSignUpAuthWarning" className="authWarningText"></div>
            <div className='inputContainer input-group'>
              <span className="input-group-addon" id="sizing-addon1">@</span>
              <input type="text" className="form-control" placeholder="Username"
                aria-describedby="sizing-addon1"
                onChange={(e)=> this.setState({email:e.target.value})}
              />
            </div>
            <div className='inputContainer input-group'>
              <span className="input-group-addon" id="sizing-addon1">
                <i className="fa fa-unlock-alt" aria-hidden="true"></i>
              </span>
              <input type="password" className="form-control" placeholder="Password"
                aria-describedby="sizing-addon1"
                onChange={(e)=> this.setState({password:e.target.value})}
              />
            </div>
          </div>
          <div className='loginCardFooter'>
            <button type="button" className="btn btn-secondary" onClick={this.props.showSignup}>Signup</button>
            <button type="button" className="btn btn-primary" onClick={()=>this.login()}>Login</button>
          </div>
        </div>
      </div>
    )
  }
}


export default Login;
