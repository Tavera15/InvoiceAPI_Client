import React, {useState, useEffect} from 'react';
import axios from 'axios';

function InvoiceTable()
{
    const [allInvoices, setAllInvoices] = useState([]);
    const [invoicesDisplayed, setDisplayedInvoices] = useState([]);
    const [invoiceInputText, setInvoiceInputText] = useState("");

    useEffect(() => {
        async function getInvoices()
        {
            const url = "https://localhost:44383/api/Invoice/GetInvoices";
            await axios.get(url, {withCredentials: true})
            .then((res) => {
                setAllInvoices(res.data);
            })
        }
        
        getInvoices();
    }, []);

    useEffect(() => {
        setDisplayedInvoices(allInvoices);
    }, [allInvoices])

    useEffect(() => {
        const res = invoiceInputText !== "" 
            ? allInvoices
                .filter((c) => 
                    c.id.includes(invoiceInputText)
                    || c.companyName.toLowerCase().includes(invoiceInputText.toLowerCase()
                    || c.customerName.toLowerCase().includes(invoiceInputText.toLowerCase())))
            : allInvoices;

        setDisplayedInvoices(res)

    }, [invoiceInputText, allInvoices])

    return(
        <div className="col-lg-8 col-sm-12" style={{"margin": "20px auto 0"}}>
            <input onChange={(e) => setInvoiceInputText(e.target.value)} style={{"border": "solid black 1px", "width": "100%"}} placeholder="Search"/>

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