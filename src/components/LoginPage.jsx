import React, { useState } from 'react';
import { Mail,Eye, EyeOff } from 'lucide-react';
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
      const response = await fetch('https://dummyjson.com/auth/login', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          username: "emilys",
          password: "emilyspass",
          expiresInMins: 30
        })
      });

      const data = await response.json();
      
      if (response.ok) {
        console.log('Login successful:', data);
        alert('Account created successfully!');
      } else {
        console.error('Login failed:', data);
        alert('Login failed. Please try again.');
      }
    } catch (error) {
      console.error('Error:', error);
      alert('Network error. Please try again.');
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
           <div > 
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
            <div >
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

          <div>
            <input
            type="email"
            name="email"
            placeholder="michal.masiak@anywhere.co"
            value={formData.email}
            onChange={handleInputChange}
            className="form-input"
            required
          />
          <button>
              <Mail className="w-5 h-5" />
          </button>
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