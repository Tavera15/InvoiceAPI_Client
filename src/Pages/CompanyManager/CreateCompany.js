import React, {useMemo} from 'react';
import axios from 'axios';
import CompanyMaker from '../../Components/CompanyMaker';
import { useHistory } from 'react-router-dom'

function CreateCompany()
{
    const history = useHistory();
    const token = "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJzdWIiOiI4NWI3N2YwZC0xN2YyLTQxNzgtODZmOS00YTA2MGQ1Mzc5YzQiLCJodHRwOi8vc2NoZW1hcy54bWxzb2FwLm9yZy93cy8yMDA1LzA1L2lkZW50aXR5L2NsYWltcy9uYW1lIjoiYW5uaWVAZXhhbXBsZS5jb20iLCJqdGkiOiJhNWU0NjIyOC04N2U0LTRhMTAtYjY0ZS1lM2Q0Yzg4OTJmNjMiLCJodHRwOi8vc2NoZW1hcy54bWxzb2FwLm9yZy93cy8yMDA1LzA1L2lkZW50aXR5L2NsYWltcy9uYW1laWRlbnRpZmllciI6Ijg1Yjc3ZjBkLTE3ZjItNDE3OC04NmY5LTRhMDYwZDUzNzljNCIsImV4cCI6MTYxODg4MzgzNiwiaXNzIjoiaHR0cHM6Ly9sb2NhbGhvc3Q6NDQzODMiLCJhdWQiOiJodHRwczovL2xvY2FsaG9zdDo0NDM4MyJ9.f13mTxVbYNPyR3DAlb9MfO7wB_CBFtWxf7eXQ98V2sY";
    const headers = useMemo(() => {
        return {'Authorization': `Bearer ${token}`}
    }, []);
    
    async function createNewCompany(e, companyBody)
    {
        e.preventDefault();
        const url = "https://localhost:44383/api/Company/NewCompany";
        
        await axios.post(url, companyBody, {headers})
            .then((res) => {
                if(res.status === 201)
                {
                    history.push("/CompanyManager");
                }
            })
    }

    return(
        <div>
            <CompanyMaker handleSubmit={createNewCompany} token={token} />
        </div>
    );
}

export default CreateCompany;