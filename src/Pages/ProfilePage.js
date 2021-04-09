import React from 'react';
import CompanyTable from '../Components/CompanyTable.js'
import InvoiceTable from '../Components/InvoiceTable.js'
import './Styles/Profile.css';

function ProfilePage()
{
    return(
        <div className="col-lg-8 center-block dark-bg">
            <div className="base-page row">
                <div className="col-xl-4 col-lg-12  col-md-12 center-block dist-block">
                    <h1 className="table-name">Company Manager</h1>
                    <a href="/CompanyManager/NewCompany" className="btn btn-primary create-new-btn">Create New</a>
                    <CompanyTable />
                </div>

                <div className="col-xl-8 col-lg-12 col-md-12 center-block dist-block">
                    <h1 className="table-name">Invoice Manager</h1>
                    <a href="/InvoiceManager/NewInvoice" className="btn btn-primary create-new-btn">Create New</a>
                    <InvoiceTable />
                </div>
            </div>
        </div>
    );
}

export default ProfilePage;