import React, {useState, useEffect} from 'react';
import axios from 'axios';
import {Form, Button} from 'react-bootstrap';

function InvoiceMaker(props)
{
    const [allCompanies, setAllCompanies] = useState([]);
    
    const [companyName, setCompanyName] = useState("");
    const [companyEmail, setCompanyEmail] = useState("");
    const [companyPhone, setCompanyPhone] = useState("");
    const [companyAddressLine1, setCompanyAdd1] = useState("");
    const [companyAddressLine2, setCompanyAdd2] = useState("");
    const [companyCity, setCompanyCity] = useState("");
    const [companyState, setCompanyState] = useState("");
    const [companyZip, setCompanyZip] = useState("");
    
    const [customerName, setCustomerName] = useState("");
    const [customerAddressLine1, setCustomerAdd1] = useState("");
    const [customerAddressLine2, setCustomerAdd2] = useState("");
    const [customerCity, setCustomerCity] = useState("");
    const [customerState, setCustomerState] = useState("");
    const [customerZip, setCustomerZip] = useState("");
    
    const [productsList, setProductsList] = useState([]);
    const [taxRate, setTaxRate] = useState(0);
    const [taxAmount, setTaxAmount] = useState(0);
    const [subtotal, setSubtotal] = useState(0);
    const [grandTotal, setGrandTotal] = useState(0);

    useEffect(() => {
        if(props.defaultInvoiceVals !== undefined)
        {
            setCompanyName(props.defaultInvoiceVals.companyName);
            setCompanyAdd1(props.defaultInvoiceVals.addressLine1);
            setCompanyAdd2(props.defaultInvoiceVals.addressLine2);
            setCompanyCity(props.defaultInvoiceVals.city);
            setCompanyState(props.defaultInvoiceVals.state);
            setCompanyZip(props.defaultInvoiceVals.zipCode);
            setCompanyEmail(props.defaultInvoiceVals.emailAddress);
            setCompanyPhone(props.defaultInvoiceVals.phoneNumber);
            
            setCustomerName(props.defaultInvoiceVals.customerName);
            setCustomerAdd1(props.defaultInvoiceVals.customerAddLine1);
            setCustomerAdd2(props.defaultInvoiceVals.customerAddLine2);
            setCustomerCity(props.defaultInvoiceVals.customerCity);
            setCustomerState(props.defaultInvoiceVals.customerState);
            setCustomerZip(props.defaultInvoiceVals.customerZipCode);
            
            setProductsList(props.defaultInvoiceVals.productOrServices);
            setTaxRate(props.defaultInvoiceVals.taxRate);
        }

    }, [props.defaultInvoiceVals])

    useEffect(() => {
        async function getCompanies()
        {
            const url = "https://localhost:44383/api/Company/GetCompanies";
            
            const headers = {
                'Authorization': `Bearer ${props.token}`
            };
            
            const res = await axios.get(url, {headers});
            setAllCompanies(res.data);
        }
        
        getCompanies();
    }, [props.token]);

    useEffect(() => {
        function calcultateGrandTotal()
        {
            // Subtotal
            let newSubTotal = 0;
            productsList.forEach(p => {
                newSubTotal += (p.unitPrice * p.quantity); 
            });
            setSubtotal(newSubTotal);

            // Taxes
            let newTaxAmount = subtotal * (taxRate / 100);
            setTaxAmount(newTaxAmount);

            // Grand Total
            let newGrandTotal = Math.ceil((subtotal + taxAmount) * 100) /100;
            setGrandTotal(newGrandTotal);
        }

        calcultateGrandTotal()

    }, [taxRate, productsList, subtotal, taxAmount])

    function handleSelect(e)
    {
        const id = e.target.value;
        const choice = allCompanies.find(c => c.id === id);

        if(choice !== undefined)
        {
            setCompanyName(choice.companyName);
            setCompanyAdd1(choice.addressLine1);
            setCompanyAdd2(choice.addressLine2);
            setCompanyCity(choice.city);
            setCompanyState(choice.state);
            setCompanyZip(choice.zipCode);
            setCompanyEmail(choice.emailAddress);
            setCompanyPhone(choice.phoneNumber);
        }
    }

    function addToProductsList(e)
    {
        e.preventDefault();
        
        const productName = document.getElementById("inputProductName").value;
        const productDesc = document.getElementById("inputProductDesc").value;
        const productPrice = document.getElementById("inputProductUnitPrice").value;
        const productQty = document.getElementById("inputProductQuantity").value;

        const newEntry = {
            "productName": productName,
            "description": productDesc,
            "unitPrice": productPrice,
            "quantity": productQty
        }

        document.getElementById("inputProductName").value = "";
        document.getElementById("inputProductDesc").value = "";
        document.getElementById("inputProductUnitPrice").value = "";
        document.getElementById("inputProductQuantity").value = "1";

        productsList.push(newEntry);
        setProductsList([...productsList]);
    }
    
    function removeFromProductList(e, pos)
    {
        e.preventDefault();
        
        productsList.splice(pos, 1);
        setProductsList([...productsList]);
    }

    async function submitHandle(e)
    {
        e.preventDefault();
        const body = {
            "companyName": companyName,
            "addressLine1": companyAddressLine1,
            "addressLine2": companyAddressLine2,
            "city": companyCity,
            "state": companyState,
            "zipCode": companyZip,
            "emailAddress": companyEmail,
            "phoneNumber": companyPhone,
            "customerName": customerName,
            "customerAddLine1": customerAddressLine1,
            "customerAddLine2": customerAddressLine2,
            "customerCity": customerCity,
            "customerState": customerState,
            "customerZipCode": customerZip,
            "isFinalized": false,
            "taxRate": taxRate,
            "products": productsList
        }

        props.handleSubmit(e, body);
    }

    return(
        <div className="col-lg-12" style={{"margin": "0 auto"}}>
            <h1>{props.title}</h1>
                <div className="col-xl-4 col-sm-8" style={{"margin": "0 auto"}}>      
                    <Form onSubmit={(e) => submitHandle(e)}>
                        <div>
                            <hr />
                            <h3>Company Details</h3>
                            <select onChange={(e) => handleSelect(e)} className="form-select" aria-label="Default select example">
                                <option hidden defaultValue>Select Company</option>
                                {allCompanies.map((c, i) => 
                                    <option key={i} value={c.id}>{c.companyName}</option>
                                )}
                            </select>
                            
                            <div className="form-group">
                                <label htmlFor="inputName">Company Name</label>
                                <input value={companyName || ""} onChange={(e) => setCompanyName(e.target.value)} type="text" className="form-control" id="inputName" />
                            </div>
                            <div className="form-row">
                                <div className="form-group col-md-6">
                                    <label htmlFor="inputEmail4">Email</label>
                                    <input value={companyEmail || ""} onChange={(e) => setCompanyEmail(e.target.value)} type="email" className="form-control" id="inputEmail4" />
                                </div>
                                <div className="form-group col-md-6">
                                    <label htmlFor="inputPhone4">Telephone</label>
                                    <input value={companyPhone || ""} onChange={(e) => setCompanyPhone(e.target.value)} type="tel" className="form-control" id="inputPhone4" />
                                </div>
                            </div>
                            <div className="form-group">
                                <label htmlFor="inputAddress">Address Line 1</label>
                                <input value={companyAddressLine1 || ""} onChange={(e) => setCompanyAdd1(e.target.value)} type="text" className="form-control" id="inputAddress" placeholder="1234 Main St" />
                            </div>
                            <div className="form-group">
                                <label htmlFor="inputAddress2">Address Line 2</label>
                                <input value={companyAddressLine2 || ""} onChange={(e) => setCompanyAdd2(e.target.value)} type="text" className="form-control" id="inputAddress2" placeholder="Apartment, studio, or floor" />
                            </div>
                            <div className="form-row">
                                <div className="form-group col-md-12">
                                    <label htmlFor="inputCity">City</label>
                                    <input value={companyCity || ""} onChange={(e) => setCompanyCity(e.target.value)} type="text" className="form-control" id="inputCity" />
                                </div>
                                <div className="form-group col-md-8">
                                    <label htmlFor="inputState">State</label>
                                    <input value={companyState || ""} onChange={(e) => setCompanyState(e.target.value)} type="text" className="form-control" id="inputState" />
                                </div>
                                <div className="form-group col-md-4">
                                    <label htmlFor="inputZip">Zip</label>
                                    <input value={companyZip || ""} onChange={(e) => setCompanyZip(e.target.value)} type="text" className="form-control" id="inputZip" />
                                </div>
                            </div>

                            <hr />
                            <h3>Customer Details</h3>

                            <div className="form-group">
                                <label htmlFor="inputCustomerName">Customer Name</label>
                                <input value={customerName || ""} onChange={(e) => setCustomerName(e.target.value)} type="text" className="form-control" id="inputCustomerName" />
                            </div>
                            <div className="form-group">
                                <label htmlFor="inputCustomerAddress1">Customer Address Line 1</label>
                                <input value={customerAddressLine1 || ""} onChange={(e) => setCustomerAdd1(e.target.value)} type="text" className="form-control" id="inputCustomerAddress1" />
                            </div>
                            <div className="form-group">
                                <label htmlFor="inputCustomerAddress2">Customer Address Line 2</label>
                                <input value={customerAddressLine2 || ""} onChange={(e) => setCustomerAdd2(e.target.value)} type="tel" className="form-control" id="inputCustomerAddress2" />
                            </div>
                            <div className="form-row">
                                <div className="form-group col-md-12">
                                    <label htmlFor="inputCustomerCity">Customer City</label>
                                    <input value={customerCity || ""} onChange={(e) => setCustomerCity(e.target.value)} type="text" className="form-control" id="inputCustomerCity" />
                                </div>
                                <div className="form-group col-md-8">
                                    <label htmlFor="inputCustomerState">Customer State</label>
                                    <input value={customerState || ""} onChange={(e) => setCustomerState(e.target.value)} type="text" className="form-control" id="inputCustomerState" />
                                </div>
                                <div className="form-group col-md-4">
                                    <label htmlFor="inputCustomerZip">Zip</label>
                                    <input value={customerZip || ""} onChange={(e) => setCustomerZip(e.target.value)} type="text" className="form-control" id="inputCustomerZip" />
                                </div>
                            </div>
                            <Button type="submit" className="btn btn-primary">Create</Button>
                        </div>
                    </Form>
                    <hr />
                    <h3>Product Details</h3>
                    <Form onSubmit={(e) => addToProductsList(e)}>
                        <div className="add-product-section">
                            <div className="form-group">
                                <label>Product Name</label>
                                <input type="text" required className="form-control" id="inputProductName" />
                            </div>
                            <div className="form-group">
                                <label>Product Description</label>
                                <textarea type="text" className="form-control" id="inputProductDesc" />
                            </div>
                            <div className="form-row">
                                <div className="form-group col-md-8">
                                    <label>Unit Price</label>
                                    <input required type="number" className="form-control" id="inputProductUnitPrice" />
                                </div>
                                <div className="form-group col-md-4">
                                    <label>Quantity</label>
                                    <input required type="number" defaultValue={1} className="form-control" min="1" id="inputProductQuantity" />
                                </div>
                            </div>
                            <Button type="submit">Add New</Button>
                            <hr />
                            <h3>Invoice Details</h3>
                            <table className="table table-striped table-responsive-sm">
                                <thead>
                                    <tr>
                                        <th scope="col">Product Name</th>
                                        <th scope="col">Description</th>
                                        <th scope="col">Unit Price</th>
                                        <th scope="col">Quantity</th>
                                        <th scope="col">Actions</th>
                                    </tr>
                                </thead>
                                <tbody>
                                    {productsList.map((p, i) => 
                                        <tr key={i}>
                                            <td className="align-middle">{p.productName}</td>
                                            <td className="align-middle">{p.description}</td>
                                            <td className="align-middle">{p.unitPrice}</td>
                                            <td className="align-middle">{p.quantity}</td>
                                            <td><button className="btn btn-danger" onClick={(e) => removeFromProductList(e, i)} type="button">Delete</button></td>
                                        </tr>
                                    )}
                                </tbody>
                            </table>
                        </div>
                    </Form>
                    <div>
                        <hr/>
                        <h3>Totals</h3>
                        <table className="table table-clear text-left col-lg-12">
                            <tbody>
                                <tr>
                                    <td className="left">
                                        <strong>Subtotal</strong>
                                    </td>
                                    <td className="right">${subtotal.toFixed(2)}</td>
                                </tr>
                                <tr>
                                    <td className="left">
                                        <strong>Tax Rate <input onChange={(e) => setTaxRate(e.target.value)} value={taxRate || 0} type="number" min="0" id="inputTaxRate" /> %</strong>
                                    </td>
                                    <td className="right">${taxAmount.toFixed(2)}</td>
                                </tr>
                                <tr>
                                    <td className="left">
                                        <strong>Grand Total</strong>
                                    </td>
                                    <td className="right">
                                        <strong>${grandTotal.toFixed(2)}</strong>
                                    </td>
                                </tr>
                            </tbody>
                        </table>
                    </div>
                </div>
        </div>
    );
}

export default InvoiceMaker;