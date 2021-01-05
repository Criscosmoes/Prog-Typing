import React from 'react'
import { Route, Redirect } from 'react-router-dom'; 
import { connect } from 'react-redux'; 

const PrivateRoute = ({currentUser, component: Component, ...rest}) => {
    
    return (
        <Route {...rest} component={(props) => {
            if(localStorage.getItem("token")){
    
                return <Component {...props} />
            }
            else {
                return <Redirect to="/login" />
            }
        }}/>
    )
}

const mapStateToProps = state => {
    return {
        currentUser: state.currentUser, 
    }
}

export default connect(mapStateToProps)(PrivateRoute); 
