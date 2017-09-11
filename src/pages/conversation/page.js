/*Dependencies*/
import React, {Component} from 'react';
import './styling.css';
import { withApollo, graphql, gql } from 'react-apollo';
import { withRouter } from 'react-router';
/*Components*/
import Conversation from '../../components/conversation/component.js';
import TextField from '../../components/conversation/TextField/component.js';
import ConvoHead from '../../components/header/ConvoHead/ConvoHead.js';
import ToastNotification from '../../components/ToastNotification/ToastNotificationComponent.js';

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
  // componentDidMount(){
  //   console.log('did mount',this.props);
  // }

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

  createConvo(){
    console.log('submit')
  }

  render(){
    console.log(this.props.data)
    if(this.props.data.loading){
        return(<div></div>)
      }else if(this.props.data.Conversation){
        return(
          <div className='convoPageContainer'>
            <ConvoHead users={
              this.props.data.Conversation.users.filter(user=>{

                return user.id != this.props.data.user.id;
              })
            }/>
            <Conversation userID = {this.props.match.params.userId} conversation = {this.props.data.Conversation}/>
            <TextField submit={this.createConvo}/>
            {this.state.notificationVisible &&
              <ToastNotification message={this.state.notificationMessage}/>
            }
          </div>
        )
      }
    }

}

const getConversations = gql`
  query($convoID:ID!){
    Conversation(id:$convoID){
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

// export default ConversationView;
export default graphql(getConversations,{
  options:(gqlProps)=>{
    return (
      {variables:{
          convoID:gqlProps.match.params.convoId
        }
      }
    )

}})(withRouter(ConversationView));
