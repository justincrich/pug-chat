/*Dependencies*/
import React, {Component} from 'react';

/*Components*/
import ListItem from './listitem/component.js';
/*Styling*/
import "./styling.css";

// let convos = [
//   {
//     author:"Athena Bringhurst",
//     img:"https://scontent-sjc2-1.xx.fbcdn.net/v/t1.0-9/12036376_10206616766792024_2376180338732214314_n.jpg?oh=b7d147ec08172ed0bad19d08eddce7fe&oe=5A0230BD",
//     text:"I Love You! Please bring home bacon.",
//     date:"10:46 PM",
//     id:1111,
//     users:[
//       {
//         name:"Athena Bringhurst",
//         id:1
//       },
//       {
//         name:"Justin Rich",
//         id:2
//       }
//     ]
//   },
//   {
//     author:"Brenden Rich",
//     img:"https://scontent-lax3-2.xx.fbcdn.net/v/t1.0-9/11246479_10205372353243199_505620876714966596_n.jpg?oh=cb43687200367109a6dc0ecac1c07957&oe=59F149D9",
//     text:"Brother!!!!!",
//     date:"1:46 PM",
//     id:1112,
//     users:[
//       {
//         name:"Athena Bringhurst",
//         id:1
//       },
//       {
//         name:"Justin Rich",
//         id:2
//       }
//     ]
//   },
//   {
//     author:"Lydia Morrey",
//     img:"https://scontent-lax3-2.xx.fbcdn.net/v/t1.0-9/19424345_10155712350136062_1160677564514209114_n.jpg?oh=0767c3586bf8fe772efa947d62ee0d98&oe=59EAA814",
//     text:"Enzo!",
//     date:"3:46 PM",
//     id:1113,
//     users:[
//       {
//         name:"Athena Bringhurst",
//         id:1
//       },
//       {
//         name:"Justin Rich",
//         id:2
//       }
//     ]
//   }
// ];

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
          />
      );
    });
  }

  //update list of convos whenever we get a new list in props
  componentWillMount(){
    let convoArr = this.props.conversations;
    console.log('convoArr',convoArr)
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
