/*Dependencies*/
import React, {Component} from 'react';
import {
  BrowserRouter,
  Route,
  Switch,
  Redirect
} from 'react-router-dom';
import { withApollo, graphql, gql } from 'react-apollo';
import { withRouter } from 'react-router';

/*Pages*/
import Header from './components/header/component.js';
import ConvoListViewWithData from './pages/convolist/ConvoListView.js';
import ConversationView from './pages/conversation/page.js';
import LoginView from './pages/login/page.js';
import SignupView from './pages/signup/page.js';

/*Styling*/


class App extends Component {
  static propTypes = {
    // router: React.PropTypes.object.isRequired,
    data: React.PropTypes.object.isRequired,
  }
  constructor(props){
    super(props);
    this._logout.bind(this);
  }

  _logout = () =>{
    window.localStorage.removeItem('graphcoolToken');
    window.location.reload();
  }

  _isLoggedIn = () => {
    return this.props.data.user
  }



  renderLoggedIn(){

      return (
        <div>
          <Header status='search' logout={this._logout}/>
          <ConvoListViewWithData userID={this.props.data.user.id}/>
        </div>

    )
  }


  renderLoggedOut(){
    return (
      <div>
        <Header/>
        <LoginView />
      </div>
    );
  }


  render() {
    if(this.props.data.loading){
      //DISPLAY LOADING STATE
      return (<div>Loading</div>)
    }
    if(this.props.data.user){
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
      imageUrl
    }
  }
`




export default withApollo(
  graphql(userQuery,{options:{fetchPolicy:'network-only'}})
  (withRouter(App)
  )
);
