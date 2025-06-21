import { useEffect, useState } from 'react'
import axios from 'axios'
import { useNavigate } from 'react-router-dom'

export default function Transactions() {
  const [transactions, setTransactions] = useState([])
  const [recipient, setRecipient] = useState('')
  const [amount, setAmount] = useState('')
  const navigate = useNavigate()

  useEffect(() => {
    fetchTransactions()
  }, [])

  const fetchTransactions = async () => {
    const token = localStorage.getItem('token')
    if (!token) return navigate('/login')
    const res = await axios.get('http://localhost:5000/api/transactions', {
      headers: { Authorization: `Bearer ${token}` }
    })
    setTransactions(res.data)
  }

  const createTransaction = async (e) => {
    e.preventDefault()
    const token = localStorage.getItem('token')
    await axios.post('http://localhost:5000/api/transactions', { recipient, amount }, {
      headers: { Authorization: `Bearer ${token}` }
    })
    setRecipient('')
    setAmount('')
    fetchTransactions()
  }

  return (
    <div className="p-6 space-y-6">
      <h2 className="text-2xl font-bold">Mina Transaktioner</h2>
      <form onSubmit={createTransaction} className="space-y-2 bg-white p-4 rounded shadow-md max-w-md">
        <input className="w-full border p-2 rounded" placeholder="Mottagare" value={recipient} onChange={e => setRecipient(e.target.value)} />
        <input className="w-full border p-2 rounded" placeholder="Belopp" value={amount} onChange={e => setAmount(e.target.value)} />
        <button className="w-full bg-green-500 text-white p-2 rounded">Skicka</button>
      </form>
      <ul className="bg-white p-4 rounded shadow-md space-y-1">
        {transactions.map((t) => (
          <li key={t._id}>{t.sender} ➜ {t.recipient}: {t.amount}</li>
        ))}
      </ul>
    </div>
  )
}