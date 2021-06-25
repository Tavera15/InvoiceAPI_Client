import React from 'react';
import CompanyTable from '../Components/CompanyTable.js'
import InvoiceTable from '../Components/InvoiceTable.js'
import CustomerTable from '../Components/CustomerTable.js'
import './Styles/Profile.css';
import {Link} from 'react-router-dom';

function ProfilePage()
{
    return(
        <div className="col-lg-12 base-page" >
            <div className="row">
                <div className="col-xl-3 col-lg-12 col-md-12 center-block">
                    <h1 className="table-name">Company Manager</h1>
                    <Link to="/CompanyManager/NewCompany" className="btn btn-primary create-new-btn">Create New</Link>
                    <CompanyTable />
                </div>

                <div className="col-xl-6 col-lg-12 col-md-12 center-block">
                    <h1 className="table-name">Invoice Manager</h1>
                    <Link to="/InvoiceManager/NewInvoice" className="btn btn-primary create-new-btn">Create New</Link>
                    <InvoiceTable />
                </div>

                <div className="col-xl-3 col-lg-12 col-md-12 center-block">
                    <h1 className="table-name">Customer Manager</h1>
                    <Link to="/CustomerManager/NewCustomer" className="btn btn-primary create-new-btn">Create New</Link>
                    <CustomerTable />
                </div>
            </div>
        </div>
    );
}

export default ProfilePage;