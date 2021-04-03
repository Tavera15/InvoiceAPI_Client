import React, {useState, useEffect} from 'react';
import axios from 'axios';

function CompanyTable()
{
    const [allCompanies, setAllCompanies] = useState([]);
    const [companiesDisplayed, setCompaniesDisplayed] = useState([]);
    const [inputCompanyText, setInputCompanyText] = useState("");

    useEffect(() => {
        async function getCompanies()
        {
            const url = "https://localhost:44383/api/Company/GetCompanies";

            const headers = {
                'Authorization': `Bearer ${token}`
            };

            const res = await axios.get(url, {headers});
            setAllCompanies(res.data);
        }
        
        getCompanies();
    }, []);

    useEffect(() => {
        const res = inputCompanyText !== "" 
            ? allCompanies.filter((c) => c.companyName.toLowerCase().includes(inputCompanyText.toLowerCase()))
            : allCompanies;

            setCompaniesDisplayed(res)
    }, [inputCompanyText, allCompanies])

    return(
        <div className="col-lg-8 col-sm-12" style={{"margin": "20px auto 0"}}>
            <input onChange={(e) => setInputCompanyText(e.target.value)} style={{"border": "solid black 1px", "width": "100%"}} placeholder="Search"/>

            <table className="table">
                <thead className="thead-dark">
                    <tr>
                        <th scope="col">Company Name</th>
                        <th scope="col">Actions</th>
                    </tr>
                </thead>
                <tbody>
                    {companiesDisplayed.map((c, i) => 
                        <tr key={i}>
                            <td>{c.companyName}</td>
                            <td>
                                <button className="btn">Edit</button>
                                <button className="btn">Delete</button>
                            </td>
                        </tr>
                    )}
                </tbody>
            </table>
        </div>
    )
}

export default CompanyTable;