import React from 'react';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';

const Navbar = ({ authData, setAuthData }) => {
  const navigate = useNavigate();

  const handleLogout = async () => {
    try {
      // Poziv na API za odjavu
      await axios.post('http://127.0.0.1:8000/api/logout', {}, {
        headers: {
          Authorization: `Bearer ${authData.token}`,
        },
      });

      // Brisanje podataka iz localStorage ili sessionStorage
      localStorage.removeItem('auth_token');
      localStorage.removeItem('user');
      sessionStorage.removeItem('auth_token');
      sessionStorage.removeItem('user');

      // Ažuriranje globalnog stanja
      setAuthData({ token: null, user: null });

      // Navigacija na početnu stranicu
      navigate('/');
    } catch (error) {
      console.error('Error during logout:', error);
    }
  };

  return (
    <header className="header">
      <div className="logo" onClick={() => navigate('/')}>Kupuj & Prodaj</div>
      <div className="auth-buttons">
        {authData.token ? (
          <>
            <button className="home-button" onClick={() => navigate('/home')}>Početna</button>
            <button className="logout-button" onClick={handleLogout}>Odjavi se</button>
          </>
        ) : (
          <>
            <button className="login-button" onClick={() => navigate('/login')}>Uloguj se</button>
            <button className="register-button" onClick={() => navigate('/register')}>Registruj se</button>
          </>
        )}
      </div>
    </header>
  );
};

export default Navbar;
