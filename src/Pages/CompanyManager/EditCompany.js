import React, {useState, useEffect, useMemo} from 'react';
import { useParams } from 'react-router';
import { useHistory } from 'react-router-dom'
import { Form, Button } from 'react-bootstrap';
import axios from 'axios';
import './CompanyForms.css';

function EditCompany()
{
    const token = "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJzdWIiOiI4NWI3N2YwZC0xN2YyLTQxNzgtODZmOS00YTA2MGQ1Mzc5YzQiLCJodHRwOi8vc2NoZW1hcy54bWxzb2FwLm9yZy93cy8yMDA1LzA1L2lkZW50aXR5L2NsYWltcy9uYW1lIjoiYW5uaWVAZXhhbXBsZS5jb20iLCJqdGkiOiJhNWU0NjIyOC04N2U0LTRhMTAtYjY0ZS1lM2Q0Yzg4OTJmNjMiLCJodHRwOi8vc2NoZW1hcy54bWxzb2FwLm9yZy93cy8yMDA1LzA1L2lkZW50aXR5L2NsYWltcy9uYW1laWRlbnRpZmllciI6Ijg1Yjc3ZjBkLTE3ZjItNDE3OC04NmY5LTRhMDYwZDUzNzljNCIsImV4cCI6MTYxODg4MzgzNiwiaXNzIjoiaHR0cHM6Ly9sb2NhbGhvc3Q6NDQzODMiLCJhdWQiOiJodHRwczovL2xvY2FsaG9zdDo0NDM4MyJ9.f13mTxVbYNPyR3DAlb9MfO7wB_CBFtWxf7eXQ98V2sY";

    const headers = useMemo(() => {
        return {'Authorization': `Bearer ${token}`}
    }, []);

    const [companyName, setCompanyName] = useState("");
    const [companyEmail, setCompanyEmail] = useState("");
    const [companyPhone, setCompanyPhone] = useState("");
    const [companyAddressLine1, setCompanyAdd1] = useState("");
    const [companyAddressLine2, setCompanyAdd2] = useState("");
    const [companyCity, setCompanyCity] = useState("");
    const [companyState, setCompanyState] = useState("");
    const [companyZip, setCompanyZip] = useState("");
    
    const params = useParams();
    const history = useHistory();
    const [isLoaded, setIsLoaded] = useState(false);
    const [status, setStatus] = useState();

    useEffect(() => 
    {
        async function getCompany()
        {
            const url = "https://localhost:44383/api/Company/GetCompany/" + params.id;
            
            await axios.get(url, {headers})
                .then((res) => {
                    setStatus(res.status);

                    setCompanyName(res.data.companyName);
                    setCompanyAdd1(res.data.addressLine1);
                    setCompanyAdd2(res.data.addressLine2);
                    setCompanyCity(res.data.city);
                    setCompanyState(res.data.state);
                    setCompanyZip(res.data.zipCode);
                    setCompanyEmail(res.data.emailAddress);
                    setCompanyPhone(res.data.phoneNumber);
                })
                .catch((err) => {
                    setStatus(err.response.status);
                })
                .finally(() => {
                    setIsLoaded(true);
                })
        }
        
        getCompany();
    },[params.id, headers]);

    async function submitHandle(e)
    {
        e.preventDefault();
        const url = "https://localhost:44383/api/Company/UpdateCompany";

        const body = {
            "entityIdToUpdate": params.id,
            "companyName": companyName,
            "addressLine1": companyAddressLine1,
            "addressLine2": companyAddressLine2,
            "city": companyCity,
            "state": companyState,
            "zipCode": companyZip,
            "emailAddress": companyEmail,
            "phoneNumber": companyPhone
        };
        
        const res = await axios.put(url, body, {headers});

        if(res.status === 200)
        {
            history.push("/CompanyManager");
        }
    }

    return(
        <div>
            {isLoaded ?
                <div>
                    {status === 200 ?
                        <div className="col-lg-4 col-md-8 col-sm-12 creation-page">
                            <h1>Edit Company</h1>

                            <Form onSubmit={submitHandle}>
                                <div className="form-group">
                                    <label htmlFor="inputName">Company Name</label>
                                    <input value={companyName} onChange={(e) => setCompanyName(e.target.value)} type="text" className="form-control" id="inputName" />
                                </div>
                                <div className="form-row">
                                    <div className="form-group col-md-6">
                                        <label htmlFor="inputEmail4">Email</label>
                                        <input value={companyEmail} onChange={(e) => setCompanyEmail(e.target.value)} type="email" className="form-control" id="inputEmail4" />
                                    </div>
                                    <div className="form-group col-md-6">
                                        <label htmlFor="inputPassword4">Telephone</label>
                                        <input value={companyPhone} onChange={(e) => setCompanyPhone(e.target.value)} type="tel" className="form-control" id="inputPassword4" />
                                    </div>
                                </div>
                                <div className="form-group">
                                    <label htmlFor="inputAddress">Address Line 1</label>
                                    <input value={companyAddressLine1} onChange={(e) => setCompanyAdd1(e.target.value)} type="text" className="form-control" id="inputAddress" placeholder="1234 Main St" />
                                </div>
                                <div className="form-group">
                                    <label htmlFor="inputAddress2">Address Line 2</label>
                                    <input value={companyAddressLine2} onChange={(e) => setCompanyAdd2(e.target.value)} type="text" className="form-control" id="inputAddress2" placeholder="Apartment, studio, or floor" />
                                </div>
                                <div className="form-row">
                                    <div className="form-group col-md-6">
                                        <label htmlFor="inputCity">City</label>
                                        <input value={companyCity} onChange={(e) => setCompanyCity(e.target.value)} type="text" className="form-control" id="inputCity" />
                                    </div>
                                    <div className="form-group col-md-4">
                                        <label htmlFor="inputState">State</label>
                                        <input value={companyState} onChange={(e) => setCompanyState(e.target.value)} type="text" className="form-control" id="inputState" />
                                    </div>
                                    <div className="form-group col-md-2">
                                        <label htmlFor="inputZip">Zip</label>
                                        <input value={companyZip} onChange={(e) => setCompanyZip(e.target.value)} type="text" className="form-control" id="inputZip" />
                                    </div>
                                </div>
                                <Button type="submit" className="btn btn-success">Save</Button>
                            </Form>
                        </div>

                        : <div>404</div>
                    }
                </div>
            : <div>Loading...</div>}
        </div>
    );
}

export default EditCompany;