import React from 'react';

function HomePage()
{
    return(
        <div className="col-12">
            <div className="col-sm-6 bg-light" style={{"margin": "5% auto", "padding": "5%", "borderRadius": "10px",}}>
                <h1>Build Invoices For Free!</h1>
                <img style={{"margin": "30px 0", "width": "50%", "height": "auto"}} alt="icon" src={"https://banner.uclipart.com/20200112/eos/coffee-cup-coffee-cup.png"}/>
                <div className="row">
                    <div className="col-6">
                        <a className="btn btn-primary col-12" href="/Register">Register</a>
                    </div>
                    <div className="col-6">
                        <a className="btn btn-dark col-12" href="/Login">Login</a>
                    </div>
                </div>
            </div>
        </div>
    )
}

export default HomePage;