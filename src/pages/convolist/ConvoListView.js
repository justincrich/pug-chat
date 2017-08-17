/*Dependencies*/
import React, {Component} from 'react';
import { graphql, gql, compose } from 'react-apollo'
//import gql from 'graphql-tag'
import { withRouter } from 'react-router'

/*Components*/
import Header from '../../components/header/component.js';
import ConvoList from '../../components/convolist/component.js';

//styling
import './home.css';

const id = 'cj5k8rs789xd601342etbtitk';

class ConvoListView extends Component{
  static propTypes = {
    data: React.PropTypes.object
    // router: React.PropTypes.object.isRequired,
  }
  constructor(props){
    super(props);
    this.state={
      conversations:[]
    }
    this.refreshConvos.bind(this);
  }

  refreshConvos(){

  }

  componentWillMount(){
     this.props.getConvos.refetch({variables:{"userID":this.props.userID}}).then(
       resp =>{
         this.setState({
           conversations:resp.data.allConversations
         });
       }
     );
  }

  render(){
    return(

      <div className="body">
        <Header status='search' />
        <ConvoList conversations={this.state.conversations}/>

      </div>
    )
  }
}

const UserQuery = gql`
  query {
    user {
      id
      name
    }
  }
`

const getConvos = gql`
  query ($userID:ID!){
    allConversations{
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
`

// const userQuery = gql`
//   query {
//     user {
//       name
//       id
//       imageUrl
      // conversations{
      //   id
      //   users{
      //     id
      //     name
      //     imageUrl
      //   }
      //   messages(last:1){
      //     text
      //     createdAt
      //     id
      //   }
      // }
//     }
//   }
// `;


// export default graphql(QuerySpeaker, {
//   options: (props) => ({ variables: { url: props.match.params.speakerUrl } })
// })( SpeakerPage );

export default graphql(getConvos,{name:'getConvos'})
  (withRouter(ConvoListView));
