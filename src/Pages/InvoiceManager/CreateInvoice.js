import React from 'react';
import axios from 'axios';
import InvoiceMaker from '../../Components/InvoiceMaker';
import { useHistory } from 'react-router-dom';

function CreateInvoice()
{
    const history = useHistory();

    async function createNewInvoice(e, invoiceBody)
    {
        e.preventDefault();
        const token = window.localStorage.getItem("TaveraInvoiceToken");
        const config = {headers: { Authorization: `Bearer ${token}` }}
        
        const url = process.env.REACT_APP_API_URL + "/Invoice/NewInvoice";
        await axios.post(url, invoiceBody, config)
            .then((res) => {
                if(res.status === 201)
                {
                    if(res.data.isFinalized)
                    {
                        history.push("/InvoiceManager/ViewInvoice/" + res.data.id);
                    }
                    else
                    {
                        history.push("/Profile")
                    }
                }
            })
    }

    return(
        <div>
            <InvoiceMaker cmd="Create" handleSave={createNewInvoice} />
        </div>
    );
}

export default CreateInvoice;