import React, {useRef, useState, useEffect} from "react";
import { useHistory, useParams } from "react-router";
import { useReactToPrint } from 'react-to-print';
import Invoice from "../../Components/Invoice";
import axios from 'axios';
import "../../Components/Styles/CompanyForms.css";
import InvoiceMaker from "../../Components/InvoiceMaker";

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
            const url = "https://localhost:44383/api/Invoice/GetInvoice/" + params.id;            

            await axios.get(url, {withCredentials: true})
                .then((res) => {
                    setInvoiceData(res.data)
                    setLoadStatus(res.status);
                })
                .catch((err) => {
                    setLoadStatus(err.response.status);
                })
                .finally(() => {
                    setIsLoaded(true);
                })
        }
        
        getInvoiceData();
    },[params.id]);

    async function saveInvoice(e, invoiceBody)
    {
        e.preventDefault();

        const url = "https://localhost:44383/api/Invoice/UpdateInvoice/" + params.id;

        await axios.put(url, invoiceBody, {withCredentials: true})
            .then((res) => {
                if(res.status === 200)
                {
                    history.push("/Profile")
                }
            })
    }

    async function deleteInvoice(e)
    {
        e.preventDefault();
        const url = "https://localhost:44383/api/Invoice/DeleteInvoice/" + params.id;

        await axios.delete(url, {withCredentials: true})
            .then((res) => {
                if(res.status === 200)
                {
                    history.push("/Profile")
                }
            })
    }

    return(
        <div>
            {isLoaded ? 
                <div >
                    {loadStatus === 200 ?
                        <div>
                            {invoiceData.isFinalized ?
                                <div className="col-lg-12 view-invoice">
                                    <button
                                        type="button"
                                        className="bg-gray-500 border border-gray-500 p-2 mb-4"
                                        onClick={handlePrint}>
                                        {" "}
                                        Print Invoice{" "}
                                    </button>
                                    <Invoice data={invoiceData} ref={componentRef} />
                                </div>

                                : <InvoiceMaker defaultInvoiceVals={invoiceData} cmd="Edit" handleSave={saveInvoice} handleDelete={deleteInvoice}/>
                            }
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