export default function StatCards({ stats }) {
  const cards = [
    { label: 'Total Readings', value: stats.total, color: '#6B46C1' },
    { label: 'Anomalies Detected', value: stats.totalAnomalies, color: '#DC2626' },
    { label: 'High Severity', value: stats.highSeverity, color: '#D97706' },
    { label: 'Unreviewed', value: stats.unreviewed, color: '#2563EB' },
  ]
  return (
    <div style={{ display: 'grid', gridTemplateColumns: 'repeat(4, 1fr)', gap: '16px', marginBottom: '24px' }}>
      {cards.map(c => (
        <div key={c.label} style={{ background: '#F9FAFB', borderRadius: '8px', padding: '16px', border: '1px solid #E5E7EB' }}>
          <div style={{ fontSize: '12px', color: '#6B7280', marginBottom: '4px' }}>{c.label}</div>
          <div style={{ fontSize: '28px', fontWeight: '500', color: c.color }}>{c.value ?? '—'}</div>
        </div>
      ))}
    </div>
  )
}