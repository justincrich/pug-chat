/*Dependencies*/
import React from 'react';

/*Styling*/
import "./styling.css";

function ToastNotification(props){
  return(
    <div className='toast--body'>
      <div className='toast--text'>
        {props.message}
      </div>
    </div>
  );
}

export default ToastNotification;
