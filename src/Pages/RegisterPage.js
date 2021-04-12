import React, {useState} from 'react';
import { Button, Form } from 'react-bootstrap';
import axios from 'axios';
import {useDispatch} from 'react-redux'
import { userAuthentication } from '../App/AuthSlicer';
import {useHistory} from 'react-router-dom';
import "./LoginRegister.css"

function RegisterPage()
{
    const dispatch = useDispatch();
    const history = useHistory();
    
    const [email, setEmail] = useState(""); 
    const [password, setPassword] = useState("");
    const [confirmPassword, setConfirmPassword] = useState("");
    const [errMessages, setErrMessages] = useState("");

    async function submitHandler(e)
    {
        e.preventDefault();

        const url = "https://localhost:44383/api/Account/Register";
        await axios.post(url, {"email": email, "password": password, "confirmPassword": confirmPassword}, {withCredentials: true})
            .then((res) => {
                dispatch(userAuthentication(res.data))
                history.push("/InvoiceAPI_Client/Profile")
            })
            .catch((err) => {
                setErrMessages(err.response.data.errMessage);
            })
    }

    return(
        <div className="col-lg-12 registerPage">

            <div className="col-lg-3 col-sm-6 form-box align-middle">

                <h1 className="credential-title">Register</h1>

                <Form className="justify-content-center" onSubmit={submitHandler}>

                    <div className="credential-section">
                        <Form.Row className="justify-content-center">
                            <input required={true} className="credential-input" type="email" onChange={(e) => setEmail(e.target.value)}/>
                        </Form.Row>
                    
                        <Form.Row className="">
                            <label className="credential-label">Email</label>
                        </Form.Row>
                    </div>

                    <div className="credential-section">
                        <Form.Row className="justify-content-center">                    
                            <input required={true} className="credential-input" type="password" onChange={(e) => setPassword(e.target.value)}/>
                        </Form.Row>

                        <Form.Row className="">                    
                            <label className="credential-label">Password</label>
                        </Form.Row>
                    </div>

                    <div className="credential-section">
                        <Form.Row className="justify-content-center">                    
                            <input required={true} className="credential-input" type="password" onChange={(e) => setConfirmPassword(e.target.value)}/>
                        </Form.Row>
                        
                        <Form.Row className="">                    
                            <label className="credential-label">Confirm Password</label>
                        </Form.Row>
                    </div>

                    {
                        errMessages !== ""
                        ?   <div className="col-12 err-messages">
                                {
                                    errMessages.split(".").map((e, i) => { 
                                        return (<p key={i} className="text-danger">{e}</p>)
                                    })
                                }
                            </div>
                        :   <div></div>
                    }

                    <div className="signin-submit-btn">
                        <Form.Row className="justify-content-center">                    
                            <Button className="btn btn-lg btn-block" variant="light" type="submit">Register</Button>
                        </Form.Row>
                    </div>
                </Form>
            </div>
        </div>
    )
}

export default RegisterPage;