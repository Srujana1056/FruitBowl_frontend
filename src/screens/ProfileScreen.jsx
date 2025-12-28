import { useNavigate } from 'react-router-dom'
import { useAuth } from '../context/AuthContext'
import Button from '../components/Button'
import './ProfileScreen.css'

const ProfileScreen = () => {
  const navigate = useNavigate()
  const { user, logout } = useAuth()

  const handleLogout = () => {
    logout()
    navigate('/login')
  }

  const menuItems = [
    { icon: '📍', label: 'Saved Addresses', action: () => alert('Saved addresses') },
    { icon: '📦', label: 'Order History', action: () => alert('Order history') },
    { icon: '🔄', label: 'Subscription Management', action: () => navigate('/subscription') },
    { icon: '💳', label: 'Payment Methods', action: () => alert('Payment methods') },
    { icon: '⚙️', label: 'Settings', action: () => alert('Settings') },
    { icon: '❓', label: 'Help & Support', action: () => alert('Help & support') }
  ]

  return (
    <div className="profile-screen">
      <div className="profile-header">
        <h1 className="profile-title">Profile</h1>
      </div>

      <div className="profile-content">
        {/* User Info Card */}
        <div className="user-info-card">
          <div className="user-avatar">
            <span className="avatar-emoji">👤</span>
          </div>
          <div className="user-details">
            <h2 className="user-name">{user?.name || 'User'}</h2>
            <p className="user-email">{user?.email || 'user@example.com'}</p>
            <p className="user-phone">{user?.phone || '+1 (555) 123-4567'}</p>
          </div>
          <button className="edit-profile-btn" onClick={() => alert('Edit profile')}>
            Edit
          </button>
        </div>

        {/* Menu Items */}
        <div className="menu-section">
          {menuItems.map((item, index) => (
            <button
              key={index}
              className="menu-item"
              onClick={item.action}
            >
              <span className="menu-icon">{item.icon}</span>
              <span className="menu-label">{item.label}</span>
              <span className="menu-arrow">›</span>
            </button>
          ))}
        </div>

        {/* Logout Button */}
        <div className="logout-section">
          <Button
            variant="outline"
            size="lg"
            fullWidth
            onClick={handleLogout}
          >
            Logout
          </Button>
        </div>
      </div>
    </div>
  )
}

export default ProfileScreen

