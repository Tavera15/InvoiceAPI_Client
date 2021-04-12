import React, {useState, useEffect} from 'react';
import { Form, Button } from 'react-bootstrap';
import "./Styles/CompanyForms.css";

function CompanyMaker(props)
{
    const [companyName, setCompanyName] = useState("");
    const [companyEmail, setCompanyEmail] = useState("");
    const [companyPhone, setCompanyPhone] = useState("");
    const [companyAddressLine1, setCompanyAdd1] = useState("");
    const [companyAddressLine2, setCompanyAdd2] = useState("");
    const [companyCity, setCompanyCity] = useState("");
    const [companyState, setCompanyState] = useState("");
    const [companyZip, setCompanyZip] = useState("");
    const [logo, setLogo] = useState("");

    useEffect(() => 
    {
        async function getCompany()
        {
            if(props.defaultCompanyVals !== undefined)
            {
                setCompanyName(props.defaultCompanyVals.companyName);
                setCompanyAdd1(props.defaultCompanyVals.addressLine1);
                setCompanyAdd2(props.defaultCompanyVals.addressLine2);
                setCompanyCity(props.defaultCompanyVals.city);
                setCompanyState(props.defaultCompanyVals.state);
                setCompanyZip(props.defaultCompanyVals.zipCode);
                setCompanyEmail(props.defaultCompanyVals.emailAddress);
                setCompanyPhone(props.defaultCompanyVals.phoneNumber);
                setLogo(props.defaultCompanyVals.companyLogo);
            }
        }
        
        getCompany();
    },[props.defaultCompanyVals]);

    useEffect(() => {
        const isLogoAvailable = logo !== "" && logo !== null;

        document.getElementById("logo-img").src = logo;
        document.getElementById("logo-img").className = isLogoAvailable ? "" : "d-none";
        document.getElementById("clear-logo-cont").className = isLogoAvailable ? "" : "d-none";
        
    }, [logo])

    function handleSave(e)
    {
        e.preventDefault();
        const body = {
            "companyName": companyName,
            "addressLine1": companyAddressLine1,
            "addressLine2": companyAddressLine2,
            "city": companyCity,
            "state": companyState,
            "zipCode": companyZip,
            "emailAddress": companyEmail,
            "phoneNumber": companyPhone,
            "companyLogo": logo
        };

        props.handleSave(e, body);
    }

    function handleImgUpload(e)
    {
        const newLogoImg = e.target.files[0];

        if(newLogoImg !== undefined)
        {
            const reader = new FileReader();
            reader.readAsDataURL(newLogoImg);
            
            reader.onload = function () {
                const imgBytes = JSON.stringify(reader.result)
                setLogo(imgBytes.substring(1, imgBytes.length-1));
            }
        }
    }

    const btn_class = props.handleDelete !== undefined
        ? "col-6"
        : "col-12";
    
    return(
        <div className="col-xl-4 col-md-8 col-sm-12 creation-page">
            <div className="col-lg-12 logo-cont">
                <img src={logo} alt="logo" id="logo-img" className="col-12" />
            </div>
            <div id="clear-logo-cont">
                <Button type="button" className="btn btn-danger" onClick={(e) => setLogo("")}>Clear Logo</Button>
            </div>
            <h1 className="form-name">{props.cmd} Company</h1>
            <hr />
            <Form onSubmit={(e) => handleSave(e)}>
                <div className="form-group row">
                    <div className="col-12">
                        <label>Logo</label>
                        <input alt="logo-input" className="btn btn-default" type="file" accept="image/png" onChange={(e) => handleImgUpload(e)} />
                    </div>
                </div>
                <div className="form-group">
                    <label htmlFor="inputName">Company Name</label>
                    <input value={companyName || ""} required={true} onChange={(e) => setCompanyName(e.target.value)} type="text" className="form-control" id="inputName" />
                </div>
                <div className="form-row">
                    <div className="form-group col-md-6">
                        <label htmlFor="inputEmail4">Email</label>
                        <input value={companyEmail || ""} onChange={(e) => setCompanyEmail(e.target.value)} type="email" className="form-control" id="inputEmail4" />
                    </div>
                    <div className="form-group col-md-6">
                        <label htmlFor="inputPassword4">Telephone</label>
                        <input value={companyPhone || ""} onChange={(e) => setCompanyPhone(e.target.value)} type="tel" className="form-control" id="inputPassword4" />
                    </div>
                </div>
                <div className="form-group">
                    <label htmlFor="inputAddress">Address Line 1</label>
                    <input value={companyAddressLine1 || ""} onChange={(e) => setCompanyAdd1(e.target.value)} type="text" className="form-control" id="inputAddress" placeholder="1234 Main St" />
                </div>
                <div className="form-group">
                    <label htmlFor="inputAddress2">Address Line 2</label>
                    <input value={companyAddressLine2 || ""} onChange={(e) => setCompanyAdd2(e.target.value)} type="text" className="form-control" id="inputAddress2" placeholder="Apartment, studio, or floor" />
                </div>
                <div className="form-row">
                    <div className="form-group col-md-6">
                        <label htmlFor="inputCity">City</label>
                        <input value={companyCity || ""} onChange={(e) => setCompanyCity(e.target.value)} type="text" className="form-control" id="inputCity" />
                    </div>
                    <div className="form-group col-md-4">
                        <label htmlFor="inputState">State</label>
                        <input value={companyState || ""} onChange={(e) => setCompanyState(e.target.value)} type="text" className="form-control" id="inputState" />
                    </div>
                    <div className="form-group col-md-2">
                        <label htmlFor="inputZip">Zip</label>
                        <input value={companyZip || ""} onChange={(e) => setCompanyZip(e.target.value)} type="text" className="form-control" id="inputZip" />
                    </div>
                </div>
                <div className="col-lg-12">
                    <div className="row">
                        <div className={btn_class}>
                            <Button type="submit" className="btn btn-success col-12">Save</Button>
                        </div>

                        {
                            props.handleDelete !== undefined 
                            ?   <div className={btn_class}>
                                    <Button onClick={(e) => props.handleDelete(e)} type="button" className="btn btn-danger col-12">Delete</Button>
                                </div>
                            : <div></div>
                        }
                    </div>
                </div>
            </Form>
        </div>
    )
}

export default CompanyMaker;