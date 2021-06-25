import React,{useState, useEffect} from 'react';
import {Form, Button} from 'react-bootstrap';


function CustomerMaker(props)
{
    const [customerName, setCustomerName] = useState("");
    const [customerAddressLine1, setCustomerAdd1] = useState("");
    const [customerAddressLine2, setCustomerAdd2] = useState("");
    const [customerCity, setCustomerCity] = useState("");
    const [customerState, setCustomerState] = useState("");
    const [customerZip, setCustomerZip] = useState("");

    useEffect(() => {
        if(props.defaultCustomerVals !== undefined)
        {
            setCustomerName(props.defaultCustomerVals.companyName);
            setCustomerAdd1(props.defaultCustomerVals.addressLine1);
            setCustomerAdd2(props.defaultCustomerVals.addressLine2);
            setCustomerCity(props.defaultCustomerVals.city);
            setCustomerState(props.defaultCustomerVals.state);
            setCustomerZip(props.defaultCustomerVals.zipCode);
        }
    },[props.defaultCustomerVals]);

    function handleSave(e)
    {
        e.preventDefault();
        const body = {
            "companyName": customerName,
            "addressLine1": customerAddressLine1,
            "addressLine2": customerAddressLine2,
            "city": customerCity,
            "state": customerState,
            "zipCode": customerZip,
            "emailAddress": "",
            "phoneNumber": "",
            "companyLogo": ""
        };

        props.handleSave(e, body);
    }

    const btn_class = props.handleDelete !== undefined
        ? "col-6"
        : "col-12";
    
    return(
        <div className="col-xl-4 col-md-8 col-sm-12 creation-page">
            <div className="col-12">
                <h1 className="form-name">{props.cmd} Customer</h1>
                <hr />
                <Form onSubmit={(e) => handleSave(e)}>
                    <div className="form-group">
                        <label htmlFor="inputName">Customer Name</label>
                        <input value={customerName || ""} required={true} onChange={(e) => setCustomerName(e.target.value)} type="text" className="form-control" id="inputName" />
                    </div>
                    <div className="form-group">
                        <label htmlFor="inputAddress">Address Line 1</label>
                        <input value={customerAddressLine1 || ""} required={true} onChange={(e) => setCustomerAdd1(e.target.value)} type="text" className="form-control" id="inputAddress" placeholder="1234 Main St" />
                    </div>
                    <div className="form-group">
                        <label htmlFor="inputAddress2">Address Line 2</label>
                        <input value={customerAddressLine2 || ""} onChange={(e) => setCustomerAdd2(e.target.value)} type="text" className="form-control" id="inputAddress2" placeholder="Apartment, studio, or floor" />
                    </div>
                    <div className="form-row">
                        <div className="form-group col-md-6">
                            <label htmlFor="inputCity">City</label>
                            <input value={customerCity || ""} onChange={(e) => setCustomerCity(e.target.value)} type="text" className="form-control" id="inputCity" />
                        </div>
                        <div className="form-group col-md-4">
                            <label htmlFor="inputState">State</label>
                            <input value={customerState || ""} onChange={(e) => setCustomerState(e.target.value)} type="text" className="form-control" id="inputState" />
                        </div>
                        <div className="form-group col-md-2">
                            <label htmlFor="inputZip">Zip</label>
                            <input value={customerZip || ""} onChange={(e) => setCustomerZip(e.target.value)} type="text" className="form-control" id="inputZip" />
                        </div>
                    </div>
                    <div className="col-lg-12">
                        <div className="row">
                            <div className={btn_class}>
                                <Button type="submit" className="btn btn-success col-12">Save</Button>
                            </div>

                            {
                                props.handleDelete !== undefined 
                                ?   <div className={btn_class}>
                                        <Button onClick={(e) => props.handleDelete(e)} type="button" className="btn btn-danger col-12">Delete</Button>
                                    </div>
                                : <div></div>
                            }
                        </div>
                    </div>
                </Form>
            </div>
        </div>
    )
}

export default CustomerMaker;