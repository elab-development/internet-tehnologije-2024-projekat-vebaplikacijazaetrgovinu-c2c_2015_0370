import React, { useState } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
 

const RegisterPage = () => {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    password: '',
    password_confirmation: '',
    address: '',
    phone_number: '',
    profile_picture: '',
    bio: '',
  });
  const [error, setError] = useState(null);
  const navigate = useNavigate();

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleRegister = async (e) => {
    e.preventDefault();

    try {
      const response = await axios.post('http://your-api-domain.com/api/register', formData);

      const { token, user } = response.data;

      // Save token and user in local storage
      localStorage.setItem('auth_token', token);
      localStorage.setItem('user', JSON.stringify(user));

      // Navigate to /home
      navigate('/home');
    } catch (error) {
      setError(error.response?.data?.errors || 'Registration failed. Please try again.');
    }
  };

  return (
    <div className="register-page">
      <div className="register-form-container">
        <h2>Register</h2>
        <form onSubmit={handleRegister}>
          <div className="form-group">
            <label htmlFor="name">Name:</label>
            <input
              type="text"
              id="name"
              name="name"
              value={formData.name}
              onChange={handleChange}
              required
            />
          </div>
          <div className="form-group">
            <label htmlFor="email">Email:</label>
            <input
              type="email"
              id="email"
              name="email"
              value={formData.email}
              onChange={handleChange}
              required
            />
          </div>
          <div className="form-group">
            <label htmlFor="password">Password:</label>
            <input
              type="password"
              id="password"
              name="password"
              value={formData.password}
              onChange={handleChange}
              required
            />
          </div>
          <div className="form-group">
            <label htmlFor="password_confirmation">Confirm Password:</label>
            <input
              type="password"
              id="password_confirmation"
              name="password_confirmation"
              value={formData.password_confirmation}
              onChange={handleChange}
              required
            />
          </div>
          <div className="form-group">
            <label htmlFor="address">Address:</label>
            <input
              type="text"
              id="address"
              name="address"
              value={formData.address}
              onChange={handleChange}
            />
          </div>
          <div className="form-group">
            <label htmlFor="phone_number">Phone Number:</label>
            <input
              type="text"
              id="phone_number"
              name="phone_number"
              value={formData.phone_number}
              onChange={handleChange}
            />
          </div>
          <div className="form-group">
            <label htmlFor="profile_picture">Profile Picture URL:</label>
            <input
              type="text"
              id="profile_picture"
              name="profile_picture"
              value={formData.profile_picture}
              onChange={handleChange}
            />
          </div>
          <div className="form-group">
            <label htmlFor="bio">Bio:</label>
            <textarea
              id="bio"
              name="bio"
              value={formData.bio}
              onChange={handleChange}
            ></textarea>
          </div>
          {error && <p className="error-message">{JSON.stringify(error)}</p>}
          <button type="submit" className="register-button">Register</button>
        </form>
      </div>
    </div>
  );
};

export default RegisterPage;
