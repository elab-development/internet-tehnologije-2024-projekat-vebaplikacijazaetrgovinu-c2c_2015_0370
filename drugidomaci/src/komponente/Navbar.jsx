import React from 'react';
import { useNavigate } from 'react-router-dom';
 

const Navbar = () => {
  const navigate = useNavigate();

  return (
    <header className="header">
      <div className="logo">Kupuj & Prodaj</div>
     
      <div className="auth-buttons">
        <button className="login-button" onClick={() => navigate('/login')}>Uloguj Se</button>
        <button className="register-button" onClick={() => navigate('/register')}>Registruj Se</button>
      </div>
    </header>
  );
};

export default Navbar;
