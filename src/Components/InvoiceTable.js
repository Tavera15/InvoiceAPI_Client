import React, {useState, useEffect} from 'react';
import axios from 'axios';

function InvoiceTable()
{
    const [allInvoices, setAllInvoices] = useState([]);
    const [invoicesDisplayed, setDisplayedInvoices] = useState([]);
    const [companyInputText, setCompanyInputText] = useState("");
    const token = "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJzdWIiOiI4NWI3N2YwZC0xN2YyLTQxNzgtODZmOS00YTA2MGQ1Mzc5YzQiLCJodHRwOi8vc2NoZW1hcy54bWxzb2FwLm9yZy93cy8yMDA1LzA1L2lkZW50aXR5L2NsYWltcy9uYW1lIjoiYW5uaWVAZXhhbXBsZS5jb20iLCJqdGkiOiJhNWU0NjIyOC04N2U0LTRhMTAtYjY0ZS1lM2Q0Yzg4OTJmNjMiLCJodHRwOi8vc2NoZW1hcy54bWxzb2FwLm9yZy93cy8yMDA1LzA1L2lkZW50aXR5L2NsYWltcy9uYW1laWRlbnRpZmllciI6Ijg1Yjc3ZjBkLTE3ZjItNDE3OC04NmY5LTRhMDYwZDUzNzljNCIsImV4cCI6MTYxODg4MzgzNiwiaXNzIjoiaHR0cHM6Ly9sb2NhbGhvc3Q6NDQzODMiLCJhdWQiOiJodHRwczovL2xvY2FsaG9zdDo0NDM4MyJ9.f13mTxVbYNPyR3DAlb9MfO7wB_CBFtWxf7eXQ98V2sY";

    useEffect(() => {
        async function getInvoices()
        {
            const url = "https://localhost:44383/api/Invoice/GetInvoices";

            const headers = {
                'Authorization': `Bearer ${token}`
            };

            const res = await axios.get(url, {headers});
            setAllInvoices(res.data);
        }
        
        getInvoices();
    }, []);

    useEffect(() => {
        setDisplayedInvoices(allInvoices);
    }, [allInvoices])

    return(
        <div className="col-lg-8 col-sm-12" style={{"margin": "20px auto 0"}}>
            <input onChange={(e) => setCompanyInputText(e.target.value)} style={{"border": "solid black 1px", "width": "100%"}} placeholder="Search"/>

            <table className="table">
                <thead className="thead-dark">
                    <tr>
                        <th scope="col">Company Name</th>
                        <th scope="col">Actions</th>
                    </tr>
                </thead>
                <tbody>
                    {invoicesDisplayed.map((c, i) => 
                        <tr key={i}>
                            <td className="align-middle">{c.companyName}</td>
                            <td>
                                <a href={"/InvoiceManager/EditInvoice/" + c.id} className="btn">Edit</a>
                                <a href={"/InvoiceManager/DeleteInvoice/" + c.id} className="btn">Delete</a>
                            </td>
                        </tr>
                    )}
                </tbody>
            </table>
        </div>
    )
}

export default InvoiceTable;