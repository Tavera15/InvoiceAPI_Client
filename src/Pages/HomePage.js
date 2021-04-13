import React from 'react';
import { Link } from 'react-router-dom';
import homeCoffee from '../StaticImages/home_coffee.png';

function HomePage()
{
    return(
        <div className="col-12">
            <div className="col-sm-6 bg-light" style={{"margin": "5% auto", "padding": "5%", "borderRadius": "10px",}}>
                <h1>Build Invoices For Free!</h1>
                <img style={{"margin": "30px 0", "width": "50%", "height": "auto"}} alt="icon" src={homeCoffee} />
                <div className="row">
                    <div className="col-6">
                        <Link className="btn btn-primary col-12" to="/Register">Register</Link>
                    </div>
                    <div className="col-6">
                        <Link className="btn btn-dark col-12" to="/Login">Login</Link>
                    </div>
                </div>
            </div>
        </div>
    )
}

export default HomePage;