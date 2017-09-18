/*Dependencies*/
import React, {Component} from 'react';
import { graphql, gql, compose, withApollo } from 'react-apollo'
//import gql from 'graphql-tag'
import { withRouter, Redirect } from 'react-router'
import {convoCleaner} from '../../components/tools/cleaner.js';

/*Components*/
import ListHead from '../../components/header/ListHead/ListHead.js';
import ConvoList from '../../components/convolist/component.js';

/*Queries*/
import { getConvos, getAllConvoMsgs } from '../../GQL/queries.js';

/*Mutation*/
import { deleteConversation, deleteMessage } from '../../GQL/mutations.js';

/*SUBSCRIPTIONS*/
import { newMessageSubscriptions } from '../../GQL/subscriptions.js';

//styling
import './styling.css';


export class ConvoListView extends Component{
  static propTypes = {
    data: React.PropTypes.shape({
      user: React.PropTypes.object,
    }).isRequired
    // router: React.PropTypes.object.isRequired,
  }

  constructor(props){
    super(props);
    this.state={
      headerType:'convoList'
    }
    this.deleteConvo = this.deleteConvo.bind(this);

  }





  componentWillReceiveProps(newProps) {
    if (!newProps.data.loading) {
      if (this.unsubscribe) {
        if (newProps.data.feed !== this.props.data.feed) {
          // if the feed has changed, we need to unsubscribe before resubscribing
          this.unsubscribe();
        } else {
          // we already have an active subscription with the right params
          return;
        }
      }

      this.unsubscribe = newProps.data.subscribeToMore({
        document: newMessageSubscriptions,
        variables: {userID:this.props.userID},
        // this is where the magic happens.
        updateQuery: (previousResult, { subscriptionData }) => {
          //('UPDATEEE ',subscriptionData,previousResult);

          this.props.data.refetch();

          return previousResult;
        },
        onError: (err) => console.error(err),
      });
    }
  }

  findUser(term){
    this.props.findUser({variables:{
      emailterm:term,
      nameterm:term
    }})
  }

  deleteConvo(convo){
    convoCleaner(
      convo,
      this.props.getAllConvoMsgs,
      this.props.deleteMessage,
      this.props.deleteConversation).then(() => {
      this.props.data.refetch();
      this.props.history.push('/');
    });
  }



  render(){
    if(this.props.data.loading){
      return(<div></div>)
    }else{

      return (
        <div className='convoListContainerHolder'>
          <ListHead newConvo = {this.props.newConvo}/>
          <ConvoList
            conversations={this.props.data.user.conversations}
            userID={this.props.userID}
            deleteConvo={this.deleteConvo}
          />
        </div>
      )
    }
  }





}




const ConvoListViewWrapper = graphql(deleteConversation,{name:'deleteConversation'})
(graphql(deleteMessage,{name:'deleteMessage'})
(graphql(getAllConvoMsgs,{
  name:'getAllConvoMsgs',
  options: { variables: { conversation: '' } },
})
  (graphql(getConvos,{
    options:(props)=>({
      variables:{
        userID:props.userID
    }
  })})
  (withApollo(withRouter(ConvoListView))))));

export default ConvoListViewWrapper;
