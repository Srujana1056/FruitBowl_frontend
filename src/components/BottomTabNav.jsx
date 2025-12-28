import { useNavigate, useLocation } from 'react-router-dom'
import { useCart } from '../context/CartContext'
import './BottomTabNav.css'

const BottomTabNav = () => {
  const navigate = useNavigate()
  const location = useLocation()
  const { getTotalItems } = useCart()

  // Don't show on auth screens or splash
  const hideOnPaths = ['/login', '/signup', '/']
  if (hideOnPaths.includes(location.pathname)) {
    return null
  }

  const tabs = [
    { path: '/home', icon: '🏠', label: 'Home' },
    { path: '/cart', icon: '🛒', label: 'Cart', badge: getTotalItems() },
    { path: '/profile', icon: '👤', label: 'Profile' }
  ]

  const isActive = (path) => {
    if (path === '/home') {
      return location.pathname === '/home' || location.pathname === '/'
    }
    return location.pathname.startsWith(path)
  }

  return (
    <nav className="bottom-tab-nav">
      {tabs.map((tab) => (
        <button
          key={tab.path}
          className={`tab-item ${isActive(tab.path) ? 'active' : ''}`}
          onClick={() => navigate(tab.path)}
        >
          <span className="tab-icon">{tab.icon}</span>
          <span className="tab-label">{tab.label}</span>
          {tab.badge > 0 && (
            <span className="tab-badge">{tab.badge}</span>
          )}
        </button>
      ))}
    </nav>
  )
}

export default BottomTabNav

