/*Dependencies*/
import React, {Component} from 'react';
/*Components*/
import ListItem from './listitem/component.js';
/*Styling*/
import "./styling.css";


export class ConvoList extends Component{
  constructor(props){
    super(props);
    this.state={
      list: []
    }
    this.listConvos.bind(this);
  }
  //process conversations for diplay
  listConvos(data){
    let resObj = data.slice();
    //sorting the results so the convo w the newest msg shows first
    resObj.sort((a,b)=>{
      let dateA = new Date(a.messages[0].createdAt);
      let dateB = new Date(b.messages[0].createdAt);
      let resTime = +dateA>+dateB ? -1 : 1;
      return resTime;

    });
    return resObj.map((convo,index)=>{
        return (
          <ListItem
            key={convo.id}
            message={convo.messages[0]}
            users={convo.users}
            convo={convo}
            userID={this.props.userID}
            deleteConvo={this.props.deleteConvo}
            />
        )
    })

  }

  //update list of convos whenever we get a new list in props
  componentWillMount(){
    // console.log('props in comp',this.props);
    // let convoArr = this.props.conversations;
    // if(convoArr.length>0){
    //   this.setState({
    //     list: this.listConvos(convoArr)
    //   })
    // }
  }

  render(){
    return(
      <ul className="convoUL">
        {this.listConvos(this.props.conversations)}
      </ul>
    )
  }
}

export default ConvoList;
