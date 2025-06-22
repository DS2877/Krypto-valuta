import React, { useState } from "react";
import { BrowserRouter, Routes, Route, Link } from "react-router-dom";
import LoginPage from "./pages/LoginPage";
import TransactionsPage from "./pages/TransactionsPage";
import BlocksPage from "./pages/BlocksPage";

import './App.css';

function App() {
  const [token, setToken] = useState(localStorage.getItem('token'));

  if (!token) {
    return <LoginPage setToken={setToken} />;
  }

  return (
    <BrowserRouter>
      <div className="navbar">
        <Link to="/">Transaktioner</Link>
        <Link to="/blocks">Block</Link>
      </div>

      <div className="container">
        <Routes>
          <Route path="/" element={<TransactionsPage />} />
          <Route path="/blocks" element={<BlocksPage />} />
        </Routes>
      </div>
    </BrowserRouter>
  );
}

export default App;