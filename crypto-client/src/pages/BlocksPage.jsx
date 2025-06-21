import { useEffect, useState } from 'react';
import axios from 'axios';

function BlocksPage({ token }) {
  const [blocks, setBlocks] = useState([]);
  const [error, setError] = useState('');

  const fetchBlocks = async () => {
    try {
      const res = await axios.get('/api/blocks', {
        headers: { Authorization: `Bearer ${token}` },
      });
      setBlocks(res.data);
    } catch (err) {
      setError('Kunde inte hämta block.');
    }
  };

  const mineBlock = async () => {
    try {
      await axios.post('/api/blocks', {}, {
        headers: { Authorization: `Bearer ${token}` },
      });
      fetchBlocks();
    } catch (err) {
      setError('Kunde inte skapa block.');
    }
  };

  useEffect(() => {
    fetchBlocks();
  }, []);

  return (
    <div className="p-4">
      <h1 className="text-2xl mb-4">Block</h1>
      <button onClick={mineBlock} className="bg-green-500 text-white px-3 rounded mb-4">
        Mina nytt block
      </button>

      {error && <p className="text-red-500">{error}</p>}

      <ul className="list-decimal pl-5">
        {blocks.map((block) => (
          <li key={block._id}>Block #{block.index}, {block.transactions.length} transaktioner</li>
        ))}
      </ul>
    </div>
  );
}

export default BlocksPage;