import { useEffect, useState } from 'react';
import API from '../api/api';

export default function TransactionsPage() {
  const [transactions, setTransactions] = useState([]);
  const [newTx, setNewTx] = useState({ fromAddress: '', toAddress: '', amount: 0 });

  useEffect(() => {
    API.get('/transactions/pool').then(res => setTransactions(res.data));
  }, []);

  const createTransaction = async () => {
    await API.post('/transactions', newTx);
    setNewTx({ fromAddress: '', toAddress: '', amount: 0 });
    const res = await API.get('/transactions/pool');
    setTransactions(res.data);
  };

  return (
    <div className="p-4">
      <h2>Skapa transaktion</h2>
      <input placeholder="Från" value={newTx.fromAddress} onChange={(e) => setNewTx({ ...newTx, fromAddress: e.target.value })} />
      <input placeholder="Till" value={newTx.toAddress} onChange={(e) => setNewTx({ ...newTx, toAddress: e.target.value })} />
      <input type="number" placeholder="Belopp" value={newTx.amount} onChange={(e) => setNewTx({ ...newTx, amount: Number(e.target.value) })} />
      <button onClick={createTransaction}>Lägg till</button>

      <h3>Transaktionspool</h3>
      <ul>
        {transactions.map((tx, i) => (
          <li key={i}>{tx.fromAddress} ➡️ {tx.toAddress} ({tx.amount})</li>
        ))}
      </ul>
    </div>
  );
}