import React from 'react'
import { Route, Redirect } from 'react-router-dom'; 
import { connect } from 'react-redux'; 

export const PublicRoute = ({currentUser, component: Component, ...rest}) => {
    
    return (
        <Route {...rest} component={(props) => {
            if(localStorage.getItem("token")){
    
                return <Redirect to="/dashboard" />
            }
            else {
                return <Component {...props} /> 
            }
        }}/>
    )
}

const mapStateToProps = state => {
    return {
        currentUser: state.currentUser, 
    }
}

export default connect(mapStateToProps)(PublicRoute); 
