import React from "react";
import {BrowserRouter as Router, Route, Switch} from 'react-router-dom';
import './App.css';
import NavBar from './Components/NavBar.js';
import LoginPage from './Pages/LoginPage.js';
import RegisterPage from './Pages/RegisterPage.js';

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
          
          </Switch>
        </Router>
      </div>
  );
}

export default App;
