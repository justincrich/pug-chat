/*Dependencies*/
import React, {Component} from 'react';
import { withApollo, graphql, gql } from 'react-apollo';
import { withRouter } from 'react-router';

/*Components*/
import NewConvoHead from '../../components/header/NewConvoHead/ConvoHead.js';
import ToTextField from '../../components/conversation/NewConvo/ToTextField/ToTextFieldComponent.js';
import Conversation from '../../components/conversation/component.js';
import TextField from '../../components/conversation/TextField/component.js';
import ConvoHead from '../../components/header/ConvoHead/ConvoHead.js';
import ContactToken from '../../components/conversation/NewConvo/ContactToken/ContactTokenComponent.js';


/*Styling*/
import './styling.css';

class NewConvo extends Component{
  constructor(props) {
    super(props);
    this.state = {
      recipients:[]
    };
    this.sendNewConvo=this.sendNewConvo.bind(this);
    this.setRecipient=this.setRecipient.bind(this);
    this.fetchToInputField = this.fetchToInputField.bind(this);
    this.clearContactToken = this.clearContactToken.bind(this);
  }
  setRecipient(person){
    //code that sets the recipient for the convo
    this.props.getUserByEml.variables.email = person;
    this.props.getUserByEml.refetch().then(res=>{
      //let userCount = Object.keys(this.state.recipients).length;
      let newPerson;
      console.log(res);
      console.log('prev state',this.state.recipients)
      if(res.data.User){

        //if user found set user ID to be used
        newPerson = {
          ...res.data.User,
          exists:true
        }

      }else{
        //set data to visualize that no user is found
        newPerson = {
          email:person,
          id: Date.now(),
          exists:false
        }

      }
      console.log(newPerson)
      this.setState((prevState) => ({
        recipients: [
          ...prevState.recipients,
          newPerson
        ]
      }))

    })
  }
  sendNewConvo(msg){
    //code that sets the new msg for the convo and invokes send
    console.log('new msg',msg)
  }

  fetchToInputField(){

  }

  clearContactToken(id){
    console.log('test');
  }

  render(){
    return(

      <div className='newConvoPageContainer'>
        <NewConvoHead/>
        <div className='newConvoPageBody'>
          <ToTextField
            recipients={this.state.recipients}
            setRecipient={this.setRecipient}
            clearContactToken = {this.clearContactToken}
          />
          <div className='newConvoMessageTextField'>
            <TextField submit={this.sendNewConvo}/>
          </div>
        </div>
      </div>
    )
  }
}

//graphql(

const createConvo = gql`
  mutation createConvoMsg(
  $recipients:[ID!]){
  createConversation(usersIds:$recipients){
    id
    users{
      name
      email
      imageUrl
    }
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
    }
  }
`
const getUserByEml = gql`
  query getUser($email:String){
    User(email:$email){
      id
      email
      name
    }
  }
`
const searchUsers = gql`
  query searchUsers($term:String){
  allUsers(filter:{OR:[{email_contains:$term},{name_contains:$term}]}){
    id
    name
    email
  }
  }
`

export default graphql(
  createMsg,{name:'createMsg'}
)
(graphql(
  createConvo,{name:'createConvo'})
(graphql(getUserByEml,{name:'getUserByEml'})
(withRouter(NewConvo))));
