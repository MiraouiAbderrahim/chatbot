import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';

function Register() {
  const [formData, setFormData] = useState({ firstname: '', lastname: '', email: '', password: '', age: '', gender: '' });
  const [error, setError] = useState('');
  const [success, setSuccess] = useState('');
  const navigate = useNavigate();  // Use navigate hook to redirect after success

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const response = await fetch('http://localhost:8000/api/register', {
        method: 'POST',
        headers: { 
            'Content-Type': 'application/json' 
        },
        body: JSON.stringify(formData),
        credentials: 'include'
      });

      const result = await response.json();

      if (response.ok) {
        setSuccess(result.success);
        setError('');
        navigate('/login');  // Redirect to login page on successful registration
      } else {
        setError(result.error || 'Une erreur s\'est produite');
        setSuccess('');
      }
    } catch (err) {
      setError('Échec de la connexion au serveur');
    }
  };

  return (
    <div className="row justify-content-center">
      <div className="col-md-6">
        <h2>Inscription</h2>
        {error && <p style={{ color: 'red' }}>{error}</p>}
        {success && <p style={{ color: 'green' }}>{success}</p>}
        <form onSubmit={handleSubmit}>
          <div className="mb-3">
            <label className="form-label">Nom:</label>
            <input
              type="text"
              name="firstname"
              className="form-control"
              value={formData.firstname}
              onChange={handleChange}
              required
            />
          </div>
          <div className="mb-3">
            <label className="form-label">Prénom:</label>
            <input
              type="text"
              name="lastname"
              className="form-control"
              value={formData.lastname}
              onChange={handleChange}
              required
            />
          </div>
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
            <label className="form-label">Mot de passe:</label>
            <input
              type="password"
              name="password"
              className="form-control"
              value={formData.password}
              onChange={handleChange}
              required
            />
          </div>
          <div className="mb-3">
            <label className="form-label">Age:</label>
            <input
              type="number"
              name="age"
              className="form-control"
              value={formData.age}
              onChange={handleChange}
              required
            />
          </div>
          <div className="mb-3">
            <label className="form-label">Sexe:</label>
            <select name="gender" className="form-control" value={formData.gender} onChange={handleChange} required>
              <option value="">Sélectionner votre sexe</option>
              <option value="male">Masculin</option>
              <option value="female">Féminin</option>
            </select>
          </div>
          <button type="submit" className="btn btn-primary w-100">Inscription</button>
        </form>
      </div>
    </div>
  );
}

export default Register;
