import React from 'react'
import { Switch } from 'react-router-dom'; 
import "../App.css"; 


//components
import Register from './Register';
import Login from './Login';
import GlobalStyle from './createGlobalStyle';
import Dashboard from './Dashboard'; 
import PrivateRoute from './PrivateRoute';
import PublicRoute from './PublicRoute';

const App = () => {
    return (
        <div>
            <GlobalStyle />
           <Switch>
               <PublicRoute path="/login" component={Login} />
               <PublicRoute path="/register" component={Register} />
               <PrivateRoute path="/dashboard" component={Dashboard} />
           </Switch>
        </div>
    )
}

export default App
