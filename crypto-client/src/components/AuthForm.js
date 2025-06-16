import React, { useState } from 'react';
import { register, login } from '../api/api';

const AuthForm = ({ setUser }) => {
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [isLogin, setIsLogin] = useState(false);  // Växla logga in och registrera
  const [message, setMessage] = useState('');

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      let response;
      if (isLogin) {
        response = await login(email, password);
      } else {
        response = await register(name, email, password);
      }
      setUser(response.token); // Sätt token till App.js
      setMessage('Lyckad inloggning/registrering');
    } catch (error) {
      setMessage('Fel vid inloggning/registrering');
    }
  };

  return (
    <div>
      <h2>{isLogin ? 'Logga In' : 'Registrera'}</h2>
      <form onSubmit={handleSubmit}>
        {!isLogin && (
          <input
            type="text"
            placeholder="Namn"
            value={name}
            onChange={(e) => setName(e.target.value)}
            required
          />
        )}
        <input
          type="email"
          placeholder="E-post"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          required
        />
        <input
          type="password"
          placeholder="Lösenord"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          required
        />
        <button type="submit">{isLogin ? 'Logga In' : 'Registrera'}</button>
      </form>
      <p>{message}</p>
      <button onClick={() => setIsLogin(!isLogin)}>
        {isLogin ? 'Har du inte konto? Registrera' : 'Redan medlem? Logga in'}
      </button>
    </div>
  );
};

export default AuthForm;