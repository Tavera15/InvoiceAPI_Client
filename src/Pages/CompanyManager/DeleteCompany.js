import React, {useState, useEffect, useMemo} from 'react';
import { useParams } from 'react-router';
import { useHistory } from 'react-router-dom'
import { Form, Button } from 'react-bootstrap';
import axios from 'axios';

function DeleteCompany()
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
        const url = "https://localhost:44383/api/Company/DeleteCompany/" + params.id;
        
        await axios.delete(url, {headers})
        .then((res) => {
            if(res.status === 200)
            {
                history.push("/CompanyManager");
            }
        })
        .catch((err) => {
            console.log(err.response);
        })
    }

    return(
        <div>
            {isLoaded ?
                <div>
                    {status === 200 ?
                        <div className="col-lg-4 col-md-8 col-sm-12 creation-page">
                            <h1>Delete Company</h1>

                            <Form onSubmit={submitHandle}>
                                <div className="form-group">
                                    <label htmlFor="inputName">Company Name</label>
                                    <input readOnly value={companyName} type="text" className="form-control" id="inputName" />
                                </div>
                                <div className="form-row">
                                    <div className="form-group col-md-6">
                                        <label htmlFor="inputEmail4">Email</label>
                                        <input readOnly value={companyEmail} type="email" className="form-control" id="inputEmail4" />
                                    </div>
                                    <div className="form-group col-md-6">
                                        <label htmlFor="inputPassword4">Telephone</label>
                                        <input readOnly value={companyPhone} type="tel" className="form-control" id="inputPassword4" />
                                    </div>
                                </div>
                                <div className="form-group">
                                    <label htmlFor="inputAddress">Address Line 1</label>
                                    <input readOnly value={companyAddressLine1} type="text" className="form-control" id="inputAddress" placeholder="1234 Main St" />
                                </div>
                                <div className="form-group">
                                    <label htmlFor="inputAddress2">Address Line 2</label>
                                    <input readOnly value={companyAddressLine2} type="text" className="form-control" id="inputAddress2" placeholder="Apartment, studio, or floor" />
                                </div>
                                <div className="form-row">
                                    <div className="form-group col-md-6">
                                        <label htmlFor="inputCity">City</label>
                                        <input readOnly value={companyCity} type="text" className="form-control" id="inputCity" />
                                    </div>
                                    <div className="form-group col-md-4">
                                        <label htmlFor="inputState">State</label>
                                        <input readOnly value={companyState} type="text" className="form-control" id="inputState" />
                                    </div>
                                    <div className="form-group col-md-2">
                                        <label htmlFor="inputZip">Zip</label>
                                        <input readOnly value={companyZip} type="text" className="form-control" id="inputZip" />
                                    </div>
                                </div>
                                <Button type="submit" className="btn btn-danger">Delete</Button>
                            </Form>
                        </div>

                        : <div>404</div>
                    }
                </div>
            : <div>Loading...</div>}
        </div>
    );
}

export default DeleteCompany;