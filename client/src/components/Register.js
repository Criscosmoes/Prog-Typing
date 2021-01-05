import React, { useEffect } from "react";
import styled from "styled-components";
import Picture from "../Images/8751.jpg";
import TypeWriterEffect from "react-typewriter-effect";
import axios from "axios";
import { Link } from "react-router-dom"; 
import validator from "validator"; 

//schema import 
import UserSchema from '../validation/signUpSchema'; 
import * as yup from "yup";


//icons
import { FcGoogle } from "react-icons/fc";
import { FaGithub } from "react-icons/fa";
import { FaFacebook } from 'react-icons/fa'; 

//actions
import { connect } from "react-redux";
import { resetInputFields, saveErrorMessages, handleInputChange, checkButtonDisabled, resetErrorMessages, handleErrorMessages } from "../actions/index";

const StyledRegister = styled.div`
  @import url("https://fonts.googleapis.com/css2?family=Bree+Serif&display=swap");

  & {
    display: flex;
    justify-content: center;
    align-items: center;
    background-image: url(${Picture});
    background-position: -70rem 300rem;
    height: 93.7rem;
    font-family: "Bree Serif", serif;
  }

  //main container
  .info-container {
    display: flex;
    justify-content: center;
    align-items: center;
    width: 90%;
    background: white;
    height: 80rem;
    border-radius: 20px; 
    box-shadow: 0px 0px 10px 2px #282a2d;
    border: 2px solid black;

  }

  .picture-container {
    display: flex;
    justify-content: space-around;
    align-items: center;
    flex-direction: column;
    width: 50%;
    height: 100%;
    border-radius: 20px 0px 0px 20px; 
  }

  img {
    border-radius: 20px 0px 0px 20px; 
}

  .background {
    background-image: url(${Picture});
    background-size: cover;
    background-position: center;
    width: 100%;
    height: 70%;
    filter: saturate(150%);
    filter: contrast(120%);
  }

  .register-container {
    display: flex;
    justify-content: space-between;
    align-items: center;
    flex-direction: column;
    width: 50%;
    height: 100%;
    background: #e7f3ff;
    border-radius: 0px 20px 20px 0px;
  }

  .register-container > * {
    margin: 3.1% 0%;
  }

  h1 {
    font-size: 7rem;
    font-weight: bolder;
  }

  h2 {
    font-size: 7rem;
    font-weight: bolder;
  }

  h3 {
    font-size: 2.5rem;
  }
  form {
    display: flex;
    justify-content: space-evenly;
    align-items: center;
    flex-direction: column;
    width: 100%;
    font-size: 2.3rem;
  }

  form > * {
    margin: 1.5% 0%;
  }

  .register {
    display: flex;
    justify-content: space-evenly;
    align-items: center;
    flex-direction: column;
    width: 50%;
  }

  .register > * {
    margin: 3% 0%;
  }

  button {
    display: flex;
    justify-content: space-evenly;
    align-items: center;
    font-size: 2.2rem;
    padding: 1%;
    background: white;
    width: 58%;
    border: 2px solid gray;
    outline: none;
    box-shadow: none;
    border-radius: 10px;
  }

  .icon {
    font-size: 2.8rem;
    border: none;
  }

  .submit {
    background: gray; 
    width: 40%; 
    border-radius: 20px; 
    color: white;
    border: none; 
    padding: 1%; 
    font-size: 2rem;

  }

  .false {
    background: blue; 
  }

  .submit:hover {
    cursor: pointer;
    border: none;
    background: #2a65c9; 
  }
  label {
    display: flex; 
    justify-content: center; 
    align-items: flex-start; 
    flex-direction: column; 
    flex-flow: column wrap; 
    width: 70%;
  }

  label > * {
    margin: 1%;
  }

  input {
    width: 100%;
    border: 2px solid gray;
    outline: none;
    font-size: 2.5rem;
  }

  input:focus {
  }

  a {
    font-weight: bolder;
    border-bottom: 1px solid black;
  }

  .info-title {
    font-size: 4.5rem;
  }

  .type-writer {
    height: 2rem;
    margin-bottom: 7%;
  }

  .oauth {
    display: flex; 
    justify-content: space-evenly; 
    align-items: center; 
    width: 50%; 
    font-size: 2.6rem;
  }

  .oauth > * {
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

  .link {
    font-size: 2rem; 
  }

  .error-messages {
    color: red; 
    font-size: 1.75rem; 
    height: 2rem; 
  }

  .username {
    border: 2px solid #00FF00
  }

  .email {
    border: 2px solid #00FF00
  }

  .password {
    border: 2px solid #00FF00
  }
  
`;

const Register = ({ username, email, password, handleInputChange, resetInputFields, saveErrorMessages, usernameErrors, emailErrors, passwordErrors, buttonDisabled, checkButtonDisabled, resetErrorMessages, handleErrorMessages}) => {
  const onFormSubmit = async (e) => {
    try {
      e.preventDefault();

      const newUser = { username, email, password };

      const response = await axios.post(
        "https://prog-typingg.herokuapp.com/api/register",
        newUser
      );
  
      console.log(response.preview);

      resetInputFields(); 
    } catch (e) {
      console.log(e.response.data);
    }
  };


  const onInputChange = e => {

    // saves input to state
    handleInputChange(e.target.name, e.target.value); 

    // validate user input 
    validateChange(e); 

    //checks if any error messagess are present
    if(usernameErrors || emailErrors || passwordErrors){
      checkButtonDisabled(true); 
    }

  }

  // helper functions
  const resetFieldsAndErrors = () => {

    resetInputFields(); 

    resetErrorMessages(); 
  }

  
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


  // on render
  useEffect(() => {

    UserSchema.isValid({username, email, password}).then((valid) => checkButtonDisabled(!valid))

    // checks if input is valid email, then checks db if email is already taken or not
    const timeoutId = setTimeout(async () => {

      //checks if user is unique
      if(username.length > 3){

        try {
          const response = await axios.post("http://localhost:5000/api/username", {username});
        }catch(e){
          saveErrorMessages("username", e.response.data); 
        }
      }

      //checks email
      if(validator.isEmail(email) && email.length > 5){
  

        try {

          const response = await axios.post("http://localhost:5000/api/email",{email});
           
        }
        catch(e){
          saveErrorMessages("email", e.response.data)
        }
        
      }

    }, 1000)


    return () => {
      clearTimeout(timeoutId); 
    }
  }, [username, email, password])

  return (
    <StyledRegister>
      <div className="info-container">
        <div className="picture-container">
          <h1>Prog Typing</h1>
          <div className="background"></div>
          <div className="type-writer">
            <TypeWriterEffect
              textStyle={{ fontFamily: "Red Hat Display", fontSize: "4.5rem" }}
              startDelay={700}
              cursorColor="blue"
              multiText={[
                "Typing practice for programmers.",
                "Typing practice for programmers.",
              ]}
              typeSpeed={100}
            />
          </div>
        </div>
        <div className="register-container">
        <h2>Register</h2>
          <div className="register">
            <form onSubmit={onFormSubmit}>
              <label>
                <h3>Username:</h3>
                <input
                  className={`${!usernameErrors && username.length > 3 ? "username" : ""}`}
                  type="text"
                  name="username"
                  value={username}
                  onChange={onInputChange}
                />
                <p className="error-messages">{usernameErrors.length ? usernameErrors : ""}</p>
              </label>
              <label>
                <h3>Email:</h3>
                <input
                  className={`${!emailErrors && email.length > 5 ? "email" : ""}`}
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
                  className={`${!passwordErrors && password.length > 5 ? "password" : ""}`}
                  type="text"
                  name="password"
                  value={password}
                  onChange={onInputChange}
                />
                <p className="error-messages">{passwordErrors.length ? passwordErrors : ""}</p>
              </label>
              <button className={`submit ${buttonDisabled ? "" : "false"}`} type="submit" disabled={buttonDisabled}>
                Register
              </button>
            </form>
          </div>
            <div className="oauth">
              <p>Or sign up with: </p>
              <FaFacebook className="icons facebook" />
              <FcGoogle className="icons" />
              <FaGithub className="icons"  />
            </div>
          <Link className="link" to="/login">
            <h4 onClick={resetFieldsAndErrors}>Already have an account? Login.</h4>
          </Link>
        </div>
      </div>
    </StyledRegister>
  );
};

const mapStateToProps = (state) => {
  return {
    username: state.input.username,
    email: state.input.email,
    password: state.input.password,
    usernameErrors: state.errorMessages.username, 
    emailErrors: state.errorMessages.email, 
    passwordErrors: state.errorMessages.password, 
    buttonDisabled: state.buttonDisabled, 
  };
};

export default connect(mapStateToProps, {handleInputChange, resetInputFields, saveErrorMessages, checkButtonDisabled, resetErrorMessages, handleErrorMessages })(Register);
