/*Dependencies*/
import React, {Component} from 'react';
import {
  Navbar,
  FormGroup,
  FormControl
} from 'react-bootstrap';
import { Link } from 'react-router-dom'

//styling
import './styling.css';


class Header extends Component{
  constructor(props){
    super(props);
    this.state={
      searching:false,
      settings:false
    }
    this.type.bind(this);
    this.searchType.bind(this);
  }
  searchType(e){
    //enter key pressed
    if(e.key == 'Enter'){
      console.log('enter key pressed');
      this.setState({
        searching:false
      });
    }
  }
  type(test){
    switch(test){
      case 'convoList':{
        return (
          <nav className="ulNav navbar navbar-dark bg-faded fixed-top">
            <div className='menuSelectionHolderBox'>
              <i className="fa-2x fa fa-pencil-square-o newConvo"
                aria-hidden="true"
                onClick={()=>{
                  this.props.newConvo();
                }}
                ></i>
              <div className="settingsSelectionHolderBox">
                <div className="navbarSearchBtn" onClick={()=>this.setState({searching:true})}>
                  <i className="fa fa-2x fa-search" aria-hidden="true"></i>
                </div>
                <div className='navBarSettingsContainer'>
                  <a className="headerLogOut" href="#" onClick={this.props.logout}>
                    <i className="fa fa-2x fa-sign-out" aria-hidden="true"></i>
                  </a>
                </div>
              </div>
            </div>
          </nav>
      );
      }
      break;
      case 'newConvo':{
        return(
          <div>
            <div>
              <div>To:</div>
              <input className='newConvoHeaderInput'/>
            </div>
            <i className="fa fa-lg fa-times closeNewConvoHeader" aria-hidden="true"></i>
          </div>
        )
      }
      break;
      case 'convo':{
        return(
          <nav className="ulNav navbar navbar-dark bg-faded fixed-top">

          </nav>
        )
      }
      break;
      default:{
        <nav className="ulNav navbar navbar-dark bg-faded fixed-top">

        </nav>
      }

    }
  }
  render(){
    return(

      <nav className="navbar navbar-dark bg-faded fixed-top">
        <div className='menuSelectionHolderBox'>
          <i className="fa-2x fa fa-pencil-square-o newConvo"
            aria-hidden="true"
            onClick={()=>{
              this.props.newConvo();
            }}
            ></i>
            <div className="navbarSearchBtn" onClick={()=>this.setState({searching:true})}>
              <i className="fa fa-2x fa-search" aria-hidden="true"></i>
            </div>
        </div>
        <div className='convoSectionHolderBox'>
          <div className="convoNav">
            <Link className="backNav" to={"/"}>
              <i className="fa fa-chevron-left backIcon" aria-hidden="true"></i>
              <div className="backText">Home</div>
            </Link>
            <div className="peopleNav">
              <div className="peopleImg">
                <img
                  src="https://scontent-sjc2-1.xx.fbcdn.net/v/t1.0-9/12036376_10206616766792024_2376180338732214314_n.jpg?oh=b7d147ec08172ed0bad19d08eddce7fe&oe=5A0230BD"
                  ></img>
              </div>
              <div className="peopleName">
                Athena
              </div>
            </div>
          </div>
        </div>
        <div className='navBarSettingsContainer'>
          <a className="headerLogOut" href="#" onClick={this.props.logout}>
            <i className="fa fa-2x fa-cog" aria-hidden="true"></i>
          </a>
        </div>
      </nav>

    )

  }
}


export default Header;

{/*

  this.props.status ==='search' ?
  (<div className='navSearch input-group'>
    <i className="fa fa-search input-group-addon" aria-hidden="true"></i>
    <input className="form-control mr-sm-2" type="text"/>

  </div>)
  :
  (
    this.props.status === 'convo' ?
      ("convo")
    :
      "nothin"
  )


   */}

   {/* {this.type(this.props.status)}
   <div className="convoNav">
     <Link className="backNav" to={"/"}>
       <i className="fa fa-chevron-left backIcon" aria-hidden="true"></i>
       <div className="backText">Home</div>
     </Link>
     <div className="peopleNav">
       <div className="peopleImg">
         <img
           src="https://scontent-sjc2-1.xx.fbcdn.net/v/t1.0-9/12036376_10206616766792024_2376180338732214314_n.jpg?oh=b7d147ec08172ed0bad19d08eddce7fe&oe=5A0230BD"
           ></img>
       </div>
       <div className="peopleName">
         Athena
       </div>
     </div>
   </div> */}
