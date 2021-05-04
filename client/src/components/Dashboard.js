import React, {useState, useEffect} from 'react'
import styled from 'styled-components'; 
import axios from 'axios'; 

import { VscDebugStart } from 'react-icons/vsc';
import { IoIosPeople } from 'react-icons/io';  
import { RiAccountCircleLine} from 'react-icons/ri';
import { VscDebugRestart } from 'react-icons/vsc';  


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

    font-size: 4rem; 
    text-align: center; 
    width: 90%; 
    height: 40vh; 
    background: white; 
    border: 2px solid black; 
    letter-spacing: .2rem;  
    line-height: 100%; 
}

input {
    width: 90%; 
    margin-bottom: 0%; 
    height: 8vh; 
    font-size: 2.5rem; 

}


.dropdown {
    display: flex; 
    justify-content: center; 
    align-items: center; 
    flex-direction: column; 
    height: 90vh; 
    width: 25%; 
}

.dropdown-box {
    display: flex; 
    justify-content: center; 
    align-items: center; 
    height: 30vh;
    width: 100% 
}

.typing-results {
    display: flex; 
    justify-content: center; 
    align-items: center; 
    height: 70vh; 
    width: 100%
}

.results {

    display: flex; 
    justify-content: space-around; 
    align-items: center; 
    flex-direction: column; 
    height: 50vh; 
    width: 90%;
}

.stats {
    width: 50%; 
}

.stats > * {
    margin: 4%; 
}

h2 {
    font-size: 3.2rem; 
}

h3 {
    font-size: 2.2rem; 
}

.restart-button {
    width: 40%; 
    padding: 1%; 
    font-size: 2rem; 
}

.restart-button:hover {
    background: black; 
    color: white; 
}

.restart-timer {
    display: flex; 
    justify-content: space-around; 
    align-items: center; 
    width: 30%
}

.timer {

    display: flex; 
    justify-content: center;
    align-items: center; 
    height: 100%; 
    width: 50%; 
    background: white; 
}

.seconds {
    font-size: 3.5rem; 
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

.restart {
    font-size: 5rem; 
    border: none; 
}

button:hover {
    background: black; 
    color: white; 
    cursor: pointer;
}

//text box

.wrong {
    color: red; 
}

.right {
   color: #228B22; 
}

#next {
    background: lightgray; 
    animation: blink 2s linear infinite; 
}

#cursor {
  background: gray;
  line-height: 17px;
  margin-left: 3px;
  -webkit-animation: blink 1.5s infinite;
  width: 7px;
  height: 15px;
}

@-webkit-keyframes blink {
  0% {background: #222}
  50% {background: lime}
  100% {background: #222}
}


`




const Dashboard = () => {



    const [userInput, setUserInput] = useState(""); 
    const [pointer, setPointer] = useState(0);
    const [data, setData] = useState([]); 
    const [text, setText] = useState("")
    const [paragraph, setParagraph] = useState(text.split(""));
    const [wrongWords, setWrongWords] = useState(0); 
    const [correctWords, setCorrectWords] = useState(0); 
    const [wpm, setWpm] = useState(0); 
    const [seconds, setSeconds] = useState(60); 
    const [disabled, setDisabled] = useState(false);
    const [intervalTimer, setIntervalTimer] = useState("false"); 
    

    useEffect(async () => {

        const response = await axios.get("http://localhost:5000/api/texts"); 


        const filteredArr = response.data.filter(cur => cur.language === "Python")

        const arr = filteredArr.map(cur => {
            return cur.text; 
        })

        console.log(arr); 

        /* Randomize array in-place using Durstenfeld shuffle algorithm */
        function shuffleArray(array) {
            for (var i = array.length - 1; i > 0; i--) {
                var j = Math.floor(Math.random() * (i + 1));
                var temp = array[i];
                array[i] = array[j];
                array[j] = temp;
            }
        }

        shuffleArray(arr); 
        setData(arr); 

        const lastItem = arr[arr.length - 1]
        setText(lastItem); 
        setParagraph(lastItem.split("")); 




    }, [])
    
 
    
    const spanText = paragraph.map((cur, index) => {
        return (
            <span key={index}>{cur}</span>
        )
    })


    const onInputChange = e => {


        const lastChar = e.target.value.slice(-1);
        const currentSpan = e.target.previousSibling.childNodes[pointer];

        if (e.target.previousSibling.childNodes[pointer + 1]){

            const nextSpan = e.target.previousSibling.childNodes[pointer + 1];

            nextSpan.setAttribute("id", "next");
        }


    

        
        if (lastChar == paragraph[pointer]){


            setPointer(pointer + 1); 
            currentSpan.classList.add("right");
            currentSpan.removeAttribute("id", "next"); 

            // checks if current word is incorrect
            if (currentSpan.classList.value == "wrong right" || currentSpan.classList.value == "right wrong" || currentSpan.classList.value == "wrong"){
                currentSpan.classList.remove("right");

            }
            else {
                setCorrectWords(correctWords + 1); 
            }

        
        }
        else {
        
            // adds the wrong class if input does not match. 
            currentSpan.classList.add("wrong"); 
            if (e.target.previousSibling.childNodes[pointer + 1]){

                const nextSpan = e.target.previousSibling.childNodes[pointer + 1];
    
                nextSpan.removeAttribute("id", "next");
            }
            setWrongWords(wrongWords + 1)
            return false; 

        }



    

        setUserInput(e.target.value);
        
        // if user is at the end; 
        if(userInput.length === text.length - 1){

            const children = e.target.previousSibling.childNodes; 

            console.log(children); 

            const arr = Array.from(children); 

            arr.forEach(cur => {
                cur.classList.remove("right");
                cur.classList.remove("wrong");
            })

            const randomNum = Math.floor((Math.random() * data.length - 1) + 1); 
            const newText = data[randomNum]; 

            setText(newText); 
            setParagraph(newText.split(""))
            setPointer(0);
            setUserInput("");





        }
    }


    const onRestartClick = () => {

        const children = document.querySelector(".text-area").childNodes; 

        const arr = Array.from(children); 

        arr.forEach(cur => {
            cur.classList.remove("right");
            cur.classList.remove("wrong");
            cur.removeAttribute("id", "next")
        })

        const randomNum = Math.floor((Math.random() * data.length - 1) + 1); 
        const newText = data[randomNum]; 

        setIntervalTimer("false"); 
        setCorrectWords(0); 
        setWrongWords(0); 
        setWpm(0); 
        setDisabled(false); 
        setSeconds(60); 
        setText(newText); 
        setParagraph(newText.split(""))
        setPointer(0);
        setUserInput("");
    }


    function timer(){
        var sec = 59;
        var myTimer = setInterval(function(){

            
            setSeconds(sec); 
            sec--;
            
            console.log(intervalTimer); 

            // when timer ends
            if (sec < 0) { 
                clearInterval(myTimer);
            }

        }, 1000);

    }
    const onInputClick = () => {


        if(seconds >= 59){
            timer();
            
        }
        
    }


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
                                {spanText}
                            </div>
        
                            <input type="text" onClick={onInputClick} onChange={onInputChange} value={userInput} disabled={disabled}/>

                            
                            <div className="restart-timer">
                                <button onClick={onRestartClick}><VscDebugRestart className="restart" /></button>
                                <div className="timer">
                                    <div className="seconds">
                                        {seconds}
                                    </div>
                                </div>
                            </div>
                    </div>
                </div>

                <div className="dropdown">
                    <div className="dropdown-box">
                        
                        <label for="language">Choose a language</label>

                        <select name="languages">
                            <option value="Python">Python</option>
                            <option value="Javascript">Javascript</option>
                            <option value="HTML">HTML</option>
                            <option value="CSS">CSS</option>
                        </select>

                    </div>
                    <div className="typing-results">
                        <div className="results">
                            <h2>Results</h2>

                           <div className="stats">
                                <h3>Chars correct: {!correctWords ? "" : correctWords} </h3>
                                <h3>Chars incorrect: {!wrongWords ? "" : wrongWords} </h3>
                                <h3>WPM: {correctWords / 5}</h3>
                           </div>

                            <button className="restart-button"> Restart </button>

                        </div>
                    </div>
                </div>
           </div>
        </StyledDashboard>
    )
}

export default Dashboard



/* 
const firstText = "Irure esse"


    // first version of typing
    const [text, setText] = useState(firstText.split("")); 
    const [currentKey, setCurrentKey] = useState(''); 
    const [userInput, setUserInput] = useState('');
    const [pointer, setPointer] = useState(0);
    const [lastCharIncorrect, setLastCharIncorrect] = useState(false);  
    const [secondPointer, setSecondPointer] = useState(0); 
    const [totalInput, setTotalInput] = useState(""); 
    const [wrongKeys, setWrongKeys] = useState([]); 
    const [totalWrongWords, setTotalWrongWords] = useState([]); 
    const [wpm, setWpm] = useState(0); 
    const [time, setTime] = useState(60); 


    const onInputChange = e => {

        const currentKey = e.target.value.slice(-1); 
        const currentSpan = e.target.previousSibling.childNodes[pointer]; 
        const nextSpan = e.target.previousSibling.childNodes[pointer + 1]

        //if current key pressed === correct 
        if(currentKey === text[pointer]){

            

            // calculate if user is at the end of the text
            setTotalInput(totalInput.concat(currentKey))


            // if the user typed the last char correctly 
           if(!lastCharIncorrect){
                currentSpan.classList.add("right")
                setPointer(pointer + 1);
                setLastCharIncorrect(false); 
           } 
           else {  //if the last char was incorrect, let the user know, but keep going
               currentSpan.classList.add("wrong"); 
               setPointer(pointer + 1); 
               setLastCharIncorrect(false); 
           }

            // if at the end of entire thing, then 
            if(totalInput.length === text.length - 1){

                currentSpan.classList.remove("next");
                const correctLetters = (firstText.length - totalWrongWords.length) - 2; 
                const str = "this is a test"; 
                setText(str.split(""));
                setUserInput(""); 
                setTotalInput("");  

            }
            else {
    
                currentSpan.classList.remove("next");
                nextSpan.classList.add("next");
            }

            
        }
        else {

            // if word is wrong, then

            // if word already has the wrong class, don't readd it again. 
            if(currentSpan.classList.contains("wrong")){
                return; 
            }
            else {
                currentSpan.classList.add("wrong"); 
                // add wrong words to calculate wpm
                setTotalWrongWords([...totalWrongWords, text[pointer]])

            }

            setLastCharIncorrect(true); 
            
            //adding the wrong char to an array
            if(!wrongKeys.includes(text[pointer])){
                setWrongKeys([...wrongKeys, text[pointer]])
            }
            return false; 
        }


        setUserInput(e.target.value); 
    }


    const handleSpace = e => {

        const text = firstText.split(" "); 


        // if user finishes word, reset input and go on to next word
        if(userInput.trim().length === text[secondPointer].length && e.keyCode === 32){
            setSecondPointer(secondPointer + 1); 
            setUserInput(""); 
        }
    } */