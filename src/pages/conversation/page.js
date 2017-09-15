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

/* GraphQL Operations */
const getConversations = gql`
  query getConversations($convoID:ID!){
    Conversation(id:$convoID){
      __typename
      id
      users{
        name
        id
        imageUrl
      }
      messages{
        id
        createdAt
        text
        user{
          id
          name
          imageUrl
        }
      }
    }
    user{
      id
    }
  }
`

const createMsg = gql`
mutation createMsg(
  $text:String!,
  $userID:ID!,
  $convoID:ID!
  ){
    createMessage(
      text:$text,
      userId:$userID,
      conversationId:$convoID){
      id
      text
      createdAt
      user{
        name
        imageUrl
      }
    }
  }
`

const newMsgSubscription = gql`
  subscription newMsgSubscription($convoID:ID!){
    Message(filter:{
      mutation_in:[CREATED],
      node:{
        conversation:{
          id:$convoID
        }
      }
    }){
      node{
        id
        text
        user{
          name
          imageUrl
          updatedAt
        }
      }
    }
  }
`


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
    if (!newProps.getConversations.loading) {
      if (this.unsubscribe) {
        if (newProps.getConversations.feed !== this.props.getConversations.feed) {
          // if the feed has changed, we need to unsubscribe before resubscribing
          this.unsubscribe();
        } else {
          // we already have an active subscription with the right params
          return;
        }
      }

      this.unsubscribe = newProps.getConversations.subscribeToMore({
        document: newMsgSubscription,
        variables: {convoID:this.props.match.params.convoId},
        updateQuery: (previousResult, { subscriptionData }) => {
          //('UPDATEEE ',subscriptionData,previousResult);

          this.props.getConversations.refetch();

          return previousResult;
        },
        onError: (err) => console.error(err),
      });
    }
  }

  render(){
    console.log('new msg',this.props)
    if(this.props.getConversations.loading){
        return(<div></div>)
      }else if(this.props.getConversations.Conversation){
        return(
          <div className='convoPageContainer'>
            <ConvoHead users={
              this.props.getConversations.Conversation.users.filter(user=>{

                return user.id != this.props.getConversations.user.id;
              })
            }/>
            <Conversation userID = {this.props.match.params.userId} conversation = {this.props.getConversations.Conversation}/>
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
        "getConversations"
      ]
    }
  })
(graphql(getConversations,{
  name:"getConversations",
  options:(gqlProps)=>({variables:{
      convoID:gqlProps.match.params.convoId
    }
  })
})(withRouter(ConversationView))));
