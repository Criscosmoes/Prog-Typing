import React from 'react'
import { Switch, Route } from 'react-router-dom'; 
import "../App.css"; 


//components
import Register from './Register';
import Login from './Login';
import GlobalStyle from './createGlobalStyle';

const App = () => {
    return (
        <div>
            <GlobalStyle />
           <Switch>
               <Route path="/register">
                   <Register />
               </Route>
               <Route path="/login">
                   <Login />
               </Route>
           </Switch>
        </div>
    )
}

export default App
