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
        const url = "https://localhost:44383/api/Company/NewCompany";
        
        await axios.post(url, companyBody, {withCredentials: true})
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