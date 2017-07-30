import React, { Component } from 'react';
import {
  BrowserRouter,
  Route,
  Switch,
  Redirect
} from 'react-router-dom';
import ConvoListView from './pages/convolist/ConvoListView';
import ConversationView from './pages/conversation/page.js';
class Routes extends Component {
  render() {
    return (
      <BrowserRouter>
        <Switch>
          <Route name='home' exact path="/" component={ConvoListView}/>
          <Route name='convo' path="/convo/:convoId/:senderId" component={ConversationView}/>
        </Switch>
      </BrowserRouter>
    );
  }
}

export default Routes;
