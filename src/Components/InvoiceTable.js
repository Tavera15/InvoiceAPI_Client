import React, {useState, useEffect} from 'react';
import axios from 'axios';

function InvoiceTable()
{
    const [allInvoices, setAllInvoices] = useState([]);
    const [invoicesDisplayed, setDisplayedInvoices] = useState([]);
    const [companyInputText, setCompanyInputText] = useState("");

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
                            <td>{c.companyName}</td>
                            <td>
                                <button className="btn">Edit</button>
                                <button className="btn">Delete</button>
                            </td>
                        </tr>
                    )}
                </tbody>
            </table>
        </div>
    )
}

export default InvoiceTable;