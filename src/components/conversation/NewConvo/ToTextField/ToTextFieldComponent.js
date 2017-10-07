/*Dependencies*/
import React, {Component} from 'react';

/*Components*/
import ContactToken from "../ContactToken/ContactTokenComponent.js"

/*Styling*/
import "./styling.css";

class ToTextField extends Component{
  constructor(props){
    super(props);
  }
  componentWillReceiveProps(nextProps){
    if(nextProps.recipients.length>0){
      //create tokens for each name in list
    }
  }

  render(){
    return(
      <div className='messageToTextFieldContainer'>
        <div className='toTextFieldLabel'>To:</div>
        <div className='toTextFieldContainer'>
          {
            (Object.values(this.props.recipients)).map(person=>(
              <ContactToken
                email={person.email}
                id={person.id}
                name={person.name}
                exists={person.exists}
                clearContactToken={this.props.clearContactToken}

              />
            ))
          }
          <input
            type="text"
            placeholder={
              (Object.keys(this.props.recipients)).length === 0 ?
              "Type the email of a user and press enter."
              :
              ""
            }
            onKeyDown={(e)=>{
              //using on keydown so that the delete command doesn't launch when there's still a value
              if(e.keyCode == 13 || e.keyCode== 9 || e.keyCode==32){
                this.props.setRecipient(e.target.value,e.target);
              }

              if(e.keyCode == 8 && e.target.value===''){
                //only remove last when there's a contact in the field
                let keys = Object.keys(this.props.recipients);
                if(keys.length>0){
                  this.props.clearContactToken(keys[keys.length-1]);
                }

              }
            }}
            ></input>
        </div>
      </div>
    )
  }
}


export default ToTextField;
