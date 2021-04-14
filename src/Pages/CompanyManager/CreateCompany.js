import React from 'react';
import axios from 'axios';
import CompanyMaker from '../../Components/CompanyMaker';
import { useHistory } from 'react-router-dom'

function CreateCompany()
{
    const history = useHistory();
    
    async function createNewCompany(e, companyBody)
    {
        e.preventDefault();
        const token = window.localStorage.getItem("TaveraInvoiceToken");
        const config = {headers: { Authorization: `Bearer ${token}` }}

        const url = process.env.REACT_APP_API_URL + "/Company/NewCompany";
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
            <CompanyMaker handleSave={createNewCompany} cmd="Create" />
        </div>
    );
}

export default CreateCompany;