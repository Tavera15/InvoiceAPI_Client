import React from 'react';
import { Redirect, Route } from 'react-router-dom'
import { useSelector } from 'react-redux';

function PrivateRoute(props)
{
    const {isLoggedIn} = useSelector(state => state.AuthSlice);

    return(
        <Route exact path={props.path} render={() => isLoggedIn ? (props.Comp) : (<Redirect to="/Login" />)} />
    )
}

export default PrivateRoute;