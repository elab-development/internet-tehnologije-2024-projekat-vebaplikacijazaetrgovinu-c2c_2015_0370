import React, { useState } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import Button from './Button';
import InputField from './InputField';

const LoginPage = ({ setAuthData }) => {
  const [email, setEmail] = useState('jelena.kondic33@gmail.com');
  const [password, setPassword] = useState('jelena.kondic3');
  const [keepSignedIn, setKeepSignedIn] = useState(false);
  const [error, setError] = useState(null);
  const navigate = useNavigate();

  const handleLogin = async (e) => {
    e.preventDefault();

    try {
      const response = await axios.post('http://127.0.0.1:8000/api/login', {
        email,
        password,
      });

      const { token, user } = response.data;

      // Čuvanje u localStorage ili sessionStorage
      if (keepSignedIn) {
        localStorage.setItem('auth_token', token);
        localStorage.setItem('user', JSON.stringify(user));
      } else {
        sessionStorage.setItem('auth_token', token);
        sessionStorage.setItem('user', JSON.stringify(user));
      }

      // Postavljanje globalnog stanja
      setAuthData({ token, user });

      // Provera uloge korisnika i navigacija
      if (user.tip_korisnika === 'admin') {
        navigate('/admin');
      } else {
        navigate('/home');
      }
    } catch (error) {
      setError(error.response?.data?.message || 'Login failed. Please try again.');
    }
  };

  return (
    <div className="login-page">
      <div className="login-form-container">
        <h2>Login</h2>
        <form onSubmit={handleLogin}>
          <InputField
            label="Email"
            type="email"
            name="email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            required
          />
          <InputField
            label="Password"
            type="password"
            name="password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            required
          />
          <div className="form-group">
            <label>
              <input
                type="checkbox"
                checked={keepSignedIn}
                onChange={() => setKeepSignedIn(!keepSignedIn)}
              />
              Keep me signed in
            </label>
          </div>
          {error && <p className="error-message">{error}</p>}
          <Button text="Login" type="submit" className="primary" />
        </form>
      </div>
    </div>
  );
};

export default LoginPage;
