/*Dependencies*/
import React, {Component} from 'react';
import './styling.css';
import { withApollo, graphql, gql } from 'react-apollo';
import { withRouter } from 'react-router';
import update from 'immutability-helper';
/*Components*/
import Conversation from '../../components/conversation/component.js';
import TextField from '../../components/conversation/TextField/component.js';
import ConvoHead from '../../components/header/ConvoHead/ConvoHead.js';
import ToastNotification from '../../components/ToastNotification/ToastNotificationComponent.js';

/*Queries*/
import { getSingleConversation } from '../../GQL/queries.js';

/*Mutation*/
import { createMsg } from '../../GQL/mutations.js';

/*SUBSCRIPTIONS*/
import { newMsgSubscription } from '../../GQL/subscriptions.js';


class ConversationView extends Component{
  static propTypes = {
    data: React.PropTypes.object.isRequired,
    router: React.PropTypes.object.isRequired,
  }
  constructor(props){
    super(props);
    this.state={
      notificationMessage:'',
      notificationVisible:false
    }

    this.showNotification = this.showNotification.bind(this);
    this.createConvo = this.createConvo.bind(this);
  }


  showNotification(message){
    this.setState({
      notificationMessage:message,
      notificationVisible:true
    });
    setTimeout(()=>{
      this.setState({
        notificationVisible:false
      })
    },5000)
  }

  createConvo(text){

    this.props.createMsg({
      variables:{
        text:text,
        userID:this.props.match.params.userId,
        convoID:this.props.match.params.convoId
      }
    }).then(res=>{

    })
  }

  componentWillReceiveProps(newProps) {
    if (!newProps.getSingleConversation.loading) {
      if (this.unsubscribe) {
        if (newProps.getSingleConversation.feed !== this.props.getSingleConversation.feed) {
          // if the feed has changed, we need to unsubscribe before resubscribing
          this.unsubscribe();
        } else {
          // we already have an active subscription with the right params
          return;
        }
      }

      this.unsubscribe = newProps.getSingleConversation.subscribeToMore({
        document: newMsgSubscription,
        variables: {convoID:this.props.match.params.convoId},
        updateQuery: (previousResult, { subscriptionData }) => {
          //('UPDATEEE ',subscriptionData,previousResult);

          this.props.getSingleConversation.refetch();

          return previousResult;
        },
        onError: (err) => console.error(err),
      });
    }
  }

  render(){
    console.log('new msg',this.props)
    if(this.props.getSingleConversation.loading){
        return(<div></div>)
      }else if(this.props.getSingleConversation.Conversation){
        return(
          <div className='convoPageContainer'>
            <ConvoHead users={
              this.props.getSingleConversation.Conversation.users.filter(user=>{

                return user.id != this.props.getSingleConversation.user.id;
              })
            }/>
            <Conversation userID = {this.props.match.params.userId} conversation = {this.props.getSingleConversation.Conversation}/>
            <TextField submit={this.createConvo}/>
            {this.state.notificationVisible &&
              <ToastNotification message={this.state.notificationMessage}/>
            }
          </div>
        )
      }
    }

}

// export default ConversationView;
export default withApollo(
  graphql(createMsg,{
    name:"createMsg",
    options:{
      refetchQueries:[
        "getSingleConversation"
      ]
    }
  })
(graphql(getSingleConversation,{
  name:"getSingleConversation",
  options:(gqlProps)=>({variables:{
      convoID:gqlProps.match.params.convoId
    }
  })
})(withRouter(ConversationView))));
