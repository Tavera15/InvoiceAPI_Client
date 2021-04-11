import React, { useEffect, useState } from "react";
import {BrowserRouter as Router, Route, Switch} from 'react-router-dom';
import axios from 'axios';
import './App.css';
import NavBar from './Components/NavBar.js';
import LoginPage from './Pages/LoginPage.js';
import RegisterPage from './Pages/RegisterPage.js';
import ProfilePage from "./Pages/ProfilePage.js"
import CreateCompany from "./Pages/CompanyManager/CreateCompany.js";
import ViewCompany from "./Pages/CompanyManager/ViewCompany.js";
import CreateInvoice from "./Pages/InvoiceManager/CreateInvoice";
import ViewInvoice from "./Pages/InvoiceManager/ViewInvoice";
import { useDispatch } from 'react-redux';
import { userAuthentication } from './App/AuthSlicer';
import PrivateRoute from "./Components/PrivateRoute";
import HomePage from "./Pages/HomePage";
import NotFoundPage from "./Pages/NotFoundPage";

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
                <Route exact path="/">
                  <HomePage />
                </Route>

                <Route exact path="/Login">
                  <LoginPage />
                </Route>

                <Route exact path="/Register">
                  <RegisterPage />
                </Route>

                <PrivateRoute Comp={<ProfilePage />} path="/Profile/"/>

                <PrivateRoute Comp={<CreateCompany />} path="/CompanyManager/NewCompany/"/>
                <PrivateRoute Comp={<ViewCompany />} path="/CompanyManager/ViewCompany/:id"/>

                <PrivateRoute Comp={<CreateInvoice />} path="/InvoiceManager/NewInvoice"/>
                <PrivateRoute Comp={<ViewInvoice />} path="/InvoiceManager/ViewInvoice/:id"/>

                <Route path='*' exact={true} component={NotFoundPage} />

            </Switch>
          </Router>
        </div>
    );
  }

}

export default App;
