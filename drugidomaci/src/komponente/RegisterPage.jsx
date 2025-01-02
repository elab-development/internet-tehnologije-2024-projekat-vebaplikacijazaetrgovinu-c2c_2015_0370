import React, { useState } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import Button from './Button';
import InputField from './InputField';

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
      const response = await axios.post('http://127.0.0.1:8000/api/register', formData);

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
          <InputField
            label="Name"
            type="text"
            name="name"
            value={formData.name}
            onChange={handleChange}
            required
          />
          <InputField
            label="Email"
            type="email"
            name="email"
            value={formData.email}
            onChange={handleChange}
            required
          />
          <InputField
            label="Password"
            type="password"
            name="password"
            value={formData.password}
            onChange={handleChange}
            required
          />
          <InputField
            label="Confirm Password"
            type="password"
            name="password_confirmation"
            value={formData.password_confirmation}
            onChange={handleChange}
            required
          />
          <InputField
            label="Address"
            type="text"
            name="address"
            value={formData.address}
            onChange={handleChange}
          />
          <InputField
            label="Phone Number"
            type="text"
            name="phone_number"
            value={formData.phone_number}
            onChange={handleChange}
          />
          <InputField
            label="Profile Picture URL"
            type="text"
            name="profile_picture"
            value={formData.profile_picture}
            onChange={handleChange}
          />
          <div className="form-group">
            <label htmlFor="bio">Bio</label>
            <textarea
              id="bio"
              name="bio"
              value={formData.bio}
              onChange={handleChange}
              className="input-field"
            ></textarea>
          </div>
          {error && <p className="error-message">{JSON.stringify(error)}</p>}
          <Button text="Register" type="submit" className="primary" />
        </form>
      </div>
    </div>
  );
};

export default RegisterPage;
