import { useEffect, useState } from 'react';
import API from '../api/api';

export default function BlocksPage() {
  const [blocks, setBlocks] = useState([]);

  const loadBlocks = async () => {
    const res = await API.get('/blocks');
    setBlocks(res.data);
  };

  const mineBlock = async () => {
    await API.post('/blocks/mine');
    loadBlocks();
  };

  useEffect(() => {
    loadBlocks();
  }, []);

  return (
    <div className="p-4">
      <h2>Blockkedja</h2>
      <button onClick={mineBlock}>⛏️ Mine:a nytt block</button>
      <ul>
        {blocks.map((block) => (
          <li key={block.index}>
            Block #{block.index} - {block.transactions.length} transaktioner
          </li>
        ))}
      </ul>
    </div>
  );
}