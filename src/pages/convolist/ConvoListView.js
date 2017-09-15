/*Dependencies*/
import React, {Component} from 'react';
import { graphql, gql, compose, withApollo } from 'react-apollo'
//import gql from 'graphql-tag'
import { withRouter, Redirect } from 'react-router'
import {convoCleaner} from '../../components/tools/cleaner.js';

/*Components*/
import ListHead from '../../components/header/ListHead/ListHead.js';
import ConvoList from '../../components/convolist/component.js';

//styling
import './styling.css';


class ConvoListView extends Component{
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
    this.subscribeToNewConversations = this.subscribeToNewConversations.bind(this);

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
        document:   gql`
            subscription($userID:ID!){
                      Message(filter:{
                        mutation_in:[CREATED]
                      }){
                        node{
                          conversation{
                            id
                            users(filter:{
                              id_not:$userID
                            }){
                              id
                              name
                              imageUrl
                            }
                            messages(last:1){
                              text
                              createdAt
                              id
                            }
                          }
                        }
                      }

            }
            `,
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
    //(this.props)
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



  subscribeToNewConversations (){
    this.props.getConvos.subscribeToMore({
      document:gql`
          subscription{
            Conversation(filter:{
              mutation_in:[CREATED]
            }){
              node{
                id

              }
            }
          }
        `
      ,
      updateQuery:(previousState,{subscriptionData})=>{
        //('data subscription',subscriptionData)
      }
    })
  }

}



const getConvos = gql`
  query ($userID:ID!){
    user{
      id
      name
      conversations{
        id
        users(filter:{
          id_not:$userID
        }){
          id
          name
          imageUrl
        }
        messages(last:1){
          text
          createdAt
          id
        }
      }
    }
  }
`

const getAllConvoMsgs = gql`
  query ($conversation:ID!){
    Conversation(id:$conversation){
      id
      messages{
        id
      }
    }
  }
`

const deleteMessage = gql`
  mutation deleteMessage($message:ID!){
    deleteMessage(id:$message){
      id
    }
  }
`;

const deleteConversation= gql`
  mutation deleteConversation($conversation:ID!){
    deleteConversation(id:$conversation){
      id
    }
  }
`;

// const convoSubscription = gql`
//
// `;



export default graphql(deleteConversation,{name:'deleteConversation'})
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
