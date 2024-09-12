import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';

function Login({ onLogin }) {
  const [formData, setFormData] = useState({ email: '', password: '' });
  const [error, setError] = useState('');
  const navigate = useNavigate();

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const response = await fetch('http://localhost:8000/api/login', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ email: formData.email, password: formData.password }),
        credentials: 'include' 
      });
  
      const result = await response.json();

      if (!response.ok) {
        setError(result.error || 'Login failed');
        return;
      }
  
      const userData = {
        email: result.user?.email,  
        gender: result.user?.gender,  
      };
      
      if (!userData.email || !userData.gender) {
        setError('User data is incomplete. Please try again.');
        return;
      }
  
      onLogin(userData);  
      navigate('/chatbot');
    } catch (err) {
      setError('Failed to connect to the server');
    }
  };

  return (
    <div className="row justify-content-center">
      <div className="col-md-6">
        <h2>Connexion</h2>
        {error && <p style={{ color: 'red' }}>{error}</p>}
        <form onSubmit={handleSubmit}>
          <div className="mb-3">
            <label className="form-label">Email:</label>
            <input
              type="email"
              name="email"
              className="form-control"
              value={formData.email}
              onChange={handleChange}
              required
            />
          </div>
          <div className="mb-3">
            <label className="form-label">Password:</label>
            <input
              type="password"
              name="password"
              className="form-control"
              value={formData.password}
              onChange={handleChange}
              required
            />
          </div>
          <button type="submit" className="btn btn-primary w-100">Login</button>
        </form>
      </div>
    </div>
  );
}

export default Login;
