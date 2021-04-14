import React from "react";
import {Link} from 'react-router-dom';
import axios from 'axios';
import {useDispatch} from 'react-redux'
import { userAuthentication } from '../App/AuthSlicer';
import { Button } from "react-bootstrap";
import { useSelector } from 'react-redux';

function NavBar()
{
    const dispatch = useDispatch();
    const {isLoggedIn} = useSelector(state => state.AuthSlice);

    const logoLink = isLoggedIn ? "/Profile" : "/";

    async function handleLogout(e)
    {
        e.preventDefault();
        const token = window.localStorage.getItem("TaveraInvoiceToken");
        const config = {headers: { Authorization: `Bearer ${token}` }}

        const url = process.env.REACT_APP_API_URL + "/Account/Logout"
        await axios.post(url,{},config)
            .then((res) => {
                dispatch(userAuthentication(res.data))
            })
    }

    return(
        
        <div>
            <nav className="navbar navbar-expand-lg navbar-light bg-light">
                <Link className="navbar-brand" to={logoLink}>Tavera Invoice</Link>
                <button className="navbar-toggler" type="button" data-toggle="collapse" data-target="#navbarText" aria-controls="navbarText" aria-expanded="false" aria-label="Toggle navigation">
                    <span className="navbar-toggler-icon"></span>
                </button>

                <div className="collapse navbar-collapse" id="navbarText">
                    <ul className="navbar-nav mr-auto">
                    <li className="nav-item active">
                        <Link className="nav-link" to={logoLink}>Home<span className="sr-only">(current)</span></Link>
                    </li>

                    {
                        isLoggedIn
                        ? <li className="nav-item dropdown">
                            <a className="nav-link dropdown-toggle" href="/" id="navbarDropdown" role="button" data-toggle="dropdown" aria-haspopup="true" aria-expanded="false">
                            Manager
                            </a>
                            <div className="dropdown-menu" aria-labelledby="navbarDropdown">
                                <Link to="/InvoiceManager/NewInvoice" className="nav-link">New Invoice</Link>
                                <Link to="/CompanyManager/NewCompany" className="nav-link">New Company</Link>
                            </div>
                          </li>
                        : <div></div>
                    }

                    </ul>
                    <span className="navbar-text">
                        <ul className="navbar-nav mr-auto">
                            {
                                !isLoggedIn
                                ? <div>
                                      <Link to="/Login" className="btn btn-light">Login</Link>
                                      <Link to="/Register" className="btn btn-light">Register</Link>
                                  </div>
                                : <div>
                                      <Button type="button" className="btn btn-light" onClick={(e) => handleLogout(e)}>Logout</Button>
                                  </div> 
                            }
                        </ul>
                    </span>
                </div>
            </nav>
        </div>
    );
}

export default NavBar;