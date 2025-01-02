import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import './App.css';
import LandingPage from './komponente/LandingPage';
import RegisterPage from './komponente/RegisterPage';
import LoginPage from './komponente/LoginPage';

function App() {
  return (
    <Router>
      <div className="App">
        <Routes>
         
          <Route path="/" element={<LandingPage />} />
 
          <Route path="/register" element={<RegisterPage />} />

 
          <Route path="/login" element={<LoginPage />} />
        </Routes>
      </div>
    </Router>
  );
}

export default App;
