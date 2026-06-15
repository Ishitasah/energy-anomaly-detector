import { Link } from 'react-router-dom'

export default function Navbar() {
  return (
    <nav style={{ background: '#1E1B4B', padding: '16px 24px', display: 'flex', gap: '24px', alignItems: 'center' }}>
      <span style={{ color: 'white', fontWeight: '600', fontSize: '16px' }}>⚡ Energy Anomaly Detector</span>
      <Link to='/' style={{ color: '#A5B4FC', textDecoration: 'none', fontSize: '14px' }}>Dashboard</Link>
      <Link to='/history' style={{ color: '#A5B4FC', textDecoration: 'none', fontSize: '14px' }}>History</Link>
    </nav>
  )
}