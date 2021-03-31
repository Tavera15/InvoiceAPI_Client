import React, {useState, useEffect} from 'react';
import axios from 'axios';

function CompanyTable()
{
    const [allCompanies, setAllCompanies] = useState([]);
    const [companiesDisplayed, setCompaniesDisplayed] = useState([]);
    const [inputText, setInputText] = useState("");

    useEffect(() => {
        const res = inputText !== "" 
            ? allCompanies.filter((c) => c.companyName.toLowerCase().includes(inputText.toLowerCase()))
            : allCompanies;

            setCompaniesDisplayed(res)
    }, [inputText, allCompanies])

    return(
        <div className="col-lg-8 col-sm-12" style={{"margin": "20px auto 0"}}>
            <input onChange={(e) => setInputText(e.target.value)} style={{"border": "solid black 1px", "width": "100%"}} placeholder="Search"/>

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