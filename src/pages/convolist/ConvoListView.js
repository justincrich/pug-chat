import React, {Component} from 'react';
import Header from '../../components/header/component.js';
import ConvoList from '../../components/convolist/component.js';
//styling
import './home.css';
class ConvoListView extends Component{
  render(){
    return(
      <div className="body">
        <Header status='search'/>
        <ConvoList/>
      </div>
    )
  }
}


export default ConvoListView;
