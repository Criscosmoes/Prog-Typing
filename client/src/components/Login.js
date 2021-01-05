import React, { useEffect } from "react";
import styled from "styled-components";
import axios from "axios";
import { Link } from "react-router-dom";
import Picture from "../Images/2842680.jpg";

//
import { connect } from "react-redux";
import { handleInputChange, resetInputFields, handleErrorMessages, setCurrentUser, saveErrorMessages, checkButtonDisabled, resetErrorMessages } from "../actions/index";

//icons
import { FcGoogle } from "react-icons/fc";
import { FaGithub } from "react-icons/fa";
import { FaFacebook } from "react-icons/fa"; 

import { useHistory } from "react-router-dom"; 

//schema import 
import UserSchema from '../validation/loginSchema'; 
import * as yup from "yup";

const StyledLogin = styled.div`
  @import url("https://fonts.googleapis.com/css2?family=Bree+Serif&display=swap");

  & {
    display: flex;
    justify-content: center;
    align-items: center;
    background-image: url(${Picture});
    background-position: -20rem -150rem; //right-left //up-down
    background-repeat: no-repeat;
    background-size: 310rem;
    height: 93.7rem;
    font-family: "Bree Serif", serif;
  }

  //main container
  .info-container {
    display: flex;
    justify-content: center;
    align-items: center;
    width: 90%;
    height: 80rem;
    background: white;
    box-shadow: 0px 0px 10px 2px #282a2d;
    border-radius: 20px;
    border: 2px solid black;
  }

  //picture container
  .picture-container {
    height: 100%;
    width: 50%;
    border-radius: 20px 0px 0px 20px;
    
  }

  img {
    border-radius: 20px 0px 0px 20px;
  }

  // login container
  .login-container {
    display: flex;
    justify-content: center;
    align-items: center;
    flex-direction: column;
    height: 100%;
    width: 50%;
    background: #dbe8f0;
    border-radius: 0px 20px 20px 0px;
    
  }

  .login-container > * {
    margin: 5%;
  }

  .form-container {
    display: flex;
    justify-content: center;
    align-items: center;
    flex-direction: column;
    width: 70%;
  }

  form {
    display: flex;
    justify-content: center;
    align-items: center;
    flex-direction: column;
    width: 100%;
  }

  form > * {
    margin: 2%;
  }

  label {
    display: flex;
    justify-content: center;
    align-items: flex-start;
    flex-direction: column;
    flex-flow: column wrap;
    width: 50%;
  }

  label > * {
    margin: 0.5%;
  }

  .or-section {
    display: flex;
  }

  .oauth {
    display: flex;
    justify-content: space-evenly;
    width: 50%;
  }

  .oauth > * {
    margin: 2%;
    width: 30%;
    font-size: 2.5rem;
  }

  //font-size;

  h1 {
    font-size: 7rem;
    font-weight: bolder;
  }

  h3 {
    font-size: 2.5rem;
  }

  input {
    width: 100%;
    outline: none;
    font-size: 2.5rem;
  }

  //buttons

  button:hover {
    cursor: pointer;
  }

  .submit {
    background: gray;
    color: white;
    width: 30%;
    font-size: 2rem;
    border-radius: 20px;
    border: none;
    outline: none;
    box-shadow: none;
    padding: 1%;
  }

  .false {
    background: blue; 
  }

  .submit:hover {
    cursor: pointer;
    border: none;
    background: #2a65c9;
  }

  .or-section {
    display: flex;
    justify-content: space-around;
    width: 40%;
  }

  hr {
    width: 40%;
    background: black;
    border: none;
  }

  .google {
    display: flex;
    justify-content: space-evenly;
    align-items: center;
    background: white;
    border: 2px solid red;
    color: red;
    font-size: 2rem;
    padding: 1%;
  }

  .google:hover {
    background: #e8e8e8;
    cursor: pointer;
  }

  .github {
    display: flex;
    justify-content: space-evenly;
    align-items: center;
    background: white;
    color: black;
    font-size: 2rem;
  }

  .github:hover {
    background: #e8e8e8;
  }

  .icon {
    border: none;
  }

  .or {
    font-size: 2rem;
  }

  .link {
    font-size: 2rem;
    font-weight: bold;
    text-decoration: underline;
  }

  .oauth-container {
      width: 50%
  }

  .oauth {
    display: flex;
    justify-content: space-evenly;
    align-items: center;
    width: 100%;
    font-size: 2.6rem;
  }


  .icons {
    font-size: 4.6rem; 
    border: none; 
  }

  .icons:hover {
    cursor: pointer;
  }

  .facebook {
    color: #3b5998 
  }

  .signup {
    width: 100%
  }
  
  .error-messages {
    height: 2rem; 
    color: red; 
  }
`;

const Login = ({ email, password, handleInputChange, resetInputFields, handleErrorMessages, errorMessage, setCurrentUser, saveErrorMessages, buttonDisabled, emailErrors,  passwordErrors, checkButtonDisabled, resetErrorMessages }) => {

  let history = useHistory(); 


  const onFormSubmit = async (e) => {
    e.preventDefault();

    try {
      const user = { email, password }; 

      const response = await axios.post("http://localhost:5000/api/login", user); 

      // set user 
      const message = response.data.message; 
      const name = message.split(", ")[1].toString(); 

      //set token to local storage
      localStorage.setItem("token", response.data.token); 

      //set the current user
      setCurrentUser(response.data.id, name); 

      //reset input fields
      resetInputFields(); 

      //if correct credentials, push the user to a different screen
      history.push("/dashboard"); 
      

    }catch(e){
      // if user has the wrong credentials, show them on screen. 
      handleErrorMessages("Invalid credentials. Please try again!"); 
      
      console.log(e.response.data)
    }
   
  };

  
  const validateChange = e => {
    e.persist(); 

    yup.reach(UserSchema, e.target.name).validate(e.target.value)
    .then((valid) => {
        saveErrorMessages(e.target.name, ""); 
    })
    .catch((error) => {
        saveErrorMessages(e.target.name, error.message); 
    })

  }

  const onInputChange = e => {

    // sets input
    handleInputChange(e.target.name, e.target.value); 

    //checks for input errors
    validateChange(e); 
  }

  const resetFieldsAndErrors = () => {

    resetInputFields(); 

    resetErrorMessages(); 
  }

  useEffect(() => {

    UserSchema.isValid({email, password}).then((valid) => checkButtonDisabled(!valid))
  }, [email, password])

  return (
    <StyledLogin>
      <div className="info-container">
        <div className="picture-container">
          <img src={Picture} />
        </div>
        <div className="login-container">
          <h1>Login</h1>
          <div className="form-container">
            <form onSubmit={onFormSubmit}>
              <label>
                <h3>Email address:</h3>
                <input
                  type="text"
                  name="email"
                  value={email}
                  onChange={onInputChange}
                />
                <p className="error-messages">{emailErrors.length ? emailErrors : ""}</p>
              </label>
              <label>
                <h3>Password:</h3>
                <input
                  type="text"
                  name="password"
                  value={password}
                  onChange={onInputChange}
                />
                <p className="error-messages">{passwordErrors.length ? passwordErrors : ""}</p>
              </label>
              <button type="submit" className={`submit ${buttonDisabled ? "" : "false"}`}>
                Login
              </button>
              <p className="error-messages">{!errorMessage ? "" : errorMessage}</p>
            </form>
          </div>
          <div className="oauth-container">
            <div className="oauth">
                <p className="signup">Or sign up with: </p>
                <FaFacebook className="icons facebook" />
                <FcGoogle className="icons" />
                <FaGithub className="icons" />
            </div>
          </div>
          <Link className="link" to="/register">
            <h4 onClick={resetFieldsAndErrors}>Don't have an account? Sign up. </h4>
          </Link>
        </div>
      </div>
    </StyledLogin>
  );
};

const mapStateToProps = (state) => {
  return {
    email: state.input.email,
    password: state.input.password,
    errorMessage: state.errorMessage, 
    usernameErrors: state.errorMessages.username, 
    emailErrors: state.errorMessages.email, 
    passwordErrors: state.errorMessages.password, 
    buttonDisabled: state.buttonDisabled,
  };
};

export default connect(mapStateToProps, { handleInputChange, resetInputFields, handleErrorMessages, setCurrentUser, saveErrorMessages, checkButtonDisabled, resetErrorMessages })(Login);
