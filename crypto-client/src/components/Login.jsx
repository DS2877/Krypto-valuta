import { useState } from 'react'
import axios from 'axios'
import { useNavigate } from 'react-router-dom'

export default function Login() {
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const [error, setError] = useState('')
  const navigate = useNavigate()

  const handleLogin = async (e) => {
    e.preventDefault()
    setError('')
    try {
      const res = await axios.post('http://localhost:5000/api/auth/login', { email, password })
      localStorage.setItem('token', res.data.token)
      navigate('/transactions')
    } catch (err) {
      setError(err?.response?.data?.error || 'Fel vid inloggning')
    }
  }

  return (
    <div className="p-6 max-w-sm mx-auto mt-10 bg-white rounded-xl shadow-xl space-y-4">
      <h2 className="text-xl font-bold">Logga in</h2>
      <form onSubmit={handleLogin} className="space-y-3">
        <input className="w-full border p-2 rounded" placeholder="E-post" onChange={e => setEmail(e.target.value)} />
        <input className="w-full border p-2 rounded" type="password" placeholder="Lösenord" onChange={e => setPassword(e.target.value)} />
        {error && <p className="text-red-500">{error}</p>}
        <button className="w-full bg-blue-600 text-white p-2 rounded" type="submit">Logga in</button>
      </form>
    </div>
  )
}