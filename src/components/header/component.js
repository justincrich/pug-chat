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
      searching:'icon',
      searchingField:'none',
      settings:'icon',
      newMsg:'icon',
      newMsgField:'none',
      windowWidth:350
    }

    this.searchType.bind(this);
    this.getListNav.bind(this);
    this.getConvoNav.bind(this);

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
  componentWillReceiveProps(nextProps){


  }
  getListNav(){
    return(
      <div className='menuSelectionHolderBox'>
          <div className='navSearch input-group'>
            <i className="inputLabel fa fa-search input-group-addon" aria-hidden="true"></i>
            <input id="navSearch" className="form-control mr-sm-2" type="text"/>
          </div>
          <i className="fa-2x fa fa-pencil-square-o newConvo"
            aria-hidden="true"
            onClick={this.props.newConvo}
            ></i>
      </div>
    )
  }
  getConvoNav(){
    let imgUrl = '';
    let name = '';
    this.props.user.conversations.forEach(item=>{
      if(item.id === this.props.convo){
        for(let i in item.users){
          if(i.id != this.props.user.id){
            imgUrl = i.imageUrl;
            name = i.name;
          }
        }
      }
    })

    return (
      <div className='convoSectionHolderBox'>
        {window.innerWidth<767 &&
          <Link className='backNav' to={"/"}>
              <i className="fa fa-chevron-left backIcon" aria-hidden="true"></i>
              <div className="backText">Home</div>
          </Link>
        }
        <div className="convoNav">
          {
            this.props.path!='/' &&
            <div id='peopleNav' className="peopleNav">
              <div className="peopleImg">
                <img
                  src={imgUrl}
                  ></img>
              </div>
              <div className="peopleName">
                {name}
              </div>
            </div>
          }
        </div>
      </div>
    )
  }

  render(){
    console.log('headernav',this.props)
    return(

      <nav className="navbar navbar-dark bg-faded fixed-top">
        {/* Show menu for listview when small window and ext is / */}
        {((this.props.path === '/') && window.innerWidth <= 768 ) &&
          this.getListNav()
        }
        {/* Show convo menu for convo when small window and ext is / */}
        {((this.props.path != '/') && window.innerWidth <= 768 ) &&
          this.getConvoNav()
        }
        {(window.innerWidth > 768 ) &&
            this.getListNav()
        }
        {(window.innerWidth > 768 ) &&
            this.getConvoNav()
        }
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
