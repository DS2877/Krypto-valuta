import { useState } from 'react';
import axios from 'axios';

export default function LoginPage({ setToken }) {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [isRegister, setIsRegister] = useState(false);
  const [error, setError] = useState(null);

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError(null);

    try {
      const endpoint = isRegister ? '/register' : '/login';
      const { data } = await axios.post(`http://localhost:5000/api/auth${endpoint}`, { email, password });
      localStorage.setItem('token', data.token);
      setToken(data.token);
    } catch (err) {
      setError('Fel vid inloggning/registrering. Kontrollera dina uppgifter.');
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-blue-50 to-blue-200">
      <div className="bg-white p-8 shadow-xl rounded-xl w-full max-w-md">
        <h2 className="text-2xl font-bold mb-6 text-center">{isRegister ? 'Registrera' : 'Logga in'}</h2>
        <form onSubmit={handleSubmit} className="space-y-4">
          <input
            className="w-full border p-2 rounded"
            placeholder="E-post"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            type="email"
            required
          />
          <input
            className="w-full border p-2 rounded"
            placeholder="Lösenord"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            type="password"
            required
          />
          {error && <p className="text-red-500 text-center text-sm">{error}</p>}
          <button className="w-full bg-blue-600 text-white p-2 rounded" type="submit">
            {isRegister ? 'Registrera' : 'Logga in'}
          </button>
          <button
            type="button"
            className="text-sm text-center w-full text-blue-600 mt-2"
            onClick={() => setIsRegister(!isRegister)}
          >
            {isRegister ? 'Har du redan ett konto? Logga in!' : 'Inget konto? Registrera dig!'}
          </button>
        </form>
      </div>
    </div>
  );
}