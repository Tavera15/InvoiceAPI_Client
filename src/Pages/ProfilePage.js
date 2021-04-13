import React from 'react';
import CompanyTable from '../Components/CompanyTable.js'
import InvoiceTable from '../Components/InvoiceTable.js'
import './Styles/Profile.css';
import {Link} from 'react-router-dom';

function ProfilePage()
{
    return(
        <div className="col-lg-8 center-block dark-bg dark-box-shadow" >
            <div className="base-page row">
                <div className="col-xl-4 col-lg-12 col-md-12 center-block dist-block">
                    <h1 className="table-name">Company Manager</h1>
                    <Link to="/CompanyManager/NewCompany" className="btn btn-primary create-new-btn">Create New</Link>
                    <CompanyTable />
                </div>

                <div className="col-xl-8 col-lg-12 col-md-12 center-block dist-block">
                    <h1 className="table-name">Invoice Manager</h1>
                    <Link to="/InvoiceManager/NewInvoice" className="btn btn-primary create-new-btn">Create New</Link>
                    <InvoiceTable />
                </div>
            </div>
        </div>
    );
}

export default ProfilePage;