import React from 'react';
import img from "../StaticImages/spill.png"


function NotFoundPage()
{
    return(
        <div className="col-lg-8 bg-dark" style={{"margin": "5% auto", "padding": "30px", "borderRadius": "10px", "boxShadow": "10px 10px 5px black"}}>
            <div className="">
                <div className="col-12">
                    <h1 className="text-light">404 Not Found</h1>
                </div>

                <div className="col-8 center-block">
                    <img alt="img-not-found" src={img} style={{"width": "100%"}} />
                </div>
            </div>
        </div>
    );
}

export default NotFoundPage;