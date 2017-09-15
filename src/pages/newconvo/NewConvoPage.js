/*Dependencies*/
import React, {Component} from 'react';
import { withApollo, graphql, gql } from 'react-apollo';
import { withRouter, Redirect } from 'react-router';

/*Components*/
import NewConvoHead from '../../components/header/NewConvoHead/ConvoHead.js';
import ToTextField from '../../components/conversation/NewConvo/ToTextField/ToTextFieldComponent.js';
import Conversation from '../../components/conversation/component.js';
import TextField from '../../components/conversation/TextField/component.js';
import ConvoHead from '../../components/header/ConvoHead/ConvoHead.js';
import ContactToken from '../../components/conversation/NewConvo/ContactToken/ContactTokenComponent.js';
import ToastNotification from '../../components/ToastNotification/ToastNotificationComponent.js';

/*Styling*/
import './styling.css';

class NewConvo extends Component{
  constructor(props) {
    super(props);
    this.state = {
      recipients:{},
      notificationMessage:'',
      notificationVisible:false,
      newConvoID:'',
      redirect:false
    };
    this.sendNewConvo=this.sendNewConvo.bind(this);
    this.setRecipient=this.setRecipient.bind(this);
    this.fetchToInputField = this.fetchToInputField.bind(this);
    this.clearContactToken = this.clearContactToken.bind(this);
    this.showNotification = this.showNotification.bind(this);
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

  setRecipient(person,element){
    //(person,this.props.data.user.email);
    //code that sets the recipient for the convo
    this.props.getUserByEml.variables.email = person;
    let recipNumbers = Object.keys(this.state.recipients);
    if(recipNumbers.length == 0 && person != this.props.data.user.email){
      this.props.getUserByEml.refetch().then(res=>{
        //let userCount = Object.keys(this.state.recipients).length;
        let newPerson;

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
        let newState = this.state.recipients;
        newState[newPerson.id]=newPerson
        this.setState((prevState) => ({
          recipients: newState
        }))
        //clear user input


      })
    }else if(recipNumbers.length > 0){
      console.error(new Error('Error: Multi user chat not supported'));
      this.showNotification('Only one recipient per conversation is supported.')
    }else if(person === this.props.data.user.email){
      console.error(new Error('Error: You cannot send a message to yourself.'))
      this.showNotification('You cannot send a message to yourself.')
    }

    element.value='';
  }

  sendNewConvo(msg){

    let allValid = true;
    let index = 0;
    let vals = Object.values(this.state.recipients);
    let recipients = [];
    //check if a valid user is entered
    while (index<vals.length && allValid == true){
      let person = vals[index];
      person.exists == false? allValid=false : allValid=true;
      //ad ID to recipient array to be used in creating convo
      recipients.push(person.id);
      index++;
    }

    //Add user's ID to recipient list
    recipients.push(this.props.data.user.id);


    if(allValid && msg!=''){
      //Create new conversation with entered contacts
      this.props.createConvo({variables:{recipients:recipients}}).then(res=>{
        let convoID = res.data.createConversation.id;
        this.setState({
          newConvoID:convoID
        });
        if(convoID){
          //if convo is created correctly continue on
          return this.props.createMsg(
            {
              variables:
              {
                text:msg,
                userID:this.props.data.user.id,
                convoID:convoID
              }
            }
          );
        }else{
          //throw an error message
          return new Error('Conversation could not be created, please try again');
        }
      }).then(res=>{
        this.setState({
          redirect:true
        });
      }).catch(error=>{
        console.error(error);
        this.showNotification(error.message);
      });

    }else if(msg === ''){
      //throw error if message is blank
      console.error(new Error('Message cannot be empty'));
      this.showNotification('Message cannot be empty');
    }else if(!allValid){
      //throw err notification if user is invalid
      console.error(new Error('Invalid recipient(s), must be a registered user with PugChat'));
      this.showNotification('Invalid recipient, user must be registered with PugChat');
    }


  }

  fetchToInputField(){

  }

  clearContactToken(id){
    //removes contact from state
    //('test',id);
    let newState = this.state.recipients;
    delete newState[id];
    this.setState({
      recipients:newState
    })
  }

  render(){
    if(this.state.redirect == false){
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
          {this.state.notificationVisible &&
            <ToastNotification message={this.state.notificationMessage}/>
          }
        </div>
      )
    }else{
      return(
        <Redirect push to={`/${this.props.data.user.id}/convo/${this.state.newConvoID}`}/>
      )
    }
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
const userQuery = gql`
  query {
    user {
      id
      name
      email
      imageUrl
    }
  }
`

export default graphql(
  createMsg,{name:'createMsg'}
)
(graphql(
  createConvo,{name:'createConvo'})
(graphql(getUserByEml,{name:'getUserByEml'})
(graphql(userQuery)
  (withRouter(NewConvo)))));
