export default function AlertPanel({ anomalies, onReview }) {
  const severityColor = { high: '#DC2626', medium: '#D97706', low: '#059669' }

  return (
    <div style={{ background: '#fff', borderRadius: '8px', border: '1px solid #E5E7EB', padding: '20px' }}>
      <h3 style={{ marginBottom: '16px', fontSize: '15px', fontWeight: '500' }}>Anomaly Alerts</h3>
      {anomalies.length === 0 && <p style={{ color: '#6B7280', fontSize: '13px' }}>No anomalies detected.</p>}
      {anomalies.map(a => (
        <div key={a._id} style={{ display: 'flex', alignItems: 'center', gap: '12px', padding: '10px 0', borderBottom: '1px solid #F3F4F6' }}>
          <span style={{ width: '8px', height: '8px', borderRadius: '50%', background: severityColor[a.severity], flexShrink: 0 }} />
          <div style={{ flex: 1 }}>
            <div style={{ fontSize: '13px', fontWeight: '500' }}>{a.usage_kwh.toFixed(2)} kWh</div>
            <div style={{ fontSize: '11px', color: '#6B7280' }}>{new Date(a.timestamp).toLocaleString()}</div>
          </div>
          <span style={{ fontSize: '11px', padding: '2px 8px', borderRadius: '12px', background: severityColor[a.severity] + '20', color: severityColor[a.severity] }}>
            {a.severity}
          </span>
          {!a.reviewed && (
            <button onClick={() => onReview(a._id)} style={{ fontSize: '11px', padding: '4px 10px', border: '1px solid #E5E7EB', borderRadius: '6px', cursor: 'pointer', background: '#F9FAFB' }}>
              Mark reviewed
            </button>
          )}
        </div>
      ))}
    </div>
  )
}