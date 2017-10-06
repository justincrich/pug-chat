/*Dependencies*/
import React, {Component} from 'react';
import {loginValidate} from '../tools/validator.js';
import ReactCSSTransitionGroup from 'react-addons-css-transition-group';
/*Styling*/
import './signupStyling.css';

class Signup extends Component{
  constructor(props) {
    super(props);
    this.state = {
      name:'',
      email:'',
      password:'',
      imageUrl:'',
      imageId:''
    };
    this.exeSignup.bind(this);
    this.uploadImg.bind(this);
  }

  uploadImg(e){
    console.log('upload img',e);
    if(window.File && window.FileReader && window.FileList && window.Blob){
      if (e.files && e.files[0]) {
        //hanle what happens when an image is selected
        let reader = new FileReader();
        let preview = document.getElementById('uploadedProfileImageReg');
        let box = document.getElementById('profileImgBox');
        let img = document.createElement('img');
        let close = document.getElementsByClassName('imgProfileRemove')[0];



        //load event listener for reading the image
        reader.addEventListener("load",()=>{
          img.src = reader.result;
          //clear it out for good measure
          preview.innerHTML = '';
          preview.appendChild(img);
          box.style.display = 'flex';
          preview.classList = preview.classList+" growIn";

        },false);

        //listener for hovering over box
        box.addEventListener('mouseleave',(e)=>{
          close.style.display = 'none';
        });

        box.addEventListener('mouseenter',(e)=>{
          close.style.display = 'flex';
        });

        close.addEventListener('click',(e)=>{
          remove();
        });
        document.getElementById('uploadProfileImgInput')
                .addEventListener('click',(e)=>{

                  remove();
                });

        //read in file
        reader.readAsDataURL(e.files[0]);

        function remove(){
          let fileinput = document.getElementById('uploadProfileImgInput');
          fileinput.value = "";
          preview.innerHTML = '';
          box.style.display = 'none';
        }
      }else{
        //handle the case where no image is selected
      }


    }else{
      alert('File uploading is not supported by your browser.');
    }

    // let imgContainer = doucment.getElementById('uploadedProfileImageReg');

  }

  exeSignup(){
    //reset warnings

    let valid = loginValidate(this.state.email,this.state.password,this.state.name);

    //handle name warnings
    let nameWarning = document.getElementById("registerNameWarning");
    if(valid.email == false){
      nameWarning.style.display='flex';
    }else{
      nameWarning.style.display = 'none';
    }

    //handle email warnings
    let emailWarning = document.getElementById("registerEmailWarning");
    if(valid.email == false){
      emailWarning.style.display='flex';
    }else{
      emailWarning.style.display = 'none';
    }

    //handle password warnings
    let passwordWarning = document.getElementById("registerPasswordWarning");
    if(valid.password == false){
      passwordWarning.style.display='flex';
    }else{
      passwordWarning.style.display = 'none';
    }

    //if email is valid and not empty ... later do and no password error
    if(valid.name && valid.email && valid.password){
      let fileinput = document.getElementById('uploadProfileImgInput');
      this.props.signup(this.state.name, this.state.email,this.state.password,fileinput.files[0])
    }
  }

  //method used to send image to server
  mutateImg(file,id){

  }
  render(){
    let uploadElement = document.getElementById('uploadProfileImgInput');
    return(
      <div className="signupBody card">
        <div className="card-block">
          <div className="signupCardHeader">
            <h5 className="signupContainerHeader">Signup</h5>
          </div>
          <div className="signupCardContentBody">
            <div id="generalSignUpAuthWarning" className="authWarningText"></div>
            <div id="registerNameWarning" className="authWarningText">Please enter your name</div>
            <div className='inputContainer input-group'>
              <span className="input-group-addon" id="sizing-addon1">
                <i className="fa fa-user" aria-hidden="true"></i>
              </span>
              <input type="text" className="form-control" placeholder="Name"
                aria-describedby="sizing-addon1"
                onChange={(e)=>this.setState({name:e.target.value})}
              />
            </div>
            <div id="registerEmailWarning" className="authWarningText">Please enter a valid email</div>
            <div className='inputContainer input-group'>
              <span className="input-group-addon" id="sizing-addon1">@</span>
              <input type="text" className="form-control" placeholder="Email"
                aria-describedby="sizing-addon1"
                onChange={(e)=>this.setState({email:e.target.value})}
              />
            </div>
            <div id="registerPasswordWarning" className="authWarningText">Please enter a password</div>
            <div className='inputContainer input-group'>
              <span className="input-group-addon" id="sizing-addon1">
                <i className="fa fa-unlock-alt" aria-hidden="true"></i>
              </span>
              <input type="text" className="form-control" placeholder="Password"
                aria-describedby="sizing-addon1"
                onChange={(e)=>this.setState({password:e.target.value})}
              />
            </div>
            <div className='inputContainer input-group fileUpload'>
              <div id='profileImgBox' className='profileImgBox'>
                <a href="#" className="imgProfileRemove">
                  <i className="fa fa-lg fa-times" aria-hidden="true"></i>
                </a>
                <div id='uploadedProfileImageReg' className='uploadedProfileImageReg'>
                  Upload
                </div>
              </div>
              <button type="button" id='uploadButton' className="btn uploadButton btn-info" onClick={()=>uploadElement.click()}>
                <i className="fa fa-lg fa-upload" aria-hidden="true"></i>
                <div>Profile Picture</div>
              </button>
              <input hidden
                id='uploadProfileImgInput'
                className="file-upload-input"
                type='file'
                onChange ={(e)=>this.uploadImg(e.target)}
                accept="image/*" />
            </div>
          </div>
          <div className='signupCardFooter'>
            <button type="button" className="btn btn-secondary" onClick={()=>this.props.showLogin('login')}>Login</button>
            <button type="button" className="btn btn-primary" onClick={()=>this.exeSignup()}>Sign Up</button>
          </div>
        </div>
      </div>
    )
  }
}


export default Signup;
