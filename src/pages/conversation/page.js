/*Dependencies*/
import React, {Component} from 'react';
import './styling.css';
import { withApollo, graphql, gql } from 'react-apollo';
import { withRouter } from 'react-router';
/*Components*/
import Conversation from '../../components/conversation/component.js';
import TextField from '../../components/conversation/TextField/component.js';
import ConvoHead from '../../components/header/ConvoHead/ConvoHead.js';
/*Data*/
// const convo = {
//   date:"10:46 PM",
//   id:1111,
//   messages:[
//     {
//       text:"Helo",
//       user:{
//         name:"Athena Bringhurst",
//         id:1
//       }
//     },
//     {
//       text:"I Love You",
//       user:{
//         name:"Justin Rich",
//         id:2
//       }
//     },
//     {
//       text:"You're my love",
//       user:{
//         name:"Athena Bringhurst",
//         id:3
//       }
//     },
//     {
//       text:"You're my love",
//       user:{
//         name:"Athena Bringhurst",
//         id:3
//       }
//     },
//     {
//       text:"You're my love",
//       user:{
//         name:"Athena Bringhurst",
//         id:3
//       }
//     },
//     {
//       text:"You're my love",
//       user:{
//         name:"Athena Bringhurst",
//         id:3
//       }
//     }
//   ],
//   users:[
//     {
//       name:"Athena Bringhurst",
//       id:1,
//       img:"https://scontent-sjc2-1.xx.fbcdn.net/v/t1.0-9/12036376_10206616766792024_2376180338732214314_n.jpg?oh=b7d147ec08172ed0bad19d08eddce7fe&oe=5A0230BD"
//     },
//     {
//       name:"Justin Rich",
//       id:2,
//       img:"https://scontent-lax3-2.xx.fbcdn.net/v/t1.0-9/14718805_10102886022829089_1236249216051883866_n.jpg?oh=81eabce7bb9fa19753259cbb2f7540c4&oe=5A04DD64"
//     }
//   ]
// };

class ConversationView extends Component{
  static propTypes = {
    data: React.PropTypes.object.isRequired,
    router: React.PropTypes.object.isRequired,
  }
  constructor(props){
    super(props);
    this.state={
    }
    this.createConvo = this.createConvo.bind(this);
  }
  // componentDidMount(){
  //   console.log('did mount',this.props);
  // }

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
          </div>)
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
