import React, { useState, useEffect } from 'react';
import CustomerMaker from '../../Components/CustomerMaker';
import NotFoundPage from '../NotFoundPage';
import { useHistory } from 'react-router-dom';
import { useParams } from 'react-router';
import axios from 'axios';

function ViewCustomer()
{
    const history = useHistory();
    const params = useParams();
    const [isLoaded, setIsLoaded] = useState(false);
    const [status, setStatus] = useState();

    const[targerCustomer, setTargetCustomer] = useState({});

    useEffect(() => 
    {
        async function getCustomer()
        {
            const token = window.localStorage.getItem("TaveraInvoiceToken");
            const config = {headers: { Authorization: `Bearer ${token}` }}

            const url = process.env.REACT_APP_API_URL + "/Customer/GetCustomer/" + params.id;
            await axios.get(url, config)
                .then((res) => {
                    setTargetCustomer(res.data);
                    setStatus(res.status);
                })
                .catch((err) => {
                    setStatus(err.response.status);
                })
                .finally(() => {
                    setIsLoaded(true);
                })
        }
        
        getCustomer();
    },[params.id]);

    async function saveCustomer(e, companyBody)
    {
        e.preventDefault();
        const token = window.localStorage.getItem("TaveraInvoiceToken");
        const config = {headers: { Authorization: `Bearer ${token}` }}

        const url = process.env.REACT_APP_API_URL + "/Customer/UpdateCustomer/" + params.id;
        await axios.put(url, companyBody, config)
            .then((res) => {
                if(res.status === 200)
                {
                    history.push("/Profile");
                }
            })
            .catch((err) => {
                setStatus(err.response.status)
            })
    }

    async function deleteCustomer(e)
    {
        e.preventDefault();
        const token = window.localStorage.getItem("TaveraInvoiceToken");
        const config = {headers: { Authorization: `Bearer ${token}` }}

        const url = process.env.REACT_APP_API_URL + "/Customer/DeleteCustomer/" + params.id;
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
                        ? <CustomerMaker handleSave={saveCustomer} handleDelete={deleteCustomer} cmd="Edit" defaultCustomerVals={targerCustomer} />
                        : <NotFoundPage />
                    }
                </div>
            : <div style={{"color": "white"}}>Loading...</div>}
        </div>
    );
}

export default ViewCustomer;