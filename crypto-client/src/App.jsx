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

  return (
    <BrowserRouter>
      <nav className="p-2 bg-gray-200 flex gap-4">
        <Link to="/">Transaktioner</Link>
        <Link to="/blocks">Block</Link>
      </nav>
      <Routes>
        <Route path="/" element={<TransactionsPage />} />
        <Route path="/blocks" element={<BlocksPage />} />
      </Routes>
    </BrowserRouter>
  );
}

export default App;