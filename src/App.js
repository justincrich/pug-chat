import React, { Component } from 'react';
import {
  BrowserRouter,
  Route,
  Switch,
  Redirect
} from 'react-router-dom';
import home from './pages/home/home';

class Routes extends Component {
  render() {
    return (
      <BrowserRouter>
        <Route exact path="/" component={home}/>
      </BrowserRouter>
    );
  }
}

export default Routes;
