import { LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer } from 'recharts'

export default function EnergyChart({ readings }) {
  const data = readings.map(r => ({
    time: new Date(r.timestamp).toLocaleDateString(),
    usage: r.usage_kwh,
    anomaly: r.is_anomaly ? r.usage_kwh : null
  }))

  return (
    <div style={{ background: '#fff', borderRadius: '8px', padding: '20px', border: '1px solid #E5E7EB', marginBottom: '24px' }}>
      <h3 style={{ marginBottom: '16px', fontSize: '15px', fontWeight: '500' }}>Energy Consumption — Last 500 Readings</h3>
      <ResponsiveContainer width='100%' height={300}>
        <LineChart data={data}>
          <CartesianGrid strokeDasharray='3 3' stroke='#F3F4F6' />
          <XAxis dataKey='time' tick={{ fontSize: 11 }} />
          <YAxis tick={{ fontSize: 11 }} />
          <Tooltip />
          <Line type='monotone' dataKey='usage' stroke='#6B46C1' dot={false} strokeWidth={1.5} />
          <Line type='monotone' dataKey='anomaly' stroke='#DC2626' dot={{ fill: '#DC2626', r: 4 }} strokeWidth={0} />
        </LineChart>
      </ResponsiveContainer>
    </div>
  )
}