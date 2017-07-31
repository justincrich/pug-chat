import React, {Component} from 'react';
import Header from '../../components/header/component.js';
import ConvoList from '../../components/convolist/component.js';
import { graphql } from 'react-apollo'
import gql from 'graphql-tag'
import { withRouter } from 'react-router'

//styling
import './home.css';

const id = 'cj5k8rs789xd601342etbtitk';

class ConvoListView extends Component{
  static propTypes = {
    data: React.PropTypes.shape({
      loading: React.PropTypes.bool,
      error: React.PropTypes.object,
      User: React.PropTypes.object
    }).isRequired,
    router: React.PropTypes.object.isRequired,
  }

  render(){

    if (this.props.data.loading) {
      return (<div>Loading</div>)
    }

    if (this.props.data.error) {
      console.log(this.props.data.error)
      return (<div>An unexpected error occured</div>)
    }

    if(!this.props.data.loading){
      console.log(this.props.data);
      const user = {
        name: this.props.data.User.name,
        image: this.props.data.User.imageUrl,
      };
      return(
        <div className="body">
          <Header status='search' user={user}/>
          <ConvoList conversations={this.props.data.User.conversations}/>
        </div>
      )
    }
  }
}

const ConvoQuery = gql`query ConvoQuery($id:ID!, $last:Int!){
  User(id:$id){
    name
    id
    imageUrl
    conversations{
      id
      users(filter:{id_not:$id}){
        id
        name
        imageUrl
      }
      messages(last:$last filter:{user:{id_not:$id}}){
        text
      }
    }
    }
}`;

const ConvoListViewWithData = graphql(ConvoQuery,{
  options:(ownProps)=>({
    variables:{
      id:"cj5k8rs789xd601342etbtitk",
      last:1
    },
  })
})(withRouter(ConvoListView))

export default ConvoListViewWithData;
