// src/pages/LoginPage.jsx
import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import API from '../api/api';

export default function LoginPage() {
  const navigate = useNavigate();
  const [formData, setFormData] = useState({ email: '', password: '' });
  const [error, setError] = useState('');

  const handleChange = (e) => {
    setFormData((prev) => ({
      ...prev,
      [e.target.name]: e.target.value,
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError('');
    try {
      const res = await API.post('/auth/login', formData);
      localStorage.setItem('token', res.data.token);
      navigate('/dashboard'); // eller var du vill skicka användaren
    } catch (err) {
      setError('Fel vid inloggning');
    }
  };

  return (
    <div className="login-page">
      <h2>Logga in</h2>
      <form onSubmit={handleSubmit}>
        <input
          name="email"
          placeholder="E-post"
          type="email"
          value={formData.email}
          onChange={handleChange}
          required
        />
        <input
          name="password"
          placeholder="Lösenord"
          type="password"
          value={formData.password}
          onChange={handleChange}
          required
        />
        <button type="submit">Logga in</button>
      </form>
      {error && <p style={{ color: 'red' }}>{error}</p>}
    </div>
  );
}