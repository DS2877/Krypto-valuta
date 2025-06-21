import { useState } from 'react';
import axios from 'axios';
import { Link } from 'react-router-dom';

function SignUpPage({ setToken }) {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const [success, setSuccess] = useState(false);

  const handleSignUp = async (e) => {
    e.preventDefault();
    setError('');
    setSuccess(false);

    try {
      const res = await axios.post('/api/auth/register', { email, password });
      const token = res.data.token;
      localStorage.setItem('token', token);
      setToken(token);
      setSuccess(true);
    } catch (err) {
      setError(
        err.response?.data?.message ||
          'Registreringen misslyckades. Försök igen.'
      );
    }
  };

  return (
    <div className="flex items-center justify-center min-h-screen bg-gray-100">
      <form
        onSubmit={handleSignUp}
        className="bg-white p-6 rounded shadow w-80"
      >
        <h1 className="text-xl mb-4 text-center">Skapa konto</h1>

        {error && <p className="text-red-500 mb-2 text-center">{error}</p>}
        {success && (
          <p className="text-green-500 mb-2 text-center">
            ✅ Konto skapat! Du är nu inloggad.
          </p>
        )}

        <input
          type="email"
          placeholder="E-post"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          className="w-full border p-2 mb-2"
          required
        />

        <input
          type="password"
          placeholder="Lösenord"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          className="w-full border p-2 mb-4"
          required
        />

        <button
          type="submit"
          className="bg-green-500 text-white w-full py-2 rounded"
        >
          Registrera
        </button>

        <p className="text-center mt-4 text-sm">
          Redan registrerad?{' '}
          <Link to="/" className="text-blue-500 underline">
            Logga in
          </Link>
        </p>
      </form>
    </div>
  );
}

export default SignUpPage;