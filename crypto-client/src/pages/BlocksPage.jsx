import { useState, useEffect } from 'react';
import axios from 'axios';

export default function BlocksPage() {
  const [blocks, setBlocks] = useState([]);
  const [message, setMessage] = useState('');
  const token = localStorage.getItem('token');

  const fetchBlocks = async () => {
    const { data } = await axios.get('http://localhost:5000/api/blocks', {
      headers: { Authorization: `Bearer ${token}` },
    });
    setBlocks(data.blocks || data);
  };

  const mineBlock = async () => {
    setMessage('Minerar...');
    try {
      await axios.post(
        'http://localhost:5000/api/blocks/mine',
        {},
        { headers: { Authorization: `Bearer ${token}` } }
      );
      setMessage('✅ Nytt block skapat');
      fetchBlocks();
    } catch (error) {
      setMessage('❌ Kunde inte mine:a block');
    }
  };

  useEffect(() => {
    fetchBlocks();
  }, []);

  return (
    <div className="p-4 space-y-4">
      <h1 className="text-2xl font-bold">Blockkedjan</h1>
      <button onClick={mineBlock} className="bg-yellow-500 text-white p-2 rounded">Mine:a nytt block</button>
      {message && <p>{message}</p>}

      <ul className="space-y-2">
        {blocks.map((block) => (
          <li key={block._id} className="bg-white p-4 rounded shadow">
            <div className="text-xs text-gray-500">Index: {block.index}</div>
            <div>Hash: {block.hash}</div>
            <div>PreviousHash: {block.previousHash}</div>
            <div>Transaktioner: {block.transactions.length}</div>
          </li>
        ))}
      </ul>
    </div>
  );
}