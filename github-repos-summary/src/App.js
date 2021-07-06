import React, { useState } from 'react';
import './App.css';
import LoginForm from './components/Forms/LoginForm'

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
    <React.Fragment>
      {isAuthenticated ? <p>LoggedIn</p> : <LoginForm isAuthenticated={isAuthenticated} authError={authError} authenticate={authenticateUser} />}
    </React.Fragment>
  );
}

export default App;
