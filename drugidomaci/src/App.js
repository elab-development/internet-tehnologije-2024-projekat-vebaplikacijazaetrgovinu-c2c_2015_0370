import React, { useState, useEffect } from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import './App.css';
import LandingPage from './komponente/LandingPage';
import RegisterPage from './komponente/RegisterPage';
import LoginPage from './komponente/LoginPage';
import Navbar from './komponente/Navbar';

function App() {
  const [authData, setAuthData] = useState({
    token: null,
    user: null,
  });

  useEffect(() => {
    const token = localStorage.getItem('auth_token') || sessionStorage.getItem('auth_token');
    const user = localStorage.getItem('user') || sessionStorage.getItem('user');
    if (token && user) {
      setAuthData({ token, user: JSON.parse(user) });
    }
  }, []);

  return (
    <Router>
      <div className="App">
        <Navbar authData={authData} setAuthData={setAuthData} />
        <Routes>
          <Route path="/" element={<LandingPage />} />
          <Route path="/register" element={<RegisterPage />} />
          <Route path="/login" element={<LoginPage setAuthData={setAuthData} />} />
        </Routes>
      </div>
    </Router>
  );
}

export default App;
