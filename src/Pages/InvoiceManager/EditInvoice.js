import React, {useState, useEffect, useMemo} from 'react';
import axios from 'axios';
import { useParams } from 'react-router';
import { useHistory } from 'react-router-dom'
import InvoiceMaker from '../../Components/InvoiceMaker';

function EditInvoice()
{
    const token = "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJzdWIiOiI4NWI3N2YwZC0xN2YyLTQxNzgtODZmOS00YTA2MGQ1Mzc5YzQiLCJodHRwOi8vc2NoZW1hcy54bWxzb2FwLm9yZy93cy8yMDA1LzA1L2lkZW50aXR5L2NsYWltcy9uYW1lIjoiYW5uaWVAZXhhbXBsZS5jb20iLCJqdGkiOiJhNWU0NjIyOC04N2U0LTRhMTAtYjY0ZS1lM2Q0Yzg4OTJmNjMiLCJodHRwOi8vc2NoZW1hcy54bWxzb2FwLm9yZy93cy8yMDA1LzA1L2lkZW50aXR5L2NsYWltcy9uYW1laWRlbnRpZmllciI6Ijg1Yjc3ZjBkLTE3ZjItNDE3OC04NmY5LTRhMDYwZDUzNzljNCIsImV4cCI6MTYxODg4MzgzNiwiaXNzIjoiaHR0cHM6Ly9sb2NhbGhvc3Q6NDQzODMiLCJhdWQiOiJodHRwczovL2xvY2FsaG9zdDo0NDM4MyJ9.f13mTxVbYNPyR3DAlb9MfO7wB_CBFtWxf7eXQ98V2sY";
    const headers = useMemo(() => {
        return {'Authorization': `Bearer ${token}`}
    }, []);
    
    const params = useParams();
    const history = useHistory();

    const [isLoaded, setIsLoaded] = useState(false);
    const [loadStatus, setLoadStatus] = useState(0);

    const [invoiceVals, setInvoiceVals] = useState({});
    
    useEffect(() => {
        async function getInvoice()
        {
            let isCancelled = false;

            const url = "https://localhost:44383/api/Invoice/GetInvoice/" + params.id;
            await axios.get(url, {headers})
            .then((res) => {

                if(res.data.isFinalized)
                {
                    history.push("/InvoiceManager/ViewInvoice/" + params.id);
                    isCancelled = true;
                }
                
                if(!isCancelled)
                {
                    setInvoiceVals(res.data);
                    setLoadStatus(res.status);
                }
            })
            .catch((err) => {
                setLoadStatus(err.response.status);
            })
            .finally(() => {
                setIsLoaded(true);
            })
        }
        
        getInvoice();

    }, [headers, params.id, loadStatus, history]);


    async function updateInvoice(e, invoiceBody)
    {
        e.preventDefault();
        
        const url = "https://localhost:44383/api/Invoice/UpdateInvoice/" + params.id;
        await axios.put(url, invoiceBody, {headers})
        .then((res) => {
            if(res.status === 200)
            {
                history.push("/CompanyManager");
            }
        })
        .catch((err) => {
            console.log(err)
        })
    }

    return(
        <div>
            {isLoaded ?
                <div>
                    <h1>Edit Invoice</h1>
                    {loadStatus === 200 
                        ? <InvoiceMaker handleSubmit={updateInvoice} defaultInvoiceVals={invoiceVals} token={token} />
                        : <div>404</div>
                    }
                </div>
                
                : <div>Loading...</div>
            }
        </div>
        
    );
}

export default EditInvoice;