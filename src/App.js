import React, { Component } from 'react';
import {
  BrowserRouter,
  Route,
  Switch,
  Redirect
} from 'react-router-dom';
import ConvoListViewWithData from './pages/convolist/ConvoListView.js';
import ConversationView from './pages/conversation/page.js';

class Routes extends Component {
  render() {
    return (
      <BrowserRouter>
        <Switch>
          <Route name='home' exact path="/" component={ConvoListViewWithData}/>
          <Route name='convo' path="/convo/:convoId/:senderId" component={ConversationView}/>
        </Switch>
      </BrowserRouter>
    );
  }
}

export default Routes;
