import { useEffect, useState } from 'react';
import axios from 'axios';

export default function TransactionsPage() {
  const [transactions, setTransactions] = useState([]);
  const [recipient, setRecipient] = useState('');
  const [amount, setAmount] = useState('');
  const [message, setMessage] = useState('');

  const token = localStorage.getItem('token');

  const fetchTransactions = async () => {
    const { data } = await axios.get('http://localhost:5000/api/transactions', {
      headers: { Authorization: `Bearer ${token}` },
    });
    setTransactions(data.transactions || data);
  };

  const createTransaction = async (e) => {
    e.preventDefault();
    setMessage('');
    try {
      await axios.post(
        'http://localhost:5000/api/transactions',
        { recipient, amount: Number(amount) },
        { headers: { Authorization: `Bearer ${token}` } }
      );
      setMessage('Transaktion skapad ✅');
      setRecipient('');
      setAmount('');
      fetchTransactions();
    } catch (error) {
      setMessage('Kunde inte skapa transaktion ❌');
    }
  };

  useEffect(() => {
    fetchTransactions();
  }, []);

  return (
    <div className="p-4 space-y-4">
      <h1 className="text-2xl font-bold mb-4">Mina transaktioner</h1>
      <form onSubmit={createTransaction} className="bg-white p-4 rounded shadow space-y-2">
        <input
          className="w-full border p-2 rounded"
          placeholder="Mottagare"
          value={recipient}
          onChange={(e) => setRecipient(e.target.value)}
          required
        />
        <input
          className="w-full border p-2 rounded"
          placeholder="Belopp"
          value={amount}
          onChange={(e) => setAmount(e.target.value)}
          type="number"
          required
        />
        <button className="bg-green-500 text-white p-2 rounded w-full" type="submit">Skicka transaktion</button>
        {message && <p className="text-center mt-2">{message}</p>}
      </form>

      <h2 className="text-xl font-semibold mt-8">Tidigare transaktioner</h2>
      <ul className="space-y-2">
        {transactions.map((tx) => (
          <li key={tx._id} className="bg-white p-4 rounded shadow flex justify-between">
            <span>{tx.sender} → {tx.recipient}</span>
            <span>{tx.amount} coins</span>
          </li>
        ))}
      </ul>
    </div>
  );
}