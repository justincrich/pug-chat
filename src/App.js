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
import NewConvo from './pages/newconvo/NewConvoPage.js'
/*Styling*/
import './App.css';

class App extends Component {
  static propTypes = {
    // router: React.PropTypes.object.isRequired,
    data: React.PropTypes.object.isRequired,
  }
  constructor(props){
    super(props);
    this.state={
      windowWidth:350,
      conversationSelected:''
    }
    this._logout.bind(this);
    this.getUI.bind(this);
    this.updateWindowWidth=this.updateWindowWidth.bind(this);
  }

  _logout = () =>{
    window.localStorage.removeItem('graphcoolToken');
    window.location.reload();
  }

  _isLoggedIn = () => {
    return this.props.data.user
  }

  updateWindowWidth(){
    this.setState({
      windowWidth:window.innerWidth
    });
  }


  //the logged in state
  renderLoggedIn(){

    if(this.state.windowWidth> 0 && this.state.windowWidth<=767){
      //Mobile view
      return(
        <ConvoListViewWithData userID={this.props.data.user.id} logout={this._logout}/>
      )
    }else if(this.state.windowWidth>768){
      //Tablet view
      return(
        <div className='appContainer'>
          <ConvoListViewWithData userID={this.props.data.user.id} logout={this._logout}/>
          <Route name='conversation' path={"/:userId/convo/:convoId"} component={ConversationView}/>
        </div>
      )
    }else{
      return(
        <div>tablet</div>
      )
    }


  }

  getUI(width){
    console.log(width);
    //
  }


  renderLoggedOut(){
    return (
      <div>
        <LoginView />
      </div>
    );
  }


  /*--------- REACT METHODS ------------*/

  componentDidMount(){
    this.setState({
      windowWidth:window.innerWidth
    });
    window.addEventListener('resize',this.updateWindowWidth);
  }
  componentWillReceiveProps(){

  }

  componentWillUnmount(){
    window.removeEventListener('resize',this.updateWindowWidth);
  }

  render() {

    if(this.props.data.loading){
      //DISPLAY LOADING STATE
      return (<div>Loading</div>)
    }
    if(this.props.data.user){
      return(
        <div>
          <Header
            logout={this._logout}
          />
          {this.renderLoggedIn()}
        </div>

      );
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
