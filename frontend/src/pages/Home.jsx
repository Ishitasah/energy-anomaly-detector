import { useEffect, useState } from 'react'
import StatCards from '../components/StatCards'
import EnergyChart from '../components/EnergyChart'
import AlertPanel from '../components/AlertPanel'

const API = import.meta.env.VITE_API_URL || 'http://localhost:5000'

export default function Home() {
  const [readings, setReadings] = useState([])
  const [anomalies, setAnomalies] = useState([])
  const [stats, setStats] = useState({})

  useEffect(() => {
    fetch(`${API}/api/readings`).then(r => r.json()).then(setReadings)
    fetch(`${API}/api/anomalies`).then(r => r.json()).then(setAnomalies)
    fetch(`${API}/api/anomalies/stats`).then(r => r.json()).then(setStats)
  }, [])

  const handleReview = async (id) => {
    await fetch(`${API}/api/anomalies/${id}/review`, { method: 'PATCH' })
    setAnomalies(prev => prev.map(a => a._id === id ? {...a, reviewed: true} : a))
  }

  return (
    <div>
      <h1 style={{ fontSize: '22px', fontWeight: '500', marginBottom: '24px' }}>Energy Anomaly Dashboard</h1>
      <StatCards stats={stats} />
      <EnergyChart readings={readings} />
      <AlertPanel anomalies={anomalies} onReview={handleReview} />
    </div>
  )
}