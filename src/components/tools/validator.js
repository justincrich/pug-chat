//function that validates user input during login
export function loginValidate(name, email, password){
  //regex for email
  let re = /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
  //test values
  let nameEmpty = name === '';
  let emailValid = re.test(email);
  let passEmpty = password === '';
  let validation = {
    name:true,
    email:true,
    password:true
  };

  if(nameEmpty){
    //password set to false if invalid
    validation.name = false;
  }

  if(!emailValid){
    //email set to false if invalid
    validation.email = false
  }

  if(passEmpty){
    //password set to false if invalid
    validation.password = false;
  }

  return validation;
}
