import React, { Component } from 'react';
import {
  BrowserRouter,
  Route,
  Switch,
  Redirect
} from 'react-router-dom';
import { graphql, gql } from 'react-apollo';
import { withRouter } from 'react-router';

/*PAGE REFS*/
import ConvoListViewWithData from './pages/convolist/ConvoListView.js';
import ConversationView from './pages/conversation/page.js';
import LoginView from './pages/login/page.js';
import SignupView from './pages/signup/page.js';

class App extends Component {
  static propTypes = {
    router: React.PropTypes.object.isRequired,
    data: React.PropTypes.object.isRequired,
  }

  _showLogin = () => {
    this.props.router.push('/login')
  }

  _isLoggedIn = () => {
    return this.props.data.user
  }

  renderLoggedIn(){
    return (
      <ConvoListViewWithData logOut = {this._logout} />
    )
  }

  renderLoggedOut(){
    return (
      <LoginView/>
    );
  }


  render() {
    if(this.props.data.loading){
      //DISPLAY LOADING STATE
      return (<div>Loading</div>)
    }
    if(this._isLoggedIn()){
      return this.renderLoggedIn();
    }else{
      return this.renderLoggedOut();
    }
  }
}

const userQuery = gql`
  query {
    user {
      id
      name
    }
  }
`

export default graphql(userQuery,{options:{fetchPolicy:'network-only'}})(withRouter(App));
