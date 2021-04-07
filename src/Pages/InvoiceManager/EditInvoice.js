import React, {useState, useEffect} from 'react';
import axios from 'axios';
import { useParams } from 'react-router';
import { useHistory } from 'react-router-dom'
import InvoiceMaker from '../../Components/InvoiceMaker';

function EditInvoice()
{   
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
            await axios.get(url, {withCredentials: true})
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
                if(!isCancelled)
                {
                    setLoadStatus(err.response.status);
                }
            })
            .finally(() => {
                if(!isCancelled)
                {
                    setIsLoaded(true);
                }
            })
        }
        
        getInvoice();

    }, [params.id, loadStatus, history]);


    async function updateInvoice(e, invoiceBody)
    {
        e.preventDefault();
        
        const url = "https://localhost:44383/api/Invoice/UpdateInvoice/" + params.id;
        await axios.put(url, invoiceBody, {withCredentials: true})
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
                        ? <InvoiceMaker handleSubmit={updateInvoice} defaultInvoiceVals={invoiceVals} />
                        : <div>404</div>
                    }
                </div>
                
                : <div>Loading...</div>
            }
        </div>
        
    );
}

export default EditInvoice;