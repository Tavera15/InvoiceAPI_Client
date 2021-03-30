import React, {useState} from 'react';
import { Button, Form } from 'react-bootstrap';
import "./LoginRegister.css"

function RegisterPage()
{
    const [email, setEmail] = useState(""); 
    const [password, setPassword] = useState("");
    const [confirmPassword, setConfirmPassword] = useState("");

    function submitHandler(e)
    {
        e.preventDefault();
        console.log(email);
        console.log(password);
        console.log(confirmPassword);
    }

    return(
        <div className="col-lg-12 registerPage">

            <div className="col-lg-3 col-sm-6 form-box align-middle">

                <h1 className="credential-title">Register</h1>

                <Form className="justify-content-center" onSubmit={submitHandler}>

                    <div className="credential-section">
                        <Form.Row className="justify-content-center">
                            <input className="credential-input" type="text" onChange={(e) => setEmail(e.target.value)}/>
                        </Form.Row>
                    
                        <Form.Row className="">
                            <label>Email</label>
                        </Form.Row>
                    </div>

                    <div className="credential-section">
                        <Form.Row className="justify-content-center">                    
                            <input className="credential-input" type="password" onChange={(e) => setPassword(e.target.value)}/>
                        </Form.Row>

                        <Form.Row className="">                    
                            <label>Password</label>
                        </Form.Row>
                    </div>

                    <div className="credential-section">
                        <Form.Row className="justify-content-center">                    
                            <input className="credential-input" type="password" onChange={(e) => setConfirmPassword(e.target.value)}/>
                        </Form.Row>
                        
                        <Form.Row className="">                    
                            <label>Confirm Password</label>
                        </Form.Row>
                    </div>

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