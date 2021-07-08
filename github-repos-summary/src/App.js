import React, { useState } from 'react';
import './App.css';
import LoginForm from './components/Forms/LoginForm'
import Home from './components/Home/Home'

import { BrowserRouter } from "react-router-dom";

const usernames = [
  "fabpot", "muneeb706", "pgte", "andrew"
]

const App = () => {

  const [isAuthenticated, setIsAuthenticated] = useState(false)
  const [authError, setAuthError] = useState(undefined)
  const [user, setUser] = useState(undefined)

  const authenticateUser = ({ username, password }) => {

    if (usernames.includes(username) && password === "admin123") {
      setIsAuthenticated(true)
      setUser(username)
    } else {
      setIsAuthenticated(false)
      setAuthError('Username or Password is incorrect')
    }

  }

  return (
    <React.Fragment>
      {
        isAuthenticated ?
          <BrowserRouter>
            < Home user={user} />
          </BrowserRouter > :

          <LoginForm
            isAuthenticated={isAuthenticated}
            authError={authError}
            authenticate={authenticateUser}
          />
      }
    </React.Fragment>
  );
}

export default App;
