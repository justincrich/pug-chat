import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import './normalize.css';
import App from './App';
import registerServiceWorker from './registerServiceWorker';
import ApolloClient, { createNetworkInterface } from 'apollo-client'
import { ApolloProvider } from 'react-apollo'

//Apollo client handles both state and data for this app
const client = new ApolloClient({
  networkInterface: createNetworkInterface({uri:'https://api.graph.cool/simple/v1/cj5k4zlmleo0p012250pwriwc'}),
  dataIdFromObject: o => o.id
})

ReactDOM.render((
  <ApolloProvider client={client}>
    <App/>
  </ApolloProvider>
), document.getElementById('root'));
registerServiceWorker();
