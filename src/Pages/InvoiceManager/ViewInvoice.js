import React, {useRef, useState, useEffect} from "react";
import { useHistory, useParams } from "react-router";
import { useReactToPrint } from 'react-to-print';
import Invoice from "../../Components/Invoice";
import axios from 'axios';

//https://www.youtube.com/watch?v=497riGWbhsQ

function ViewInvoice()
{
    const history = useHistory();
    const params = useParams();
    const componentRef = useRef();
    const handlePrint = useReactToPrint({
        content: () => componentRef.current,
    });
    
    const [invoiceData, setInvoiceData] = useState({});
    const token = "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJzdWIiOiI4NWI3N2YwZC0xN2YyLTQxNzgtODZmOS00YTA2MGQ1Mzc5YzQiLCJodHRwOi8vc2NoZW1hcy54bWxzb2FwLm9yZy93cy8yMDA1LzA1L2lkZW50aXR5L2NsYWltcy9uYW1lIjoiYW5uaWVAZXhhbXBsZS5jb20iLCJqdGkiOiJhNWU0NjIyOC04N2U0LTRhMTAtYjY0ZS1lM2Q0Yzg4OTJmNjMiLCJodHRwOi8vc2NoZW1hcy54bWxzb2FwLm9yZy93cy8yMDA1LzA1L2lkZW50aXR5L2NsYWltcy9uYW1laWRlbnRpZmllciI6Ijg1Yjc3ZjBkLTE3ZjItNDE3OC04NmY5LTRhMDYwZDUzNzljNCIsImV4cCI6MTYxODg4MzgzNiwiaXNzIjoiaHR0cHM6Ly9sb2NhbGhvc3Q6NDQzODMiLCJhdWQiOiJodHRwczovL2xvY2FsaG9zdDo0NDM4MyJ9.f13mTxVbYNPyR3DAlb9MfO7wB_CBFtWxf7eXQ98V2sY";
    
    const [isLoaded, setIsLoaded] = useState(false);
    const [loadStatus, setLoadStatus] = useState();

    useEffect(() => {
        async function getInvoiceData()
        {
            let isCancelled = false;
            
            const url = "https://localhost:44383/api/Invoice/GetInvoice/" + params.id;
            const headers = {
                'Authorization': `Bearer ${token}`
            };

            await axios.get(url, {headers})
                .then((res) => {
                    if(!res.data.isFinalized)
                    {
                        isCancelled = true;
                        history.push("/InvoiceManager/EditInvoice/" + params.id)
                    }

                    if(!isCancelled)
                    {
                        setInvoiceData(res.data)
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
        
        getInvoiceData();
    },[params.id, history]);

    return(
        <div>
            {isLoaded ? 
                <div>
                    {loadStatus === 200 ?
                        <div>
                            <button
                                type="button"
                                className="bg-gray-500 border border-gray-500 p-2 mb-4"
                                onClick={handlePrint}>
                                {" "}
                                Print Invoice{" "}
                            </button>
                            <Invoice data={invoiceData} ref={componentRef} />
                        </div>
                    
                    : <div>404</div>
                    }
                </div>

                : <div>Loading...</div>
            }
        </div>
            
    );
}

export default ViewInvoice;