import { useState } from 'react';
import { BrowserRouter, Routes, Route, Link } from 'react-router-dom';
import LoginPage from './pages/LoginPage';
import TransactionsPage from './pages/TransactionsPage';
import BlocksPage from './pages/BlocksPage';

function App() {
  const [token, setToken] = useState(localStorage.getItem('token'));

  if (!token) {
    return <LoginPage setToken={setToken} />;
  }

  const handleLogout = () => {
    localStorage.removeItem('token');
    setToken(null); // återgå
  };

  return (
    <BrowserRouter>
      <nav className="p-2 bg-gray-200 flex gap-4 items-center">
        <Link to="/">Transaktioner</Link>
        <Link to="/blocks">Block</Link>
        <button onClick={handleLogout} className="bg-red-500 text-white px-2 rounded">Logga ut</button>
      </nav>
      <Routes>
        <Route path="/" element={<TransactionsPage token={token} />} />
        <Route path="/blocks" element={<BlocksPage token={token} />} />
      </Routes>
    </BrowserRouter>
  );
}

export default App;