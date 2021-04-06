import React from 'react';
import './Styles/InvoiceDoc.css';

const Invoice = React.forwardRef((props, ref) =>
{
    return(
        <div className="container-fluid col-lg-8 col-md-12" ref={ref}>
            <div id="ui-view" data-select2-id="ui-view">
                <div>
                    <div className="card">
                        <div className="card-header text-center">Invoice:
                            <strong> #{props.data.id}</strong>
                        </div>
                        <div className="card-body">
                            <div className="col-lg-12 mb-4">
                                <div className="row">
                                    <div className="invoice-header-block lightgrey-border">
                                       <table className="table">
                                            <thead>
                                                <tr>
                                                    <th>From</th>
                                                </tr>
                                            </thead>
                                            <tbody>
                                                <tr className="text-left">
                                                    <td>
                                                        <div>
                                                            <strong>{props.data.companyName}</strong>
                                                        </div>
                                                        <div>{props.data.addressLine1}</div>
                                                        <div>{props.data.addressLine2}</div>
                                                        <div>{props.data.city || "<City Missing>"}, {props.data.state || "<State Missing>"}, {props.data.zipCode || "<Zip Code Missing>"}</div>
                                                        <div>{props.data.emailAddress || "<Email Missing>"}</div>
                                                        <div>{props.data.phoneNumber || "<Telephone Missing>"}</div>
                                                    </td>
                                                </tr>
                                            </tbody>
                                        </table> 
                                    </div>
                                    
                                    <div className="invoice-header-block lightgrey-border">
                                        <table className="table ">
                                            <thead>
                                                <tr>
                                                    <th>To</th>
                                                </tr>
                                            </thead>
                                            <tbody>
                                                <tr className="text-left">
                                                    <td>
                                                        <div>
                                                            <strong>{props.data.customerName}</strong>
                                                        </div>
                                                        <div>{props.data.customerAddLine1}</div>
                                                        <div>{props.data.customerAddLine2}</div>
                                                        <div>{props.data.customerCity || "<City Missing>"}, {props.data.customerState || "<State Missing>"}, {props.data.customerZipCode || "<Zip Code Missing>"}</div>
                                                    </td>
                                                </tr>
                                            </tbody>
                                        </table>
                                    </div>

                                    <div className="invoice-header-block lightgrey-border">
                                        <table className="table ">
                                            <thead>
                                                <tr>
                                                    <th>Details</th>
                                                </tr>
                                            </thead>
                                            <tbody>
                                                <tr className="text-left">
                                                    <td>
                                                        <div>Invoice:
                                                            <strong> #{props.data.id}</strong>
                                                        </div>
                                                        <div>Date Created: April 30, 2019</div>
                                                    </td>
                                                </tr>
                                            </tbody>
                                        </table>
                                    </div>
                                </div>
                            </div>
                            
                                                          
                            <div className="table-responsive">
                                <table className="table table-striped text-left">
                                    <thead>
                                        <tr className="center-text">
                                            <th className="center">#</th>
                                            <th>Item</th>
                                            <th>Description</th>
                                            <th className="center">Quantity</th>
                                            <th className="right">Unit Cost</th>
                                            <th className="right">Total</th>
                                        </tr>
                                    </thead>
                                    <tbody>
                                        {props.data.productOrServices.map((p, i) => 
                                            <tr key={i}>
                                                <td className="center">{i+1}</td>
                                                <td className="left">{p.productName}</td>
                                                <td className="left">
                                                    <div dangerouslySetInnerHTML={{__html: p.description}}>
                                                    </div>
                                                </td>
                                                <td className="center">{p.quantity}</td>
                                                <td className="right">${p.unitPrice.toFixed(2)}</td>
                                                <td className="right">${(p.unitPrice * p.quantity).toFixed(2)}</td>
                                            </tr>
                                        )}
                                    </tbody>
                                </table>
                            </div>
                            
                            <div className="col-lg-12">
                                <div className="row">

                                    <div className="invoice-footer-notes mb-4">
                                        <table className="table">
                                            <thead>
                                                <tr>
                                                    <th className="lightgrey-border text-center">Notes</th>
                                                </tr>
                                            </thead>
                                            <tbody>
                                                <tr className="text-left">
                                                    <td>
                                                        <div dangerouslySetInnerHTML={{__html: props.data.notes}}>
                                                        </div>
                                                    </td>
                                                </tr>
                                            </tbody>
                                        </table>
                                    </div>

                                    <div className="invoice-footer-calculations mb-4">
                                        <table className="table table-fixed">
                                            <thead>
                                                <tr>
                                                    <th className="lightgrey-border text-center">Calculations</th>
                                                </tr>
                                            </thead>
                                            <tbody>
                                                <tr className="lightgrey-border">
                                                    <td className="lightgrey-border">
                                                        <div className=""> 
                                                            <table className="table table-clear text-left">
                                                                <tbody>
                                                                    <tr>
                                                                        <td className="left">
                                                                            <strong>Subtotal</strong>
                                                                        </td>
                                                                        <td className="right">${props.data.subtotal}</td>
                                                                    </tr>
                                                                    <tr>
                                                                        <td className="left">
                                                                            <strong>Tax Rate ({props.data.taxRate}%)</strong>
                                                                        </td>
                                                                        <td className="right">${props.data.taxAmount || 0}</td>
                                                                    </tr>
                                                                    <tr>
                                                                        <td className="left">
                                                                            <strong>Grand Total</strong>
                                                                        </td>
                                                                        <td className="right">
                                                                            <strong>${props.data.total}</strong>
                                                                        </td>
                                                                    </tr>
                                                                </tbody>
                                                            </table>
                                                        </div>
                                                    </td>
                                                </tr>
                                            </tbody>
                                        </table>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
});

export default Invoice;