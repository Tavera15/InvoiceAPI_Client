import React from 'react';
import CustomerMaker from '../../Components/CustomerMaker';
import { useHistory } from 'react-router-dom'
import axios from 'axios';

function CreateCustomer()
{
    const history = useHistory();
    
    async function createNewCustomer(e, companyBody)
    {
        e.preventDefault();
        const token = window.localStorage.getItem("TaveraInvoiceToken");
        const config = {headers: { Authorization: `Bearer ${token}` }}

        const url = process.env.REACT_APP_API_URL + "/Customer/NewCustomer";
        await axios.post(url, companyBody, config)
            .then((res) => {
                if(res.status === 201)
                {
                    history.push("/Profile");
                }
            })
    }

    return(
        <div>
            <CustomerMaker handleSave={createNewCustomer} cmd="Create" />
        </div>
    );
}

export default CreateCustomer;