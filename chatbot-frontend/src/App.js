import React, { useState } from 'react';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import Login from './components/Login';
import Register from './components/Register';
import Chatbot from './components/Chatbot';
import Header from './components/Header';
import './App.css'; // Import the CSS file here

function App() {
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [loggedInUser, setLoggedInUser] = useState(null);

  const handleLogout = () => {
    setIsLoggedIn(false);
    setLoggedInUser(null);
  };

  const handleLogin = (userData) => {
    setIsLoggedIn(true);
    setLoggedInUser(userData);
  };

  return (
    <Router>
      <div className="App">
        <Header isLoggedIn={isLoggedIn} handleLogout={handleLogout} />
        <div className="container mt-5">
          <Routes>
            <Route path="/login" element={<Login onLogin={handleLogin} />} />
            <Route path="/register" element={<Register />} />
            <Route path="/chatbot" element={<Chatbot user={loggedInUser} />} />
            <Route path="/" element={
              <>
                <h2>Welcome to the Chatbot App</h2>
                <p>Please choose to login or register.</p>
              </>
            } />
          </Routes>
        </div>
      </div>
    </Router>
  );
}

export default App;
