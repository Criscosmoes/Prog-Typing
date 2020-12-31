import React from 'react'
import styled from 'styled-components'; 

import Picture from '../Images/2842680.jpg'; 

//icons
import { FcGoogle } from "react-icons/fc";
import { FaGithub } from "react-icons/fa";

const StyledLogin = styled.div`


& {
    display: flex; 
    justify-content: center; 
    align-items: center; 
    background-image: url(${Picture}); 
    background-position: 35% 72%; //right-left //up-down
    background-size: 150%; 
    height: 100vh; 

}

//main container
.info-container {
    display: flex; 
    justify-content: center; 
    align-items: center; 
    height: 90vh;
    width: 90%; 
    background: white; 
}

//picture container
.picture-container {
    background-size: cover; 
    width: 50%;
    height: 100%;  
    border: 2px solid black; 
}

// login container 
.login-container {
    
    display: flex; 
    justify-content: center; 
    align-items: center; 
    flex-direction: column; 
    width: 50%; 
    height: 100%; 
    border: 2px solid black; 
    background: #DBE8F0; 
}

.login-container > * {
    margin: 4.5%; 
}

.form-container {
    display: flex; 
    justify-content: center; 
    align-items: center; 
    flex-direction: column; 
    width: 70%
}

form {
    display: flex; 
    justify-content: center; 
    align-items: center; 
    flex-direction: column; 
    width: 100%
}

form > * {
    margin: 2%
}

label {
    display: flex; 
    justify-content: center; 
    align-items: flex-start; 
    flex-direction: column; 
    flex-flow: column wrap; 
    width: 50%
}

label > * {
    margin: .5%
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
}

h3 {
    font-size: 3rem; 
}


input {
    width: 100%;
    border: 2px solid black; 
    outline: none; 
    font-size: 2.5rem; 
}

//buttons



.submit {
    background: #1d458a;
    color: white;
    width: 45%;
    font-size: 3.4rem;
    border-radius: 20px;
    border: none;
    outline: none;
    box-shadow: none;
}

.submit:hover {
    cursor: pointer;
    border: none;
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
}

.google:hover {
    border: 2px solid black; 
    cursor: pointer;
}

.github {
    display: flex; 
    justify-content: space-evenly; 
    align-items: center; 
    background: white; 
    border: 2px solid black; 
    color: black; 
}


.icon {
    border: none; 
}

.or {
    font-size: 2rem; 
}
`

const Login = () => {
    return (
        <StyledLogin>
            <div className="info-container">
                <div className="picture-container">
                    <img src={Picture} />
                </div>
                <div className="login-container">
                    <h1>Login</h1>
                    <div className="form-container">
                        <form>
                            <label>
                                <h3>Email Address</h3>
                                <input type="text" />
                            </label>
                            <label>
                                <h3>Password</h3>
                                <input type="text" />
                            </label>
                            <button type="submit" className="submit">Login</button>
                        </form>
                    </div>
                    <div className="or-section">
                            <hr></hr>
                            <h4 className="or">or</h4>
                            <hr></hr>
                        </div>
                    <div className="oauth">
                        <button className="google"><FcGoogle className="icon" /><h4>Google</h4></button>
                        <button  className="github"><FaGithub className="icon" /><h4>Github</h4></button>
                    </div>
                    <p>Don't have an account? <a>Sign up.</a></p>
                </div>
            </div>
        </StyledLogin>
    )
}

export default Login
