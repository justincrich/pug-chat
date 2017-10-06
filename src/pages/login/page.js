/*Dependencies*/
import React, {Component} from 'react';
import { graphql, gql } from 'react-apollo';
import { withRouter } from 'react-router';
import axios from 'axios';
/*Components*/
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
      error:null,
      screen:'welcome'
    };
    this._signup.bind(this);
    this.uploadImg.bind(this);
    this._welcome.bind(this);
    this.signupUI.bind(this);
  }
  static propTypes = {
    data: React.PropTypes.object.isRequired,
  }

  _welcome= ()=>{
    return(
      <div className='body'>
        <div className="card welcomeCard">
          <div className="card-block">
          <h2>Pug Chat</h2>
          <p>Welcome to Pug Chat, a chat app for pug lovers. Please register or sign in to continue.</p>
          <div className="welcomeCardButtonContainer d-flex flex-row justify-content-end">
          <button type="button" 
                  className="btn btn-secondary"
                  onClick={()=>{
                      this.setState({
                        screen:'login'
                      })
                    }}
          >Login</button>
          <button type="button" 
                    className="btn btn-secondary bg-primary text-white ml-2"
                    onClick={()=>{
                      this.setState({
                        screen:'signup'
                      })
                    }}
          >Sign Up</button>
            
          </div>
          </div>
        </div>
      </div>
    )
  }
  signupUI = () =>{
    console.log('in signup UI')
    return (
      <div>
        <div className='pageBody'>
          <Signup signup={this._signup} showLogin={this._toggleScreen} error={this.state.error}/>
        </div>
      </div>
    )
  }
  _toggleScreen = (screen) => {
    this.setState({
      screen:screen
    });
  }

  loginUI = () =>{
    return (
      <div>
          <div className='pageBody'>
          <Login
            login={this._login}
            showSignup={this._toggleScreen}
            error={this.state.error}
          />
        </div>
      </div>
    )
  }

  _login = (email,password) =>{
    //do some validation
    this.setState({
      error:null
    });
    //sign in user
    this.props.signinUser({variables:{email,password}})
      .then(resp => {
        window.localStorage.setItem('graphcoolToken', resp.data.signinUser.token);
        //do something to change the screen
        //console.log("auth!!!", resp.data.signinUser.token);
        window.location.reload()

      }).catch(e => {
        e.type = 'login';
        this.setState({
          error:e
        });
        console.error(e)
      });
  }

  _signup = (name,email,password,img) =>{
    this.setState({
      error:null
    });
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
        e.type = 'signup';
        this.setState({
          error:e
        });
        console.error(e);
      })
    }).catch(e=>{
      e.type = 'signup';
      this.setState({
        error:e
      });
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
    switch(this.state.screen){
      case 'welcome':
        return this._welcome();
        break;
      case 'login':
        return this.loginUI();
        break;
      case 'signup':
        return this.signupUI();
        break;
      default:
        console.error('Error: something went wrong rendering the login screen.');
    }
  }
}

// {this.state.login?
//   this.loginUI()
//   :
//   this.signupUI()
// }

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
