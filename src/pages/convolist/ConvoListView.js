/*Dependencies*/
import React, {Component} from 'react';
import { graphql, gql, compose } from 'react-apollo'
//import gql from 'graphql-tag'
import { withRouter } from 'react-router'

/*Components*/
import Header from '../../components/header/component.js';
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
      conversations:[],
      headerType:'convoList'
    }
  }


  render(){
    if(this.props.data.loading){
      return(<div></div>)
    }else{
      return (
        <div className='convoListContainerHolder'>
          <ConvoList conversations={this.props.data.user.conversations} userID={this.props.userID}/>
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

export default graphql(getConvos,{
  options:(props)=>({
    variables:{
      userID:props.userID
    }
  })})
  (withRouter(ConvoListView));
