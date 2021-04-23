import React, {useState, useEffect} from 'react';
import { useParams } from 'react-router';
import { useHistory } from 'react-router-dom'
import axios from 'axios';
import CompanyMaker from '../../Components/CompanyMaker';
import NotFoundPage from '../NotFoundPage';

function ViewCompany()
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
            const token = window.localStorage.getItem("TaveraInvoiceToken");
            const config = {headers: { Authorization: `Bearer ${token}` }}

            const url = process.env.REACT_APP_API_URL + "/Company/GetCompany/" + params.id;
            await axios.get(url, config)
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

    async function saveCompany(e, companyBody)
    {
        e.preventDefault();
        const token = window.localStorage.getItem("TaveraInvoiceToken");
        const config = {headers: { Authorization: `Bearer ${token}` }}

        const url = process.env.REACT_APP_API_URL + "/Company/UpdateCompany/" + params.id;
        
        await axios.put(url, companyBody, config)
            .then((res) => {
                if(res.status === 200)
                {
                    history.push("/Profile");
                }
            })
            .catch((err) => {
                setStatus(err.response.status);
            })
    }

    async function deleteCompany(e)
    {
        e.preventDefault();
        const token = window.localStorage.getItem("TaveraInvoiceToken");
        const config = {headers: { Authorization: `Bearer ${token}` }}

        const url = process.env.REACT_APP_API_URL + "/Company/DeleteCompany/" + params.id;
        await axios.delete(url, config)
        .then((res) => {
            if(res.status === 200)
            {
                history.push("/Profile");
            }
        })
        .catch((err) => {
            setStatus(err.response.status);
        })
    }

    return(
        <div>
            {isLoaded ?
                <div>
                    {status === 200 
                        ? <CompanyMaker handleSave={saveCompany} handleDelete={deleteCompany} cmd="Edit" defaultCompanyVals={targetCompany} />
                        : <NotFoundPage />
                    }
                </div>
            : <div style={{"color": "white"}}>Loading...</div>}
        </div>
    );
}

export default ViewCompany;