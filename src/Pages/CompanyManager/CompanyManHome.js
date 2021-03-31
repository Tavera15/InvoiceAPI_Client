import { Button } from 'react-bootstrap';
import React from 'react';
import CompanyTable from '../../Components/CompanyTable.js'

function CompanyManHome()
{
    return(
        <div className="col-lg-12">
            <div className="col-lg-6">
                <h1>Company Manager</h1>
                <Button>Create New</Button>

                <div className="row" style={{"margin": "0 auto"}}>
                </div>
                <CompanyTable />
            </div>
        </div>
    );
}

export default CompanyManHome;