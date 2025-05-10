import React from 'react';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';

const Navbar = ({ authData, setAuthData }) => {
  const navigate = useNavigate();

  const handleLogout = async () => {
    try {
      await axios.post('http://127.0.0.1:8000/api/logout', {}, {
        headers: {
          Authorization: `Bearer ${authData.token}`,
        },
      });

      localStorage.removeItem('auth_token');
      localStorage.removeItem('user');
      sessionStorage.removeItem('auth_token');
      sessionStorage.removeItem('user');

      setAuthData({ token: null, user: null });
      navigate('/');
    } catch (error) {
      console.error('Error during logout:', error);
    }
  };

  const isAdmin = authData.user?.tip_korisnika === 'admin';

  return (
    <header className="header">
      <div className="logo" onClick={() => navigate('/')}>Kupuj & Prodaj</div>
      <div className="auth-buttons">
        {authData.token ? (
          <>
           {!isAdmin && (

            <>
              <button className="home-button" onClick={() => navigate('/home')}>Ponuda</button>
              <button className="home-button" onClick={() => navigate('/myProducts')}>Moji proizvodi</button>
            </>
           )}
            {isAdmin && (
              <>
                <button className="home-button" onClick={() => navigate('/admin')}>Admin korisnici</button>
                <button className="home-button" onClick={() => navigate('/admin/products')}>Admin proizvodi</button>
              </>
            )}
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
