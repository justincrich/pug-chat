import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import './normalize.css';

import registerServiceWorker from './registerServiceWorker';
import ApolloClient, { createNetworkInterface } from 'apollo-client'
import { ApolloProvider } from 'react-apollo';
import {
  BrowserRouter,
  Route,
  Switch,
  Redirect
} from 'react-router-dom';
/*PAGES*/
import App from './App';
import ConvoListViewWithData from './pages/convolist/ConvoListView.js';
import ConversationView from './pages/conversation/page.js';
import LoginView from './pages/login/page.js';
import SignupView from './pages/signup/page.js';

//setup authentication
const networkInterface = createNetworkInterface({uri:'https://api.graph.cool/simple/v1/cj64bcbxh8vda0153u98etj4i'})

networkInterface.use([{
  applyMiddleware (req, next) {
    if (!req.options.headers) {
      req.options.headers = {}
    }

    // get the authentication token from local storage if it exists
    if (localStorage.getItem('graphcoolToken')) {
      req.options.headers.authorization = `Bearer ${localStorage.getItem('graphcoolToken')}`
    }
    next()
  },
}])

//Apollo client handles both state and data for this app
const client = new ApolloClient({
  networkInterface: networkInterface,
  dataIdFromObject: o => o.id
})

ReactDOM.render((
  <ApolloProvider client={client}>
    <BrowserRouter>
      <Switch>
        <Route path='/' component={App} />
        <Route name='home' exact path="/" component={ConvoListViewWithData}/>
        <Route name='convo' path="/convo/:convoId/:senderId" component={ConversationView}/>
      </Switch>
    </BrowserRouter>
  </ApolloProvider>
), document.getElementById('root'));
registerServiceWorker();
