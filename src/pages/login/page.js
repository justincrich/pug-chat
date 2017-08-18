/*Dependencies*/
import React, {Component} from 'react';
import { graphql, gql } from 'react-apollo';
import { withRouter } from 'react-router';
import axios from 'axios';
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
      login:false,
      email:'',
      password:'',
    };
    this._signup.bind(this);
    this.uploadImg.bind(this);
  }
  static propTypes = {
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
        //console.log("auth!!!", resp.data.signinUser.token);
        window.location.reload()

      }).catch(e => {
        console.error(e)
      });
  }

  _signup = (name,email,password,img) =>{
    this.props.createUser(
      {
        variables:{
          name,
          email,
          password
        }
      }
    ).then(resp =>{
      //start img upload once signup is complete
      let userID = resp.data.createUser.id;

      // sign in user
      this.props.signinUser({variables:{email,password}})
      .then(resp=>{
        let token = resp.data.signinUser.token
        window.localStorage.setItem('graphcoolToken', resp.data.signinUser.token);
        //if there's an image save it
        if(img){
          this.uploadImg(userID,img,token);
        }else{
          window.location.reload()
        }
      }).catch(e=>{
        console.error(e);
      })
    }).catch(e=>{
      console.error(e);
    })
  }

  uploadImg(userID,file,token){
    let data = new FormData();
    data.append('data',file);

    axios.post('https://api.graph.cool/file/v1/cj64bcbxh8vda0153u98etj4i',
    data,{
      headers:{
        'Content-Type': 'multipart/form-data'
      },
      responseType: 'json'
    }).then(resp=>{
      let imgID = resp.data.id;
      let imgURL = resp.data.url;

      this.props.updateUser({variables:{id:userID,imgID:imgID,imgURL:imgURL}})
      .then(resp=>{
        console.log('user updated',resp);
        window.location.reload()
      });
    });

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
  mutation ($name: String!, $email: String!, $password: String!) {
    createUser(authProvider: {email: {email: $email, password: $password}}, name: $name) {
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

const updateUser = gql`
  mutation updateUser ($id:ID!,$imgID:ID!,$imgURL:String!){
    updateUser(id:$id, imageUrl:$imgURL){
      id
      name
      imageUrl
      image{
        id
      }
    }
    updateFile(id:$imgID,userId:$id){
      id
      user{
        id
        name
        imageUrl
      }
    }
  }
`

const userQuery = gql`
  query {
    user {
      id
      name
      imageUrl
    }
  }
`

export default graphql(updateUser,{name:'updateUser'})(graphql(createUser, {name: 'createUser'})(
  graphql(userQuery, { options: { fetchPolicy: 'network-only' }})(
    graphql(signinUser, {name: 'signinUser'})(
      withRouter(LoginView))
    )
));
