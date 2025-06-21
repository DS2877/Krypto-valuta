import { useState } from 'react'
import axios from 'axios'
import { useNavigate } from 'react-router-dom'

export default function MineBlock() {
  const [message, setMessage] = useState('')
  const navigate = useNavigate()

  const mine = async () => {
    setMessage('')
    const token = localStorage.getItem('token')
    if (!token) return navigate('/login')
    const res = await axios.post('http://localhost:5000/api/blocks/mine', {}, {
      headers: { Authorization: `Bearer ${token}` }
    })
    setMessage(`Block mined! ID: ${res.data._id}`)
  }

  return (
    <div className="p-6 bg-white rounded shadow-md space-y-2">
      <h2 className="text-xl font-bold">Mina ett block</h2>
      <button className="bg-blue-600 text-white p-2 rounded" onClick={mine}>Mine block</button>
      {message && <p>{message}</p>}
    </div>
  )
}