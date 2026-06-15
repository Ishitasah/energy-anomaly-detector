import { useEffect, useState } from 'react'

const API = import.meta.env.VITE_API_URL || 'http://localhost:5000'

export default function History() {
  const [readings, setReadings] = useState([])

  useEffect(() => {
    fetch(`${API}/api/readings`).then(r => r.json()).then(setReadings)
  }, [])

  return (
    <div>
      <h1 style={{ fontSize: '22px', fontWeight: '500', marginBottom: '24px' }}>Reading History</h1>
      <div style={{ background: '#fff', borderRadius: '8px', border: '1px solid #E5E7EB', overflow: 'hidden' }}>
        <table style={{ width: '100%', borderCollapse: 'collapse', fontSize: '13px' }}>
          <thead>
            <tr style={{ background: '#F9FAFB' }}>
              <th style={{ padding: '12px 16px', textAlign: 'left', fontWeight: '500' }}>Timestamp</th>
              <th style={{ padding: '12px 16px', textAlign: 'left', fontWeight: '500' }}>Usage (kWh)</th>
              <th style={{ padding: '12px 16px', textAlign: 'left', fontWeight: '500' }}>Anomaly</th>
              <th style={{ padding: '12px 16px', textAlign: 'left', fontWeight: '500' }}>Severity</th>
            </tr>
          </thead>
          <tbody>
            {readings.map(r => (
              <tr key={r._id} style={{ borderTop: '1px solid #F3F4F6', background: r.is_anomaly ? '#FEF2F2' : 'white' }}>
                <td style={{ padding: '10px 16px' }}>{new Date(r.timestamp).toLocaleString()}</td>
                <td style={{ padding: '10px 16px' }}>{r.usage_kwh.toFixed(2)}</td>
                <td style={{ padding: '10px 16px' }}>{r.is_anomaly ? '🔴 Yes' : '✅ No'}</td>
                <td style={{ padding: '10px 16px' }}>{r.severity}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  )
}