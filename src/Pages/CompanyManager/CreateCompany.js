import React, {useState} from 'react';
import { Form, Button } from 'react-bootstrap';
import axios from 'axios';
import './CompanyForms.css';

function CreateCompany()
{
    const [companyName, setCompanyName] = useState("");
    const [companyEmail, setCompanyEmail] = useState("");
    const [companyPhone, setCompanyPhone] = useState("");
    const [companyAddressLine1, setCompanyAdd1] = useState("");
    const [companyAddressLine2, setCompanyAdd2] = useState("");
    const [companyCity, setCompanyCity] = useState("");
    const [companyState, setCompanyState] = useState("");
    const [companyZip, setCompanyZip] = useState("");
    
    async function submitHandle(e)
    {
        e.preventDefault();
        const url = "https://localhost:44383/api/Company/NewCompany";
        const token = "";

        const headers = {
            'Authorization': `Bearer ${token}`
        };

        const body = {
            "companyName": companyName,
            "addressLine1": companyAddressLine1,
            "addressLine2": companyAddressLine2,
            "city": companyCity,
            "state": companyState,
            "zipCode": companyZip,
            "emailAddress": companyEmail,
            "phoneNumber": companyPhone
        };
        
        //const res = await axios.post(url, body, {headers});
        console.log(body);
    }

    return(
        <div className="col-lg-4 col-md-8 col-sm-12 creation-page">
            <h1>Create New Company</h1>

            <Form>
                <div className="form-group">
                    <label htmlFor="inputName">Company Name</label>
                    <input onChange={(e) => setCompanyName(e.target.value)} type="text" className="form-control" id="inputName" />
                </div>
                <div className="form-row">
                    <div className="form-group col-md-6">
                        <label htmlFor="inputEmail4">Email</label>
                        <input onChange={(e) => setCompanyEmail(e.target.value)} type="email" className="form-control" id="inputEmail4" />
                    </div>
                    <div className="form-group col-md-6">
                        <label htmlFor="inputPassword4">Telephone</label>
                        <input onChange={(e) => setCompanyPhone(e.target.value)} type="tel" className="form-control" id="inputPassword4" />
                    </div>
                </div>
                <div className="form-group">
                    <label htmlFor="inputAddress">Address Line 1</label>
                    <input onChange={(e) => setCompanyAdd1(e.target.value)} type="text" className="form-control" id="inputAddress" placeholder="1234 Main St" />
                </div>
                <div className="form-group">
                    <label htmlFor="inputAddress2">Address Line 2</label>
                    <input onChange={(e) => setCompanyAdd2(e.target.value)} type="text" className="form-control" id="inputAddress2" placeholder="Apartment, studio, or floor" />
                </div>
                <div className="form-row">
                    <div className="form-group col-md-6">
                        <label htmlFor="inputCity">City</label>
                        <input onChange={(e) => setCompanyCity(e.target.value)} type="text" className="form-control" id="inputCity" />
                    </div>
                    <div className="form-group col-md-4">
                        <label htmlFor="inputState">State</label>
                        <input onChange={(e) => setCompanyState(e.target.value)} type="text" className="form-control" id="inputState" />
                    </div>
                    <div className="form-group col-md-2">
                        <label htmlFor="inputZip">Zip</label>
                        <input onChange={(e) => setCompanyZip(e.target.value)} type="text" className="form-control" id="inputZip" />
                    </div>
                </div>
                <Button type="submit" className="btn btn-primary">Create</Button>
            </Form>

        </div>
    );
}

export default CreateCompany;