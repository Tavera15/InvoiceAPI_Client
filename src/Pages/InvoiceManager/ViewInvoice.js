import React,{useRef} from "react";
import { useReactToPrint } from 'react-to-print';
import './InvoiceDoc.css';

//https://www.youtube.com/watch?v=497riGWbhsQ

const ViewInvoice = React.forwardRef((props, ref) =>
{
    return(
        <div className="container-fluid col-lg-8 col-md-12" ref={ref}>
            <div id="ui-view" data-select2-id="ui-view">
                <div>
                    <div className="card">
                        <div className="card-header text-center">Invoice
                            <strong>#BBB-10010110101938</strong>
                        </div>
                        <div className="card-body">
                            <div className="table-responsive">
                                <table className="table mb-4">
                                    <thead>
                                        <th className="text-center lightgrey-border">From</th>
                                        <th className="text-center lightgrey-border">To</th>
                                        <th className="text-center lightgrey-border">Details</th>
                                    </thead>
                                    <tbody>
                                        <td className="text-left lightgrey-border">
                                            <div className="col-sm-12">
                                                <div>
                                                    <strong>BBBootstrap.com</strong>
                                                </div>
                                                <div>42, Awesome Enclave</div>
                                                <div>New York City, New york, 10394</div>
                                                <div>Email: admin@bbbootstrap.com</div>
                                                <div>Phone: +48 123 456 789</div>
                                            </div>
                                        </td>
                                        <td className="text-left lightgrey-border">
                                            <div className="col-sm-12">
                                                <div>
                                                    <strong>BBBootstrap.com</strong>
                                                </div>
                                                <div>42, Awesome Enclave</div>
                                                <div>New York City, New york, 10394</div>
                                                <div>Email: admin@bbbootstrap.com</div>
                                                <div>Phone: +48 123 456 789</div>
                                            </div>
                                        </td>
                                        <td className="text-left lightgrey-border">
                                            <div className="col-sm-12">
                                                <div>Invoice
                                                    <strong>#BBB-10010110101938</strong>
                                                </div>
                                                <div>April 30, 2019</div>
                                                <div>VAT: NYC09090390</div>
                                                <div>Account Name: BBBootstrap Inc</div>
                                            </div>
                                        </td>
                                    </tbody>
                                </table>
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
                                        <tr>
                                            <td className="center">1</td>
                                            <td className="left">Iphone 10</td>
                                            <td className="left">Apple iphoe 10 with extended warranty</td>
                                            <td className="center">16</td>
                                            <td className="right">$999,00</td>
                                            <td className="right">$999,00</td>
                                        </tr>
                                        <tr>
                                            <td className="center">2</td>
                                            <td className="left">Samsung S6</td>
                                            <td className="left">Samsung S6 with extended warranty</td>
                                            <td className="center">20</td>
                                            <td className="right">$150,00</td>
                                            <td className="right">$3.000,00</td>
                                        </tr>
                                    </tbody>
                                </table>
                            </div>
                            <div className="">
                                <table className="table table-responsive">
                                    <thead>
                                        <tr>
                                            <th style={{"width": "70%"}} className="lightgrey-border text-center">Notes</th>
                                            <th style={{"width": "30%"}} className="lightgrey-border text-center"></th>
                                        </tr>
                                    </thead>
                                    <tbody>
                                        <tr>
                                            <td className="text-left">
                                                <div className="col-lg-12">Lorem ipsum dolor sit amet, consectetur adipisicing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam.</div>
                                            </td>
                                            <td className="lightgrey-border">
                                                <div className="col-lg-12 col-auto"> 
                                                    <table className="table table-clear text-left col-lg-12">
                                                        <tbody>
                                                            <tr>
                                                                <td className="left">
                                                                    <strong>Subtotal</strong>
                                                                </td>
                                                                <td className="right">$8.497,00</td>
                                                            </tr>
                                                            <tr>
                                                                <td className="left">
                                                                    <strong>Discount (20%)</strong>
                                                                </td>
                                                                <td className="right">$1,699,40</td>
                                                            </tr>
                                                            <tr>
                                                                <td className="left">
                                                                    <strong>VAT (10%)</strong>
                                                                </td>
                                                                <td className="right">$679,76</td>
                                                            </tr>
                                                            <tr>
                                                                <td className="left">
                                                                    <strong>Total</strong>
                                                                </td>
                                                                <td className="right">
                                                                    <strong>$7.477,36</strong>
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
    );
});

function Test()
{
    const componentRef = useRef();
    const handlePrint = useReactToPrint({
        content: () => componentRef.current,
        copyStyles: true
    });

    return(
        <div>
            <button
                type="button"
                className="bg-gray-500 border border-gray-500 p-2 mb-4"
                onClick={handlePrint}
            >
                {" "}
                Print Resume{" "}
            </button>
            <ViewInvoice ref={componentRef} />
        </div>
    );
}

export default Test;