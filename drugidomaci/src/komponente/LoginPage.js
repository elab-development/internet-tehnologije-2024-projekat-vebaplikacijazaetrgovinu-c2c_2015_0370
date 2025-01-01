import React, { useState } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import Button from './Button';

const LoginPage = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
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

      // Save token and user in local storage
      localStorage.setItem('auth_token', token);
      localStorage.setItem('user', JSON.stringify(user));

      // Navigate to /home
      navigate('/home');
    } catch (error) {
      setError(error.response?.data?.message || 'Login failed. Please try again.');
    }
  };

  return (
    <div className="login-page">
      <div className="login-form-container">
        <h2>Login</h2>
        <form onSubmit={handleLogin}>
          <div className="form-group">
            <label htmlFor="email">Email:</label>
            <input
              type="email"
              id="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              required
            />
          </div>
          <div className="form-group">
            <label htmlFor="password">Password:</label>
            <input
              type="password"
              id="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              required
            />
          </div>
          {error && <p className="error-message">{error}</p>}
          <Button text="Login" type="submit" className="primary" />
        </form>
      </div>
    </div>
  );
};

export default LoginPage;
