import React, { useState } from 'react';
import { Mail, Eye, EyeOff } from 'lucide-react';
import axiosInstance from '../api/axiosInstance';
import './LoginPage.css';

const LoginPage = () => {
  const [formData, setFormData] = useState({
    firstName: '',
    lastName: '',
    email: '',
    password: ''
  });

  const [showPassword, setShowPassword] = useState(false);
  const [isLoading, setIsLoading] = useState(false);

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: value
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setIsLoading(true);

    try {
      const response = await axiosInstance.post('/auth/login', {
        username: 'emilys',
        password: 'emilyspass',
        expiresInMins: 30
      });

      console.log('✅ Login successful:', response.data);
      alert('Account created successfully!');
    } catch (error) {
      console.error('❌ Login failed:', error);
      alert('Login failed. Please try again.');
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className='bg-image'>
      <div className="login-container">
        <div className="login-form-container">
          <div className="login-header">
            <div className="app-logo">
              <div className="logo-circle"></div>
              <span className="app-name">Anywhere app.</span>
            </div>

            <div className="form-header">
              <p className="start-free">START FOR FREE</p>
              <h1 className="form-title">Create new account<span className="blue-dot">.</span></h1>
              <p className="login-prompt">
                Already A Member? <a href="#" className="login-link">Log In</a>
              </p>
            </div>
          </div>

          <form className="login-form">
            <div className="name-fields">
              <div>
                <input
                  type="text"
                  name="firstName"
                  placeholder="First name"
                  value={formData.firstName}
                  onChange={handleInputChange}
                  className="first"
                  required
                />
              </div>
              <div>
                <input
                  type="text"
                  name="lastName"
                  placeholder="Last name"
                  value={formData.lastName}
                  onChange={handleInputChange}
                  className="second"
                  required
                />
              </div>
            </div>

            <div className="relative">
              <input
                type="email"
                name="email"
                placeholder="michal.masiak@anywhere.co"
                value={formData.email}
                onChange={handleInputChange}
                className="form-input pl-10"
                required
              />
            </div>

            <div className="password-input">
              <input
                type={showPassword ? "text" : "password"}
                name="password"
                placeholder="Password"
                value={formData.password}
                onChange={handleInputChange}
                className="form-input"
                required
              />
              <button
                type="button"
                onClick={() => setShowPassword(!showPassword)}
                className="password-toggle"
              >
                {showPassword ? <EyeOff size={20} /> : <Eye size={20} />}
              </button>
            </div>

            <div className='change'>
              <button
                type="button"
                className="Change-method"
              >
                Change method
              </button>

              <button
                type="button"
                onClick={handleSubmit}
                disabled={isLoading}
                className="submit-button"
              >
                {isLoading ? 'Creating account...' : 'Create account'}
              </button>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
};

export default LoginPage;
