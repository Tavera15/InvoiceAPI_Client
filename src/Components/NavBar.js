import React from "react";
import {Link} from 'react-router-dom';
import axios from 'axios';
import {useDispatch} from 'react-redux'
import { userAuthentication } from '../App/AuthSlicer';
import { Button } from "react-bootstrap";

function NavBar()
{
    const dispatch = useDispatch();

    async function handleLogout(e)
    {
        e.preventDefault();

        const url = "https://localhost:44383/api/Account/Logout"
        await axios.post(url,{},{withCredentials: true})
            .then((res) => {
                dispatch(userAuthentication(res.data))
            })
    }

    return(
        
        <div>
            <nav className="navbar navbar-expand-lg navbar-light bg-light">
                <a className="navbar-brand" href="/">Tavera Invoice</a>
                <button className="navbar-toggler" type="button" data-toggle="collapse" data-target="#navbarText" aria-controls="navbarText" aria-expanded="false" aria-label="Toggle navigation">
                    <span className="navbar-toggler-icon"></span>
                </button>

                <div className="collapse navbar-collapse" id="navbarText">
                    <ul className="navbar-nav mr-auto">
                    <li className="nav-item active">
                        <a className="nav-link" href="/">Home <span className="sr-only">(current)</span></a>
                    </li>

                    <li className="nav-item dropdown">
                        <a className="nav-link dropdown-toggle" href="/" id="navbarDropdown" role="button" data-toggle="dropdown" aria-haspopup="true" aria-expanded="false">
                        Company
                        </a>
                        <div className="dropdown-menu" aria-labelledby="navbarDropdown">
                            <a className="nav-link" href="/CompanyManager">Manager</a>
                            <a className="nav-link" href="/CompanyManager/NewCompany">New Company</a>
                        </div>
                    </li>
                    <li className="nav-item dropdown">
                    <a className="nav-link dropdown-toggle" href="/" id="navbarDropdown" role="button" data-toggle="dropdown" aria-haspopup="true" aria-expanded="false">
                        Invoice
                        </a>
                        <div className="dropdown-menu" aria-labelledby="navbarDropdown">
                            <a className="nav-link" href="/CompanyManager">Manager</a>
                            <a className="nav-link" href="/InvoiceManager/NewInvoice">New Invoice</a>
                        </div>
                    </li>
                    </ul>
                    <span className="navbar-text">
                        <ul className="navbar-nav mr-auto">
                            <Link to="/Login" className="nav-link">Login</Link>
                            <Link to="/Register" className="nav-link">Register</Link>
                            <Button type="button" className="nav-link" onClick={(e) => handleLogout(e)}>Logout</Button>
                        </ul>
                    </span>
                </div>
            </nav>
        </div>
    );
}

export default NavBar;