import React, {useRef, useState, useEffect} from "react";
import { useHistory, useParams } from "react-router";
import { useReactToPrint } from 'react-to-print';
import Invoice from "../../Components/Invoice";
import axios from 'axios';
import "../../Components/Styles/CompanyForms.css";
import InvoiceMaker from "../../Components/InvoiceMaker";
import NotFoundPage from "../NotFoundPage";

function ViewInvoice()
{
    const [invoiceData, setInvoiceData] = useState({});    
    const [isLoaded, setIsLoaded] = useState(false);
    const [loadStatus, setLoadStatus] = useState();
    
    const history = useHistory();
    const params = useParams();
    const componentRef = useRef();
    const handlePrint = useReactToPrint({
        content: () => componentRef.current,
        documentTitle: "Invoice " + invoiceData.invoiceNumber
    });
    

    useEffect(() => {
        async function getInvoiceData()
        {
            const token = window.localStorage.getItem("TaveraInvoiceToken");
            const config = {headers: { Authorization: `Bearer ${token}` }}

            const url = process.env.REACT_APP_API_URL + "/Invoice/GetInvoice/" + params.id;            
            await axios.get(url, config)
                .then((res) => {
                    setInvoiceData(res.data);
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
        const token = window.localStorage.getItem("TaveraInvoiceToken");
        const config = {headers: { Authorization: `Bearer ${token}` }}

        const url = process.env.REACT_APP_API_URL + "/Invoice/UpdateInvoice/" + params.id;
        await axios.put(url, invoiceBody, config)
            .then((res) => {
                if(res.status === 200)
                {
                    if(!res.data.isFinalized)
                    {
                        history.push("/Profile");
                    }
                    else
                    {
                        window.location.reload();
                    }
                }
            })
            .catch((err) => {
                setLoadStatus(err.response.status)
            })
    }

    async function deleteInvoice(e)
    {
        e.preventDefault();
        const token = window.localStorage.getItem("TaveraInvoiceToken");
        const config = {headers: { Authorization: `Bearer ${token}` }}

        const url = process.env.REACT_APP_API_URL + "/Invoice/DeleteInvoice/" + params.id;
        await axios.delete(url, config)
            .then((res) => {
                if(res.status === 200)
                {
                    history.push("/Profile")
                }
            })
            .catch((err) => {
                setLoadStatus(err.response.status);
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
                                        className="p-2 mb-4 btn btn-success"
                                        onClick={handlePrint}>
                                        {" "}
                                        Print Invoice{" "}
                                    </button>
                                    <Invoice data={invoiceData} ref={componentRef} />
                                </div>

                                : <InvoiceMaker defaultInvoiceVals={invoiceData} cmd="Edit" handleSave={saveInvoice} handleDelete={deleteInvoice}/>
                            }
                        </div>
                    
                    : <NotFoundPage />
                    }
                </div>

                : <div style={{"color": "white"}}>Loading...</div>
            }
        </div>
    );
}

export default ViewInvoice;