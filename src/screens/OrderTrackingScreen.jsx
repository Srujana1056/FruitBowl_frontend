import { useParams, useNavigate } from 'react-router-dom'
import { orderStatuses } from '../data/dummyData'
import Button from '../components/Button'
import './OrderTrackingScreen.css'

const OrderTrackingScreen = () => {
  const { id } = useParams()
  const navigate = useNavigate()
  
  // Mock: Get current status (in real app, this would come from API)
  const currentStatusIndex = 2 // "Out for delivery"
  const currentStatus = orderStatuses[currentStatusIndex]

  return (
    <div className="order-tracking-screen">
      <div className="tracking-header">
        <button className="back-button" onClick={() => navigate(-1)}>
          ← Back
        </button>
        <h1 className="tracking-title">Order #{id}</h1>
        <p className="tracking-subtitle">Estimated delivery: 30 minutes</p>
      </div>

      <div className="tracking-content">
        {/* Status Timeline */}
        <div className="status-timeline">
          {orderStatuses.map((status, index) => {
            const isCompleted = index <= currentStatusIndex
            const isCurrent = index === currentStatusIndex

            return (
              <div
                key={status.id}
                className={`timeline-item ${isCompleted ? 'completed' : ''} ${isCurrent ? 'current' : ''}`}
              >
                <div className="timeline-marker">
                  {isCompleted ? (
                    <span className="marker-icon">✓</span>
                  ) : (
                    <span className="marker-dot"></span>
                  )}
                </div>
                <div className="timeline-content">
                  <h3 className="timeline-status">{status.label}</h3>
                  <p className="timeline-time">{status.time}</p>
                </div>
                {index < orderStatuses.length - 1 && (
                  <div className={`timeline-line ${isCompleted ? 'completed' : ''}`}></div>
                )}
              </div>
            )
          })}
        </div>

        {/* Map Placeholder */}
        <div className="map-placeholder">
          <div className="map-content">
            <span className="map-icon">🗺️</span>
            <p className="map-text">Live tracking map</p>
            <p className="map-subtext">Your order is on the way</p>
          </div>
        </div>

        {/* Delivery Agent */}
        <div className="delivery-agent-card">
          <h2 className="agent-title">Delivery Agent</h2>
          <div className="agent-info">
            <div className="agent-avatar">
              <span className="avatar-emoji">🚴</span>
            </div>
            <div className="agent-details">
              <p className="agent-name">John Smith</p>
              <p className="agent-phone">+1 (555) 987-6543</p>
            </div>
            <button className="call-button">📞</button>
          </div>
        </div>

        {/* Order Details */}
        <div className="order-details-card">
          <h2 className="details-title">Order Details</h2>
          <div className="details-list">
            <div className="detail-item">
              <span className="detail-label">Order ID</span>
              <span className="detail-value">#{id}</span>
            </div>
            <div className="detail-item">
              <span className="detail-label">Order Date</span>
              <span className="detail-value">Today, 10:30 AM</span>
            </div>
            <div className="detail-item">
              <span className="detail-label">Delivery Address</span>
              <span className="detail-value">123 Main St, City</span>
            </div>
            <div className="detail-item">
              <span className="detail-label">Payment Method</span>
              <span className="detail-value">Credit Card</span>
            </div>
          </div>
        </div>

        {/* Action Buttons */}
        <div className="action-buttons">
          <Button
            variant="outline"
            size="md"
            fullWidth
            onClick={() => navigate('/home')}
          >
            Continue Shopping
          </Button>
        </div>
      </div>
    </div>
  )
}

export default OrderTrackingScreen

