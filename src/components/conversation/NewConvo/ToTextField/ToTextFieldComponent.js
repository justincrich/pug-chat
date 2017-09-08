/*Dependencies*/
import React, {Component} from 'react';

/*Components*/
import ContactToken from "../ContactToken/ContactTokenComponent.js"

/*Styling*/
import "./styling.css";

class ToTextField extends Component{
  componentWillReceiveProps(nextProps){
    if(nextProps.recipients.length>0){
      //create tokens for each name in list
    }
  }
  render(){
    console.log('recip length',this.props.recipients)
    return(
      <div className='messageToTextFieldContainer'>
        <div className='toTextFieldLabel'>To:</div>
        <div className='toTextFieldContactToken'>
          {
            this.props.recipients.map(person=>(
              <ContactToken
                email={person.email}
                id={person.id}
                name={person.name}
                exists={person.exists}
                clearContactToken={this.props.clearContactToken}

              />
            ))
          }
        </div>
        <input
          type="text"
          placeholder={
            this.props.recipients.length === 0 ?
            "Type the email of a user and press enter."
            :
            ""
          }
          onKeyUp={(e)=>{
            if(e.keyCode === 13){
              this.props.setRecipient(e.target.value);
              e.target.blur();
            }
          }}
          ></input>
      </div>
    )
  }
}


export default ToTextField;
