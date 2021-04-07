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
    const [isLoaded, setIsLoaded] = useState(false);
    const [loadStatus, setLoadStatus] = useState();

    useEffect(() => {
        async function getInvoiceData()
        {
            let isCancelled = false;
            const url = "https://localhost:44383/api/Invoice/GetInvoice/" + params.id;            

            await axios.get(url, {withCredentials: true})
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