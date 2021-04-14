import React, {useState, useEffect} from 'react';
import axios from 'axios';
import BootstrapTable from 'react-bootstrap-table-next';
import paginationFactory from 'react-bootstrap-table2-paginator';
import {Link} from 'react-router-dom';

function CompanyTable()
{
    const [allCompanies, setAllCompanies] = useState([]);
    const [companiesDisplayed, setCompaniesDisplayed] = useState([]);
    const [inputCompanyText, setInputCompanyText] = useState("");

    useEffect(() => {
        async function getCompanies()
        {
            const token = window.localStorage.getItem("TaveraInvoiceToken");
            const config = {headers: { Authorization: `Bearer ${token}` }}

            const url = process.env.REACT_APP_API_URL + "/Company/GetCompanies";
            await axios.get(url, config)
            .then((res) => {
                setAllCompanies(res.data);
            })
        }
        
        getCompanies();
    }, []);

    useEffect(() => {
        const res = inputCompanyText !== "" 
            ? allCompanies.filter((c) => c.companyName.toLowerCase().includes(inputCompanyText.toLowerCase()))
            : allCompanies;

            setCompaniesDisplayed(res)
    }, [inputCompanyText, allCompanies])

    const columns = [
        {
            dataField: 'companyName',
            text: 'Company Name',
            classes: "align-middle",
            formatter: (row, rowContent) => rowContent.companyName
        }, 
        {
            dataField: 'actions',
            text: 'Actions',
            classes: "align-middle",
            formatter: (row, rowContent) => {
                return (
                    <div>
                        <Link to={"/CompanyManager/ViewCompany/" + rowContent.id} className="btn btn-default">View</Link>
                    </div>
                )
            }
        },
    ];

    return(
        <div>
            <div className="col-12" style={{"margin": "10px 0", "padding": "0"}}>
                <input onChange={(e) => setInputCompanyText(e.target.value)} style={{"border": "solid black 1px", "width": "100%"}} placeholder="Search"/>
            </div>

            <BootstrapTable headerClasses="thead-dark" rowClasses="align-items-center" keyField='id' classes="table table-borderless table-light table-striped" data={companiesDisplayed} columns={columns} pagination={paginationFactory({
                page: 0, // Specify the current page. It's necessary when remote is enabled
                sizePerPage: 10, // Specify the size per page. It's necessary when remote is enabled
                totalSize: companiesDisplayed.length, // Total data size. It's necessary when remote is enabled
                pageStartIndex: 1, // first page will be 0, default is 1
                paginationSize: 3,  // the pagination bar size, default is 5
                hideSizePerPage: true,
                sizePerPageList: [ {
                    text: '10', value: 10
                }, {
                    text: '25', value: 25
                }, {
                    text: 'All', value: companiesDisplayed.length
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

export default CompanyTable;