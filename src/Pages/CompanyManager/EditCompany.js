import React, {useState, useEffect} from 'react';
import { useParams } from 'react-router';
import { useHistory } from 'react-router-dom'
import axios from 'axios';
import CompanyMaker from '../../Components/CompanyMaker';

function EditCompany()
{    
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
            
            await axios.get(url, {withCredentials: true})
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
    },[params.id]);

    async function updateCompany(e, companyBody)
    {
        e.preventDefault();
        const url = "https://localhost:44383/api/Company/UpdateCompany/" + params.id;
        
        await axios.put(url, companyBody, {withCredentials: true})
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
                        ? <CompanyMaker handleSubmit={updateCompany} defaultCompanyVals={targetCompany} />
                        : <div>404</div>
                    }
                </div>
            : <div>Loading...</div>}
        </div>
    );
}

export default EditCompany;