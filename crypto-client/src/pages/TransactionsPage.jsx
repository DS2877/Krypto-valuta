import { useEffect, useState } from 'react';
import axios from 'axios';

function TransactionsPage({ token }) {
  const [transactions, setTransactions] = useState([]);
  const [receiver, setReceiver] = useState('');
  const [amount, setAmount] = useState('');
  const [error, setError] = useState('');

  const fetchTransactions = async () => {
    try {
      const res = await axios.get('/api/transactions', {
        headers: { Authorization: `Bearer ${token}` },
      });
      setTransactions(res.data);
    } catch (err) {
      setError('Kunde inte hämta transaktioner.');
    }
  };

  const createTransaction = async (e) => {
    e.preventDefault();
    setError('');
    try {
      await axios.post(
        '/api/transactions',
        { receiver, amount: parseFloat(amount) },
        { headers: { Authorization: `Bearer ${token}` } }
      );
      setReceiver('');
      setAmount('');
      fetchTransactions();
    } catch (err) {
      setError('Kunde inte skapa transaktion.');
    }
  };

  useEffect(() => {
    fetchTransactions();
  }, []);

  return (
    <div className="p-4">
      <h1 className="text-2xl mb-4">Transaktioner</h1>

      <form onSubmit={createTransaction} className="flex gap-2 mb-4">
        <input
          type="text"
          placeholder="Mottagare"
          value={receiver}
          onChange={(e) => setReceiver(e.target.value)}
          className="border p-1"
          required
        />
        <input
          type="number"
          placeholder="Belopp"
          value={amount}
          onChange={(e) => setAmount(e.target.value)}
          className="border p-1"
          required
        />
        <button type="submit" className="bg-blue-500 text-white px-3 rounded">
          Skapa
        </button>
      </form>

      {error && <p className="text-red-500">{error}</p>}

      <ul className="list-disc pl-5">
        {transactions.map((tx) => (
          <li key={tx._id}>{tx.sender} skickade {tx.amount} till {tx.receiver}</li>
        ))}
      </ul>
    </div>
  );
}

export default TransactionsPage;