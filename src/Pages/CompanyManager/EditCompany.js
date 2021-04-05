import React, {useState, useEffect, useMemo} from 'react';
import { useParams } from 'react-router';
import { useHistory } from 'react-router-dom'
import axios from 'axios';
import CompanyMaker from '../../Components/CompanyMaker';

function EditCompany()
{
    const token = "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJzdWIiOiI4NWI3N2YwZC0xN2YyLTQxNzgtODZmOS00YTA2MGQ1Mzc5YzQiLCJodHRwOi8vc2NoZW1hcy54bWxzb2FwLm9yZy93cy8yMDA1LzA1L2lkZW50aXR5L2NsYWltcy9uYW1lIjoiYW5uaWVAZXhhbXBsZS5jb20iLCJqdGkiOiJhNWU0NjIyOC04N2U0LTRhMTAtYjY0ZS1lM2Q0Yzg4OTJmNjMiLCJodHRwOi8vc2NoZW1hcy54bWxzb2FwLm9yZy93cy8yMDA1LzA1L2lkZW50aXR5L2NsYWltcy9uYW1laWRlbnRpZmllciI6Ijg1Yjc3ZjBkLTE3ZjItNDE3OC04NmY5LTRhMDYwZDUzNzljNCIsImV4cCI6MTYxODg4MzgzNiwiaXNzIjoiaHR0cHM6Ly9sb2NhbGhvc3Q6NDQzODMiLCJhdWQiOiJodHRwczovL2xvY2FsaG9zdDo0NDM4MyJ9.f13mTxVbYNPyR3DAlb9MfO7wB_CBFtWxf7eXQ98V2sY";
    const headers = useMemo(() => {
        return {'Authorization': `Bearer ${token}`}
    }, []);
    
    const params = useParams();
    const history = useHistory();
    const [isLoaded, setIsLoaded] = useState(false);
    const [status, setStatus] = useState();

    const [targetCompany, setTargetCompany] = useState({});

    useEffect(() => 
    {
        async function getCompany()
        {
            const url = "https://localhost:44383/api/Company/GetCompany/" + params.id;
            
            await axios.get(url, {headers})
                .then((res) => {
                    setTargetCompany(res.data);
                    setStatus(res.status);
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

    async function updateCompany(e, companyBody)
    {
        e.preventDefault();
        const url = "https://localhost:44383/api/Company/UpdateCompany/" + params.id;
        
        await axios.put(url, companyBody, {headers})
        .then((res) => {
            if(res.status === 200)
            {
                history.push("/CompanyManager");
            }
        })
        .catch((err) => {

        })
    }

    return(
        <div>
            {isLoaded ?
                <div>
                    {status === 200 
                        ? <CompanyMaker handleSubmit={updateCompany} defaultCompanyVals={targetCompany} token={token} />
                        : <div>404</div>
                    }
                </div>
            : <div>Loading...</div>}
        </div>
    );
}

export default EditCompany;