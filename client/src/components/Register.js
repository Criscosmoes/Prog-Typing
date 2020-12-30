import React from "react";
import styled from "styled-components";
import Picture from "../Images/8751.jpg";
import TypeWriterEffect from 'react-typewriter-effect';
import axios from 'axios'; 
//icons
import { FcGoogle } from "react-icons/fc";
import { FaGithub } from "react-icons/fa";



//actions
import { connect } from "react-redux"; 
import { handleInputChange } from "../actions/index"; 

const StyledRegister = styled.div`
  & {
    display: flex;
    justify-content: center;
    align-items: center;
    background-image: url(${Picture});
    background-position: 12% 61.5%;
    height: 100vh;
  }

  .info-container {
    display: flex;
    justify-content: center;
    align-items: center;
    width: 90%;
    background: white;
    height: 90vh;
  }

  .picture-container {
    display: flex;
    justify-content: space-around;
    align-items: center;
    flex-direction: column;
    width: 50%;
    height: 100%;
    border: 1px solid black; 
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
    border: 1px solid black; 
  }

  .register-container > * {
    margin: 2% 0%;
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
    font-size: 2rem;
  }
  form {
    display: flex;
    justify-content: space-evenly;
    align-items: center;
    flex-direction: column;
    width: 50%;
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

  button h4 {
    color: #6f6b6b;
  }

  button:hover {
    cursor: pointer;
    border: 2px solid black;
    color: black;
  }

  .icon {
    font-size: 2.8rem;
    border: none;
  }

  .submit {
    background: #1d458a;
    color: white;
    width: 45%;
    font-size: 3.4rem;
    border-radius: 20px;
    border: none;
    outline: none;
    box-shadow: none;
    padding: 0.5%;
  }

  .submit:hover {
    cursor: pointer;
    border: none;
  }

  label {
    display: flex;
    justify-content: center;
    align-items: center;
    flex-direction: column;
    width: 70%;
  }

  label > * {
    margin: 1%;
  }

  input {
    width: 80%;
    border: 2px solid gray;
    outline: none;
    font-size: 2.5rem;
  }

  input:focus {
    border: 2px solid black;
  }

  a {
    font-weight: bolder;
    border-bottom: 1px solid black;
  }

  .or-section {
    display: flex;
    justify-content: space-around;
    width: 40%;
  }

  hr {
    width: 40%;
  }

  .info-title {
    font-size: 4.5rem;
  }

  .type-writer {
    height: 2vh; 
    margin-bottom: 7%; 
  }
`;

const Register = ({username, email, password, handleInputChange}) => {

  const onFormSubmit = async e => {

    try {

      e.preventDefault(); 

      const newUser = { username, email, password }; 

      /* const response = await axios.post("http://localhost:5000/api/register", {
        "username": username, 
        "email": email, 
        "password": password, 
      }) */

      const response = await axios.post("http://prog-typing.herokuapp.com/api/register", newUser); 

      console.log(response); 


    }catch(e){
      console.log(e.message); 
    }


  }




  return (
    <StyledRegister>
      <div className="info-container">
        <div className="picture-container">
          <h1>Prog Typing</h1>
          <div className="background"></div>
          <div className="type-writer">
          <TypeWriterEffect 
            textStyle={{ fontFamily: 'Red Hat Display', fontSize: "4.5rem"}}
            startDelay={700}
            cursorColor="blue"
            multiText={["Typing practice for programmers.", "Typing practice for programmers."]}
            typeSpeed={100}
          />
          </div>
        </div>
        <div className="register-container">
          <div className="register">
            <h2>Register</h2>
            <button>
              <FcGoogle className="icon" />
              <h4>Sign up with Google</h4>
            </button>
            <button>
              <FaGithub className="icon" />
              <h4>Sign up with Github</h4>
            </button>
          </div>
          <div className="or-section">
            <hr></hr>
            <h4>or</h4>
            <hr></hr>
          </div>

          <form onSubmit={onFormSubmit}>
            <label>
              <h3>Username:</h3>
              <input type="text" name="username" value={username} onChange={handleInputChange}  />
            </label>
            <label>
              <h3>Email:</h3>
              <input type="text" name="email"value={email} onChange={handleInputChange} />
            </label>
            <label>
              <h3>Password:</h3>
              <input type="text" name="password" value={password} onChange={handleInputChange} />
            </label>
            <button className="submit" type="submit">
              Register
            </button>
          </form>
          <p>
            Already have an account? <a href="#">Login</a>
          </p>
        </div>
      </div>
    </StyledRegister>
  );
};


const mapStateToProps = state => {
  return {
    username: state.input.username, 
    email: state.input.email, 
    password: state.input.password
  }
}

export default connect(mapStateToProps, { handleInputChange })(Register);





