/*Dependencies*/
import React, {Component} from 'react';
import { graphql, gql, compose } from 'react-apollo'
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
      console.log('BACK IN DELETE')
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
          <ListHead/>
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
  (withRouter(ConvoListView)))));
