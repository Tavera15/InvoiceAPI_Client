import React from "react";
import {BrowserRouter as Router, Route, Switch} from 'react-router-dom';
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

function App() {
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

            <Route exact path="/CompanyManager/">
              <CompanyManHome />
            </Route>
            
            <Route exact path="/CompanyManager/NewCompany">
              <CreateCompany />
            </Route>

            <Route exact path="/CompanyManager/EditCompany/:id">
              <EditCompany />
            </Route>

            <Route exact path="/CompanyManager/DeleteCompany/:id">
              <DeleteCompany />
            </Route>

            <Route exact path="/InvoiceManager/NewInvoice">
              <CreateInvoice />
            </Route>

            <Route exact path="/InvoiceManager/ViewInvoice/:id">
              <ViewInvoice />
            </Route>

            <Route exact path="/InvoiceManager/EditInvoice/:id">
              <EditInvoice />
            </Route>

            <Route exact path="/InvoiceManager/DeleteInvoice/:id">
              <DeleteInvoice />
            </Route>

          </Switch>
        </Router>
      </div>
  );
}

export default App;
