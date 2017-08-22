/*Dependencies*/
import React, {Component} from 'react';

/*Components*/
import ListItem from './listitem/component.js';
/*Styling*/
import "./styling.css";


class ConvoList extends Component{
  constructor(props){
    super(props);
    this.state={
      list: []
    }
    this.listConvos.bind(this);
  }
  //process conversations for diplay
  listConvos(data){
    return data.map((convo,index)=>{

      return (
        <ListItem
          key={convo.id}
          message={convo.messages[0]}
          users={convo.users}
          convo={convo}
          />
      );
    });
  }

  //update list of convos whenever we get a new list in props
  componentWillMount(){
    let convoArr = this.props.conversations;
    if(convoArr.length>0){
      this.setState({
        list: this.listConvos(convoArr)
      })
    }
  }

  render(){
    return(
      <ul className="convoUL">
        {this.state.list.length>0?
          this.state.list
        :
          <div></div>
        }
      </ul>
    )
  }
}

export default ConvoList;
