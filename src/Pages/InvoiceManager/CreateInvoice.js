import React from 'react';
import axios from 'axios';
import InvoiceMaker from '../../Components/InvoiceMaker';
import { useHistory } from 'react-router-dom'

function CreateInvoice()
{
    const history = useHistory();

    async function createNewInvoice(e, invoiceBody)
    {
        e.preventDefault();

        const url = "https://localhost:44383/api/Invoice/NewInvoice";

        await axios.post(url, invoiceBody, {withCredentials: true})
        .then((res) => {
            if(res.status === 201)
            {
                history.push("/CompanyManager")
            }
        })
        .catch((err) => {

        })
    }

    return(
        <div>
            <h1>Create Invoice</h1>
            <InvoiceMaker handleSubmit={createNewInvoice} />
        </div>
    );
}

export default CreateInvoice;