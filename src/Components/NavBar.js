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
    const {userEmail} = useSelector(state => state.AuthSlice);

    const logoLink = isLoggedIn ? "/Profile" : "/";

    async function handleLogout(e)
    {
        e.preventDefault();

        const url = process.env.REACT_APP_API_URL + "/Account/Logout"
        await axios.post(url,{},{withCredentials: true})
            .then((res) => {
                dispatch(userAuthentication(res.data))
            })
    }

    return(
        
        <div>
            <nav className="navbar navbar-expand-lg navbar-light bg-light">
                <a className="navbar-brand" href={logoLink}>Tavera Invoice</a>
                <button className="navbar-toggler" type="button" data-toggle="collapse" data-target="#navbarText" aria-controls="navbarText" aria-expanded="false" aria-label="Toggle navigation">
                    <span className="navbar-toggler-icon"></span>
                </button>

                <div className="collapse navbar-collapse" id="navbarText">
                    <ul className="navbar-nav mr-auto">
                    <li className="nav-item active">
                        <a className="nav-link" href={logoLink}>Home<span className="sr-only">(current)</span></a>
                    </li>

                    {
                        isLoggedIn
                        ? <li className="nav-item dropdown">
                            <a className="nav-link dropdown-toggle" href="/" id="navbarDropdown" role="button" data-toggle="dropdown" aria-haspopup="true" aria-expanded="false">
                            Manager
                            </a>
                            <div className="dropdown-menu" aria-labelledby="navbarDropdown">
                                <a className="nav-link" href="/InvoiceManager/NewInvoice">New Invoice</a>
                                <a className="nav-link" href="/CompanyManager/NewCompany">New Company</a>
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
                                      <a className="btn btn-light" href="/Profile">{userEmail}</a>
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