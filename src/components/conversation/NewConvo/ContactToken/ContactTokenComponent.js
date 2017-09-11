/*Dependencies*/
import React from 'react';

/*Styling*/
import "./styling.css";

function ContactToken(props){
  return(
    // <div className={
    //   this.props.contact.exists?
    //   'contactTokenContainer'
    //   :
    //   'contactTokenContainer ContactToken_ERROR'
    // }>
    <div id={
      props.id
    }
    className={
      props.exists?
       'contactTokenContainer'
       :
       'contactTokenContainer ContactToken_ERROR'
    }>
      {
        props.name ?
        props.name
        :
        props.email
      }
      <i
        className="fa fa-times"
        aria-hidden="true"
        onClick={()=>props.clearContactToken(props.id)}
        ></i>
    </div>
  );
}

export default ContactToken;
