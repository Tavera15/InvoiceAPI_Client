import React, { useEffect, useState } from "react";
import {BrowserRouter as Router, Route, Switch} from 'react-router-dom';
import axios from 'axios';
import './App.css';
import NavBar from './Components/NavBar.js';
import LoginPage from './Pages/LoginPage.js';
import RegisterPage from './Pages/RegisterPage.js';
import CompanyManHome from "./Pages/CompanyManager/CompanyManHome.js"
import CreateCompany from "./Pages/CompanyManager/CreateCompany.js";
import EditCompany from "./Pages/CompanyManager/EditCompany.js";
import CreateInvoice from "./Pages/InvoiceManager/CreateInvoice";
import ViewInvoice from "./Pages/InvoiceManager/ViewInvoice";
import DeleteCompany from "./Pages/CompanyManager/DeleteCompany";
import EditInvoice from "./Pages/InvoiceManager/EditInvoice";
import DeleteInvoice from "./Pages/InvoiceManager/DeleteInvoice";
import { useDispatch } from 'react-redux';
import { userAuthentication } from './App/AuthSlicer';
import PrivateRoute from "./Components/PrivateRoute";

function App() 
{
  const dispatch = useDispatch();
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
      async function getUserStatus()
      {
          const url = "https://localhost:44383/api/Account/IsUserLoggedIn";
          await axios.get(url, {withCredentials: true})
            .then((res) => {
              if(res.data.email !== "")
                dispatch(userAuthentication(res.data))
            })
            .finally(() => {
              setIsLoading(false)
            })
      }

      getUserStatus();
  }, [dispatch])

  if(isLoading)
  {
    return <div>Loading...</div>
  }
  else
  {
    return (
        <div className="App">
          <Router>
            <NavBar />
            <Switch>
              <Route path="/Login">
                <LoginPage />
              </Route>

              <Route path="/Register">
                <RegisterPage />
              </Route>

                <PrivateRoute Comp={<CreateCompany />} path="/CompanyManager/NewCompany/"/>
                <PrivateRoute Comp={<EditCompany />} path="/CompanyManager/EditCompany/:id"/>
                <PrivateRoute Comp={<DeleteCompany />} path="/CompanyManager/DeleteCompany/:id"/>
                <PrivateRoute Comp={<CompanyManHome />} path="/CompanyManager/"/>

                <PrivateRoute Comp={<CreateInvoice />} path="/InvoiceManager/NewInvoice"/>
                <PrivateRoute Comp={<ViewInvoice />} path="/InvoiceManager/ViewInvoice/:id"/>
                <PrivateRoute Comp={<EditInvoice />} path="/InvoiceManager/EditInvoice/:id"/>
                <PrivateRoute Comp={<DeleteInvoice />} path="/InvoiceManager/DeleteInvoice/:id"/>

            </Switch>
          </Router>
        </div>
    );
  }

}

export default App;
