import React from 'react'
import styled from 'styled-components'; 

import { VscDebugStart } from 'react-icons/vsc';
import { IoIosPeople } from 'react-icons/io';  
import { RiAccountCircleLine } from 'react-icons/ri'; 

const StyledDashboard = styled.div`

& {

}


.navbar {

    display: flex; 
    justify-content: space-between; 
    align-items: center; 
    background: #ABB4B9;
    height: 8vh; 
    font-size: 2.3rem; 
    border: 2px solid black; 
}

.title {
    margin-left: 3.5%; 
}

.login {
    margin-right: 3.5%; 
}

// middle of page

.big-container {

    display: flex; 
    height: 90vh;
    background: #DBE8F0; 
}

.navigation {
    display: flex; 
    justify-content: center; 
    align-items: center; 
    height: 90vh;
    width: 25%; 
}

.routes {
    display: flex; 
    justify-content: space-evenly; 
    align-items: center; 
    flex-direction: column; 
    font-size: 2.5rem; 
    height: 65vh; 
    width: 80%; 
    background: white; 
    border: 2px solid black; 
}

.typing-area {

    display: flex; 
    justify-content: space-evenly;
    align-items: center; 
    flex-direction: column; 
    height: 90vh;
    width: 50%; 
}


.container {
    display: flex; 
    justify-content: space-between; 
    align-items: center; 
    flex-direction: column; 
    height: 65vh; 
    width: 90%; 
}

.text-area {

    width: 90%; 
    height: 30vh; 
    background: white; 
    border: 2px solid black; 
}

input {
    width: 90%; 
    margin-bottom: 5%; 
    height: 8vh; 
    font-size: 2.5rem; 

}


.dropdown {
    display: flex; 
    justify-content: center; 
    align-items: center; 
    height: 90vh; 
    width: 20%; 
}

.dropdown-box {
    height: 65vh; 
}

// icons 

.icons {
    border: none; 
}

.typing-test {
    display: flex; 
    justify-content: space-around; 
    align-items: center;
    width: 45%; 
}
`

const Dashboard = () => {
    return (
        <StyledDashboard>
           <div className="navbar">
                <h2 className="title">PROG TYPING: Typing Practice for Programmers</h2>

                <div className="login">
                    Login / Register
                </div>
           </div>
           <div className="big-container">
                <div className="navigation">
                    <div className="routes">
                        <div className="typing-test"><VscDebugStart className="icons" /><h3>Typing Test</h3></div>
                        <div className="typing-test"><IoIosPeople className="icons" /><h3>Leaderboards</h3></div>
                        <div className="typing-test"><RiAccountCircleLine className="icons" /><h3>My Account</h3></div>
                    </div>
                </div>

                <div className="typing-area">
                    <div className="container">
                        <div className="text-area">
                            
                            </div>
        
                            <input type="text"/>
                    </div>
                </div>

                <div className="dropdown">
                    <div className="dropdown-box">
                        <h2>DROPDOWN</h2>
                    </div>
                </div>
           </div>
        </StyledDashboard>
    )
}

export default Dashboard
