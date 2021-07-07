import React, { useState } from 'react';
import './App.css';
import LoginForm from './components/Forms/LoginForm'
import Home from './components/Home/Home'

import { BrowserRouter } from "react-router-dom";

const App = () => {

  const [isAuthenticated, setIsAuthenticated] = useState(false)
  const [authError, setAuthError] = useState(undefined)

  const authenticateUser = ({ username, password }) => {

    if (username === "muneeb706" && password === "admin123") {
      setIsAuthenticated(true)
      // set user
    } else {
      setIsAuthenticated(false)
      setAuthError('Username or Password is incorrect')

    }

  }

  return (
    <BrowserRouter>
      {isAuthenticated ? <Home /> : <LoginForm isAuthenticated={isAuthenticated} authError={authError} authenticate={authenticateUser} />}
    </BrowserRouter>
  );
}

export default App;
