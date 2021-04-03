import React, {useRef, useState, useEffect} from "react";
import { useParams } from "react-router";
import { useReactToPrint } from 'react-to-print';
import Invoice from "../../Components/Invoice";
import axios from 'axios';

//https://www.youtube.com/watch?v=497riGWbhsQ

function ViewInvoice()
{
    const params = useParams();
    const componentRef = useRef();
    const handlePrint = useReactToPrint({
        content: () => componentRef.current,
    });

    const [invoiceData, setInvoiceData] = useState({});

    useEffect(() => {
        async function getInvoiceData()
        {
            const url = "https://localhost:44383/api/Invoice/GetInvoice/" + params.id;

            const headers = {
                'Authorization': `Bearer ${token}`
            };

            const res = await axios.get(url, {headers});

            if(res.status === 200)
            {
                setInvoiceData(res.data);
            }
        }
        
        getInvoiceData();
    },[params.id]);

    return(
        <div>
            {invoiceData.isFinalized ?
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
                
                : 
                    <div>
                        s
                    </div>
                }
            </div>
    );
}

export default ViewInvoice;