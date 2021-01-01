import React from "react";
import styled from "styled-components";
import axios from "axios";
import { Link } from "react-router-dom";
import Picture from "../Images/2842680.jpg";

//
import { connect } from "react-redux";
import { handleInputChange, resetInputFields } from "../actions/index";

//icons
import { FcGoogle } from "react-icons/fc";
import { FaGithub } from "react-icons/fa";
import { FaFacebook } from "react-icons/fa"; 

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
    margin: 6.9%;
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
    background: #1d458a;
    color: white;
    width: 30%;
    font-size: 2rem;
    border-radius: 20px;
    border: none;
    outline: none;
    box-shadow: none;
    padding: 1%;
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
`;

const Login = ({ email, password, handleInputChange, resetInputFields }) => {
  const onFormSubmit = async (e) => {
    e.preventDefault();

    const user = { email, password };

    const response = await axios.post("http://localhost:5000/api/login", user);

    if (response.status === 200) {
      localStorage.setItem("token", response.data.token);
    }
    else if(response.status === 400) {
        console.log("wrong credentials")
    }

    console.log(response);

    resetInputFields(); 
  };

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
                  onChange={handleInputChange}
                />
              </label>
              <label>
                <h3>Password:</h3>
                <input
                  type="text"
                  name="password"
                  value={password}
                  onChange={handleInputChange}
                />
              </label>
              <button type="submit" className="submit">
                Login
              </button>
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
            Don't have an account? Sign up. 
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
  };
};

export default connect(mapStateToProps, { handleInputChange, resetInputFields })(Login);
