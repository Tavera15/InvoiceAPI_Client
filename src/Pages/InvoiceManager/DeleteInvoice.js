import React, { useEffect, useState, useMemo } from "react";
import axios from "axios";
import { useParams } from "react-router";
import { useHistory } from 'react-router-dom'
import {Form, Button} from 'react-bootstrap';
import 'tinymce/tinymce';
import 'tinymce/icons/default';
import 'tinymce/themes/silver';
import 'tinymce/plugins/paste';
import 'tinymce/plugins/link';
import 'tinymce/plugins/image';
import 'tinymce/plugins/table';
import 'tinymce/skins/ui/oxide/skin.min.css';
import 'tinymce/skins/ui/oxide/content.min.css';
import 'tinymce/skins/content/default/content.min.css';
import { Editor } from '@tinymce/tinymce-react';

function DeleteInvoice()
{
    const history = useHistory();
    const token = "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJzdWIiOiI4NWI3N2YwZC0xN2YyLTQxNzgtODZmOS00YTA2MGQ1Mzc5YzQiLCJodHRwOi8vc2NoZW1hcy54bWxzb2FwLm9yZy93cy8yMDA1LzA1L2lkZW50aXR5L2NsYWltcy9uYW1lIjoiYW5uaWVAZXhhbXBsZS5jb20iLCJqdGkiOiJhNWU0NjIyOC04N2U0LTRhMTAtYjY0ZS1lM2Q0Yzg4OTJmNjMiLCJodHRwOi8vc2NoZW1hcy54bWxzb2FwLm9yZy93cy8yMDA1LzA1L2lkZW50aXR5L2NsYWltcy9uYW1laWRlbnRpZmllciI6Ijg1Yjc3ZjBkLTE3ZjItNDE3OC04NmY5LTRhMDYwZDUzNzljNCIsImV4cCI6MTYxODg4MzgzNiwiaXNzIjoiaHR0cHM6Ly9sb2NhbGhvc3Q6NDQzODMiLCJhdWQiOiJodHRwczovL2xvY2FsaG9zdDo0NDM4MyJ9.f13mTxVbYNPyR3DAlb9MfO7wB_CBFtWxf7eXQ98V2sY";
    const headers = useMemo(() => {
        return {'Authorization': `Bearer ${token}`}
    }, []);
    
    const params = useParams();
    const [targetInvoice, setTargetInvoice] = useState({});
    const [isLoaded, setIsLoaded] = useState(false);
    const [status, setStatus] = useState(0);

    useEffect(() => {
        async function getInvoice()
        {
            let isCancelled = false;
            const url = "https://localhost:44383/api/Invoice/GetInvoice/" + params.id;
            await axios.get(url, {headers})
                .then((res) => {
                    if(res.data.isFinalized)
                    {
                        history.push("/InvoiceManager/ViewInvoice/" + params.id);
                        isCancelled = true
                    }

                    if(!isCancelled)
                    {
                        setTargetInvoice(res.data);
                        setStatus(res.status);
                    }
                })
                .catch((err) => {
                    setStatus(err.response.status);
                })
                .finally(() => {
                    setIsLoaded(true);
                })
        }

        getInvoice();
    },[headers, params.id, history])

    async function handleSubmit(e)
    {
        e.preventDefault();
        const url = "https://localhost:44383/api/Invoice/DeleteInvoice/" + params.id
        await axios.delete(url, {headers})
            .then((res) => {
                if(res.status === 200)
                {
                    history.push("/CompanyManager");
                }
            })
            .catch((err) => {
                
            })
    }

    return(
        <div>
            {
                isLoaded ?
                    <div>
                        {
                            status === 200 ?
                                <Form onSubmit={(e) => handleSubmit(e)}>
                                    <div className="col-lg-12" style={{"margin": "0 auto"}}>
                                        <h1>Delete?</h1>
                                        <Button type="submit" className="btn btn-danger">Delete</Button>

                                            <div className="col-xl-4 col-sm-8" style={{"margin": "0 auto"}}>      
                                                <div>
                                                    <hr />
                                                    <h3>Company Details</h3>
                                                    
                                                    <div className="form-group">
                                                        <label htmlFor="inputName">Company Name</label>
                                                        <input value={targetInvoice.companyName || ""} readOnly type="text" className="form-control" id="inputName" />
                                                    </div>
                                                    <div className="form-row">
                                                        <div className="form-group col-md-6">
                                                            <label htmlFor="inputEmail4">Email</label>
                                                            <input value={targetInvoice.companyEmail || ""} readOnly type="email" className="form-control" id="inputEmail4" />
                                                        </div>
                                                        <div className="form-group col-md-6">
                                                            <label htmlFor="inputPhone4">Telephone</label>
                                                            <input value={targetInvoice.companyPhone || ""} readOnly type="tel" className="form-control" id="inputPhone4" />
                                                        </div>
                                                    </div>
                                                    <div className="form-group">
                                                        <label htmlFor="inputAddress">Address Line 1</label>
                                                        <input value={targetInvoice.companyAddressLine1 || ""} readOnly type="text" className="form-control" id="inputAddress" placeholder="1234 Main St" />
                                                    </div>
                                                    <div className="form-group">
                                                        <label htmlFor="inputAddress2">Address Line 2</label>
                                                        <input value={targetInvoice.companyAddressLine2 || ""} readOnly type="text" className="form-control" id="inputAddress2" placeholder="Apartment, studio, or floor" />
                                                    </div>
                                                    <div className="form-row">
                                                        <div className="form-group col-md-12">
                                                            <label htmlFor="inputCity">City</label>
                                                            <input value={targetInvoice.companyCity || ""} readOnly type="text" className="form-control" id="inputCity" />
                                                        </div>
                                                        <div className="form-group col-md-8">
                                                            <label htmlFor="inputState">State</label>
                                                            <input value={targetInvoice.companyState || ""} readOnly type="text" className="form-control" id="inputState" />
                                                        </div>
                                                        <div className="form-group col-md-4">
                                                            <label htmlFor="inputZip">Zip</label>
                                                            <input value={targetInvoice.companyZip || ""} readOnly type="text" className="form-control" id="inputZip" />
                                                        </div>
                                                    </div>

                                                    <hr />
                                                    <h3>Customer Details</h3>

                                                    <div className="form-group">
                                                        <label htmlFor="inputCustomerName">Customer Name</label>
                                                        <input value={targetInvoice.customerName || ""} readOnly type="text" className="form-control" id="inputCustomerName" />
                                                    </div>
                                                    <div className="form-group">
                                                        <label htmlFor="inputCustomerAddress1">Customer Address Line 1</label>
                                                        <input value={targetInvoice.customerAddressLine1 || ""} readOnly type="text" className="form-control" id="inputCustomerAddress1" />
                                                    </div>
                                                    <div className="form-group">
                                                        <label htmlFor="inputCustomerAddress2">Customer Address Line 2</label>
                                                        <input value={targetInvoice.customerAddressLine2 || ""} readOnly type="tel" className="form-control" id="inputCustomerAddress2" />
                                                    </div>
                                                    <div className="form-row">
                                                        <div className="form-group col-md-12">
                                                            <label htmlFor="inputCustomerCity">Customer City</label>
                                                            <input value={targetInvoice.customerCity || ""} readOnly type="text" className="form-control" id="inputCustomerCity" />
                                                        </div>
                                                        <div className="form-group col-md-8">
                                                            <label htmlFor="inputCustomerState">Customer State</label>
                                                            <input value={targetInvoice.customerState || ""} readOnly type="text" className="form-control" id="inputCustomerState" />
                                                        </div>
                                                        <div className="form-group col-md-4">
                                                            <label htmlFor="inputCustomerZip">Zip</label>
                                                            <input value={targetInvoice.customerZip || ""} readOnly type="text" className="form-control" id="inputCustomerZip" />
                                                        </div>
                                                    </div>
                                                </div>
                                                <hr />
                                                <h3>Product Details</h3>
                                                <div className="add-product-section">
                                                    <hr />
                                                    <h3>Invoice Details</h3>
                                                    <table className="table table-striped table-responsive-sm">
                                                        <thead>
                                                            <tr>
                                                                <th scope="col">Product Name</th>
                                                                <th scope="col">Description</th>
                                                                <th scope="col">Unit Price</th>
                                                                <th scope="col">Quantity</th>
                                                            </tr>
                                                        </thead>
                                                        <tbody>
                                                            {targetInvoice.productOrServices.map((p, i) => 
                                                                <tr key={i}>
                                                                    <td className="align-middle">{p.productName}</td>
                                                                    <td className="align-middle">
                                                                        <div dangerouslySetInnerHTML={{__html: p.description}}>
                                                                        </div>
                                                                    </td>
                                                                    <td className="align-middle">{p.unitPrice}</td>
                                                                    <td className="align-middle">{p.quantity}</td>
                                                                </tr>
                                                            )}
                                                        </tbody>
                                                    </table>
                                                <div>
                                                <hr/>
                                                <h3>Totals</h3>
                                                <table className="table table-clear text-left col-lg-12">
                                                    <tbody>
                                                        <tr>
                                                            <td className="left">
                                                                <strong>Subtotal</strong>
                                                            </td>
                                                            <td className="right">${targetInvoice.subtotal}</td>
                                                        </tr>
                                                        <tr>
                                                            <td className="left">
                                                                <strong>Tax Rate {targetInvoice.taxRate} %</strong>
                                                            </td>
                                                            <td className="right">${targetInvoice.taxes}</td>
                                                        </tr>
                                                        <tr>
                                                            <td className="left">
                                                                <strong>Grand Total</strong>
                                                            </td>
                                                            <td className="right">
                                                                <strong>${targetInvoice.total}</strong>
                                                            </td>
                                                        </tr>
                                                    </tbody>
                                                </table>
                                            </div>
                                            </div>
                                        </div>
                                    </div>
                                </Form>
                            : <div>404</div>
                        }
                    </div>
                : <div>Loading...</div>
            }
        </div>
    );
}

export default DeleteInvoice;