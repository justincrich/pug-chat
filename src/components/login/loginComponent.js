/*Dependencies*/
import React, {Component} from 'react';
import {loginValidate} from '../tools/validator.js';
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
  componentWillReceiveProps(nextProps){
    let generalWarning = document.getElementById('generalSignUpAuthWarning');
    if(nextProps.error!=null && nextProps.error.type ==='login'){
      let notFound = nextProps.error.message.indexOf('No user found with that information');
      if (notFound != -1){
        let message = 'Invalid username or password.';
        generalWarning.innerHTML = message;
        generalWarning.style.display = 'flex';
      }
    }
    if(nextProps.error == null){
      generalWarning.innerHTML = '';
      generalWarning.style.display = 'none';
    }

  }
  login(){
    let eml = this.state.email;
    let pswrd = this.state.password;
    let valid = loginValidate(eml,pswrd);

    //handle email warnings
    let emailWarning = document.getElementById("loginEmailWarning");
    if(valid.email == false){
      emailWarning.style.display='flex';
    }else{
      emailWarning.style.display = 'none';
    }
    console.log(eml,pswrd,'email valid', valid.email, 'password valid',valid.password)

    //handle password warnings
    let passwordWarning = document.getElementById("loginPasswordWarning");
    if(valid.password == false){
      passwordWarning.style.display='flex';
    }else{
      passwordWarning.style.display = 'none';
    }

    if(valid.email && valid.password){
      this.props.login(eml,pswrd);
    }
  }
  render(){
    return(
      <div className="loginBody card">
        <div className="card-block">
          <div className="loginCardHeader">
            <h5 className="loginContainerHeader">Login</h5>
          </div>
          <div className="loginCardContentBody">
            <div id="generalSignUpAuthWarning" className="authWarningText"></div>
            <div id="loginEmailWarning" className="authWarningText">Please enter a valid email</div>
            <div className='inputContainer input-group'>
              <span className="input-group-addon" id="sizing-addon1">@</span>
              <input type="text" className="form-control" placeholder="Username"
                aria-describedby="sizing-addon1"
                onChange={(e)=> this.setState({email:e.target.value})}
              />
            </div>
            <div id="loginPasswordWarning" className="authWarningText">Please enter a valid password</div>
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
