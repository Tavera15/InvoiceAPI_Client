import React, {useState} from 'react';
import { Button, Form } from 'react-bootstrap';
import axios from 'axios';
import "./LoginRegister.css"

function LoginPage()
{
    const [email, setEmail] = useState(""); 
    const [password, setPassword] = useState("");

    async function submitHandler(e)
    {   
        e.preventDefault();

        const url = "https://localhost:44383/api/Account/Login";
        await axios.post(url, {"email": email, "password": password}, {withCredentials: true})
        .then((res) => {
            console.log(res);
        })
        .catch((err) => {
            console.log(err.response);
        })
    }

    return(
        <div className="col-lg-12 registerPage">

            <div className="col-lg-3 col-sm-6 form-box align-middle">

                <h1 className="credential-title">Login</h1>

                <Form className="justify-content-center" onSubmit={submitHandler}>

                    <div className="credential-section">
                        <Form.Row className="justify-content-center">
                            <input className="credential-input" type="email" onChange={(e) => setEmail(e.target.value)}/>
                        </Form.Row>
                    
                        <Form.Row className="">
                            <label className="credential-label">Email</label>
                        </Form.Row>
                    </div>

                    <div className="credential-section">
                        <Form.Row className="justify-content-center">                    
                            <input className="credential-input" type="password" onChange={(e) => setPassword(e.target.value)}/>
                        </Form.Row>

                        <Form.Row className="">                    
                            <label className="credential-label">Password</label>
                        </Form.Row>
                    </div>

                    <div className="signin-submit-btn">
                        <Form.Row className="justify-content-center">                    
                            <Button className="btn btn-lg btn-block" variant="light" type="submit">Login</Button>
                        </Form.Row>
                    </div>
                </Form>
            </div>
        </div>
    )
}

export default LoginPage;