import React from 'react';
import CompanyTable from '../../Components/CompanyTable.js'
import InvoiceTable from '../../Components/InvoiceTable.js'
import CreateCompany from './CreateCompany';

function CompanyManHome()
{
    return(
        <div className="col-lg-12 row">
            <div className="col-lg-5">
                <h1>Company Manager</h1>
                <a href="/CompanyManager/NewCompany" className="btn btn-primary">Create New</a>
                <CompanyTable />
            </div>
            <div className="col-lg-7">
                <h1>Invoice Manager</h1>
                <a href="/CompanyManager/NewCompany" className="btn btn-primary">Create New</a>
                <InvoiceTable />
            </div>
        </div>
    );
}

export default CompanyManHome;