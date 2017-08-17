/*Dependencies*/
import React, {Component} from 'react';
import { graphql, gql } from 'react-apollo';
import { withRouter } from 'react-router';

/*Components*/
import Header from '../../components/header/component.js';
import Login from '../../components/login/loginComponent.js';
import Signup from '../../components/signup/signupComponent.js';

/*Styling*/
import './styling.css';

class LoginView extends Component{
  constructor(props) {
    super(props);
    this.state = {
      login:true,
      email:'',
      password:'',
    };
  }
  static propTypes = {
    // router: React.PropTypes.object.isRequired,
    data: React.PropTypes.object.isRequired,
  }
  signupUI = () =>{
    return (
      <div className='pageBody'>
        <Signup signup={this._signup} showLogin={this._toggleSignupLogin}/>
      </div>
    )
  }
  _toggleSignupLogin = () => {
    this.setState({
      login:!this.state.login
    });
  }

  loginUI = () =>{
    return (
      <div className='pageBody'>
        <Login login={this._login} showSignup={this._toggleSignupLogin}/>
      </div>
    )
  }

  _login = (email,password) =>{
    //do some validation

    //sign in user
    this.props.signinUser({variables:{email,password}})
      .then(resp => {
        window.localStorage.setItem('graphcoolToken', resp.data.signinUser.token);
        //do something to change the screen
        console.log("auth!!!", resp.data.signinUser.token);
        this.props.updatePage();

      }).catch(e => {
        console.error(e)
      });
  }

  _signup = (email,password) =>{
    //do some validation
  }

  render(){
    return(
      <div>
        <Header/>
        {this.state.login?
          this.loginUI()
          :
          this.signupUI()
        }
      </div>
    )
  }
}

const createUser = gql`
  mutation ($email: String!, $password: String!, $name: String!, $emailSubscription: Boolean!) {
    createUser(authProvider: {email: {email: $email, password: $password}}, name: $name, emailSubscription: $emailSubscription) {
      id
    }
  }
`

const signinUser = gql`
  mutation ($email: String!, $password: String!) {
    signinUser(email: {email: $email, password: $password}) {
      token
    }
  }
`

const userQuery = gql`
  query {
    user {
      id
    }
  }
`

export default graphql(createUser, {name: 'createUser'})(
  graphql(userQuery, { options: { fetchPolicy: 'network-only' }})(
    graphql(signinUser, {name: 'signinUser'})(
      withRouter(LoginView))
    )
);
