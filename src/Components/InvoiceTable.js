import React, {useState, useEffect} from 'react';
import axios from 'axios';
import BootstrapTable from 'react-bootstrap-table-next';
import paginationFactory from 'react-bootstrap-table2-paginator';


function InvoiceTable()
{
    const [allInvoices, setAllInvoices] = useState([]);
    const [invoicesDisplayed, setDisplayedInvoices] = useState([]);
    const [invoiceInputText, setInvoiceInputText] = useState("");
    const [invoiceType, setInvoiceType] = useState("ALL");

    useEffect(() => {
        async function getInvoices()
        {
            const url = process.env.REACT_APP_API_URL + "/Invoice/GetInvoices";
            await axios.get(url, {withCredentials: true})
            .then((res) => {
                setAllInvoices(res.data);
            })
        }
        
        getInvoices();
    }, []);

    useEffect(() => {
        setDisplayedInvoices(allInvoices);
    }, [allInvoices])

    useEffect(() => {
        const textFilterInvoices = invoiceInputText !== "" 
            ? allInvoices
                .filter((c) => 
                    c.id.includes(invoiceInputText)
                    || c.companyName.toLowerCase().includes(invoiceInputText.toLowerCase())
                    || c.customerName.toLowerCase().includes(invoiceInputText.toLowerCase()))
            : allInvoices;

        let res = [];
        
        switch (invoiceType) {
            case "COMPLETE":
                res = textFilterInvoices.filter((i) => i.isFinalized);
                break;
            case "DRAFTS":
                res = textFilterInvoices.filter((i) => !i.isFinalized);
                break;
            default:
                res = textFilterInvoices;
                break;
        }
        
        setDisplayedInvoices(res)

    }, [invoiceInputText, allInvoices, invoiceType])

    const columns = [
        {
            dataField: 'companyName',
            text: 'Company Name',
            style:{borderBottom: "1px black solid"},
            classes: (row, rowContent) => {
                return (rowContent.isFinalized ? "table-success text-dark align-middle" : "table-warning text-dark align-middle")
            },
            formatter: (row, rowContent) => rowContent.companyName
        },
        {
            dataField: 'customerName',
            text: 'Customer Name',
            style:{borderBottom: "1px black solid"},
            classes: (row, rowContent) => {
                return (rowContent.isFinalized ? "table-success text-dark align-middle" : "table-warning text-dark align-middle")
            },
            formatter: (row, rowContent) => rowContent.customerName
        },
        {
            dataField: 'actions',
            text: 'Actions',
            style:{borderBottom: "1px black solid"},
            classes: (row, rowContent) => {
                return (rowContent.isFinalized ? "table-success text-dark align-middle" : "table-warning text-dark align-middle")
            },

            formatter: (row, rowContent) => {
                return (
                    <div>
                        <a href={"/InvoiceManager/ViewInvoice/" + rowContent.id} className="btn btn-default">View</a>
                    </div>
                )
            }
        },
    ];

    return(
        <div>
            <div className="col-12" style={{"margin": "10px 0", "padding": "0"}}>
                <div className="row">
                    <div className="col-8">
                        <input className="col-12" onChange={(e) => setInvoiceInputText(e.target.value)} style={{"border": "solid black 1px", "width": "100%"}} placeholder="Search"/>
                    </div>
                    <div className="col-4">
                        <select className="col-12" onChange={(e) => setInvoiceType(e.target.value)} name="invoiceChoice" id="invoice-choices">
                            <option value="ALL">All</option>
                            <option value="COMPLETE">Complete Only</option>
                            <option value="DRAFTS">Drafts Only</option>
                        </select>        
                    </div>
                </div>
            </div>

            <BootstrapTable headerClasses="thead-dark" rowClasses="align-items-center" keyField='id' classes="table table-light table-borderless table-striped table-responsive-xs" data={invoicesDisplayed} columns={columns} pagination={paginationFactory({
                page: 0, // Specify the current page. It's necessary when remote is enabled
                sizePerPage: 10, // Specify the size per page. It's necessary when remote is enabled
                totalSize: invoicesDisplayed.length, // Total data size. It's necessary when remote is enabled
                pageStartIndex: 1, // first page will be 0, default is 1
                paginationSize: 3,  // the pagination bar size, default is 5
                hideSizePerPage: true,
                sizePerPageList: [ {
                    text: '10', value: 10
                }, {
                    text: '25', value: 25
                }, {
                    text: 'All', value: invoicesDisplayed.length
                } ], // A numeric array is also available: [5, 10]. the purpose of above example is custom the text
                withFirstAndLast: false, // hide the going to first and last page button
                alwaysShowAllBtns: true, // always show the next and previous page button
                firstPageText: 'First', // the text of first page button
                prePageText: 'Prev', // the text of previous page button
                nextPageText: 'Next', // the text of next page button
                lastPageText: 'Last', // the text of last page button
                nextPageTitle: 'Go to next', // the title of next page button
                prePageTitle: 'Go to previous', // the title of previous page button
                hidePageListOnlyOnePage: true, // hide pagination bar when only one page, default is false
            }) } />
        </div>
    )
}

export default InvoiceTable;