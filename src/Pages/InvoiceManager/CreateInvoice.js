import React, {useState, useEffect} from 'react';
import axios from 'axios';
import {Form, Button} from 'react-bootstrap';

function CreateInvoice()
{
    const token = "";
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
    
    useEffect(() => {
        async function getCompanies()
        {
            const url = "https://localhost:44383/api/Company/GetCompanies";
            
            const headers = {
                'Authorization': `Bearer ${token}`
            };
            
            const res = await axios.get(url, {headers});
            setAllCompanies(res.data);
        }
        
        getCompanies();
    });

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

        setProductsList(old => [...old, newEntry]);
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
            "taxRate": 8.25,
            "products": productsList
        }

        const url = "https://localhost:44383/api/Invoice/NewInvoice";

        const headers = {
            'Authorization': `Bearer ${token}`
        };

        const res = await axios.post(url, body, {headers});
        console.log(res);
    }

    return(
        <div className="col-lg-12">
            <h1>Create New Invoice</h1>
                <Form onSubmit={(e) => submitHandle(e)}>
                    <div className="row col-lg-12" style={{"margin": "0 auto"}}>
                        
                        <div className="col-lg-4 col-md-8">
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
                        </div>

                        <div className="col-lg-3 col-md-8">
                            <hr />
                            <h3>Product Details</h3>
                            <div className="add-product-section">
                                <div className="form-group">
                                    <label>Product Name</label>
                                    <input type="text" className="form-control" id="inputProductName" />
                                </div>
                                <div className="form-group">
                                    <label>Product Description</label>
                                    <textarea type="text" className="form-control" id="inputProductDesc" />
                                </div>
                                <div className="form-row">
                                    <div className="form-group col-md-8">
                                        <label>Unit Price</label>
                                        <input type="number" className="form-control" id="inputProductUnitPrice" />
                                    </div>
                                    <div className="form-group col-md-4">
                                        <label>Quantity</label>
                                        <input type="number" className="form-control" id="inputProductQuantity" />
                                    </div>
                                </div>
                                <Button onClick={(e) => addToProductsList(e)} type="button">Add New</Button>
                            </div>
                        </div>

                        <div className="col-lg-5 col-md-8">
                            <hr />
                            <h3>Invoice Details</h3>
                            <table className="table table-striped">
                                <thead>
                                    <tr>
                                    <th scope="col">Product Name</th>
                                    <th scope="col">Description</th>
                                    <th scope="col">Unit Price</th>
                                    <th scope="col">Quantity</th>
                                    </tr>
                                </thead>
                                <tbody>
                                    {productsList.map((p, i) => 
                                        <tr key={i}>
                                            <td>{p.productName}</td>
                                            <td>{p.description}</td>
                                            <td>{p.unitPrice}</td>
                                            <td>{p.quantity}</td>
                                        </tr>
                                    )}
                                </tbody>
                            </table>
                        </div>
                    </div>

                    <Button type="submit" className="btn btn-primary">Create</Button>
                </Form>
        </div>
    );
}

export default CreateInvoice;