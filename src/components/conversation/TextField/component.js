/*Dependencies*/
import React, {Component} from 'react';
/*Styling*/
import "./styling.css";

class TextField extends Component{
  constructor(props){
    super(props);
    this.state={
      message:''
    }

  }
  render(){
    return(
      <div className='messageTextFieldContainer'>
        <input
          id='messageTextField'
          type="text"
          placeholder="Type a message..."
          onChange={(e)=>{

            this.setState({
              message:e.target.value
            });

          }}
          onKeyUp={(e)=>{
            if(e.keyCode === 13){
              this.props.submit(e.target.value);
              document.getElementById('messageTextField').value = '';
              e.target.blur();
            }
          }}
          ></input>
        <a
          className="messageTextFieldSubmit"
          href="#"
          onClick={()=>{
            this.props.submit(this.state.message);
            document.getElementById('messageTextField').value = '';
          }}
          >
          Submit
        </a>
      </div>
    )
  }
}


export default TextField;
