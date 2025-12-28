import { useState } from 'react'
import { useNavigate } from 'react-router-dom'
import Button from '../components/Button'
import './SubscriptionScreen.css'

const SubscriptionScreen = () => {
  const navigate = useNavigate()
  const [startDate, setStartDate] = useState('')
  const [isPaused, setIsPaused] = useState(false)
  const [autoRenew, setAutoRenew] = useState(true)
  const [cancelUsed, setCancelUsed] = useState(false)

  // Delivery days (6 days per week)
  const deliveryDays = [
    { id: 1, name: 'Monday', deliveryTime: '10:00' },
    { id: 2, name: 'Tuesday', deliveryTime: '10:00' },
    { id: 3, name: 'Wednesday', deliveryTime: '10:00' },
    { id: 4, name: 'Thursday', deliveryTime: '10:00' },
    { id: 5, name: 'Friday', deliveryTime: '10:00' },
    { id: 6, name: 'Saturday', deliveryTime: '10:00' }
  ]

  // Check if current time is before 4 hours of delivery
  const canCancelToday = (deliveryTime) => {
    const now = new Date()
    const [hours, minutes] = deliveryTime.split(':')
    const deliveryDate = new Date()
    deliveryDate.setHours(parseInt(hours), parseInt(minutes), 0, 0)
    
    // If delivery time has passed today, check for tomorrow
    if (deliveryDate < now) {
      deliveryDate.setDate(deliveryDate.getDate() + 1)
    }
    
    const hoursUntilDelivery = (deliveryDate - now) / (1000 * 60 * 60)
    return hoursUntilDelivery >= 4
  }

  const handleCancelDay = (dayId) => {
    if (cancelUsed) {
      alert('You can only cancel one day per week. This option has already been used.')
      return
    }
    
    const day = deliveryDays.find(d => d.id === dayId)
    if (!canCancelToday(day.deliveryTime)) {
      alert('You can only cancel a delivery if you act before 4 hours of the delivery time.')
      return
    }
    
    // Cancel the day - bowl moves to last day
    setCancelUsed(true)
    alert(`Today's bowl has been cancelled. It will be delivered on the last day of the week (${deliveryDays[deliveryDays.length - 1].name}).`)
  }

  const handleSubscribe = () => {
    if (!startDate) {
      alert('Please select a start date')
      return
    }
    alert('Subscription activated!')
    navigate('/home')
  }

  return (
    <div className="subscription-screen">
      <div className="subscription-header">
        <button className="back-button" onClick={() => navigate(-1)}>
          ← Back
        </button>
        <h1 className="subscription-title">Weekly Subscription</h1>
        <p className="subscription-subtitle">Get fresh bowls 6 days a week</p>
      </div>

      <div className="subscription-content">
        {/* Benefits Card */}
        <div className="benefits-card">
          <h2 className="benefits-title">Weekly Subscription - ₹300</h2>
          <ul className="benefits-list">
            <li>💰 Fixed price: ₹300 per week</li>
            <li>📅 6 deliveries per week</li>
            <li>🚚 Free delivery (included)</li>
            <li>🍎 Customize your bowl daily</li>
            <li>❌ Cancel one day per week (before 4 hours)</li>
            <li>🔄 Auto-renew or cancel anytime</li>
          </ul>
        </div>

        {/* Start Date Picker */}
        <div className="start-date-section">
          <label htmlFor="start-date" className="start-date-label">
            Start Date
          </label>
          <input
            id="start-date"
            type="date"
            value={startDate}
            onChange={(e) => setStartDate(e.target.value)}
            className="start-date-input"
            min={new Date().toISOString().split('T')[0]}
          />
        </div>

        {/* Cancel Day Information */}
        <div className="cancel-info-section">
          <h3 className="cancel-info-title">Cancel Delivery Day</h3>
          <p className="cancel-info-text">
            You can cancel one day per week before 4 hours of delivery time.
          </p>
          <p className="cancel-info-text">
            Cancelled bowl will be delivered on the last day of the week.
          </p>
          {cancelUsed && (
            <p className="cancel-used-text">
              ⚠️ Cancel option has been used this week.
            </p>
          )}
        </div>

        {/* Delivery Days with Cancel Option */}
        <div className="delivery-days-section">
          <h3 className="delivery-days-title">This Week's Deliveries</h3>
          <div className="delivery-days-list">
            {deliveryDays.map((day) => {
              const canCancel = canCancelToday(day.deliveryTime) && !cancelUsed
              return (
                <div key={day.id} className="delivery-day-item">
                  <div className="delivery-day-info">
                    <span className="delivery-day-name">{day.name}</span>
                    <span className="delivery-day-time">Delivery: {day.deliveryTime}</span>
                  </div>
                  <button
                    className={`cancel-day-btn ${canCancel ? '' : 'disabled'}`}
                    onClick={() => handleCancelDay(day.id)}
                    disabled={!canCancel}
                  >
                    {canCancel ? 'Cancel Today' : 'Cannot Cancel'}
                  </button>
                </div>
              )
            })}
          </div>
        </div>

        {/* Pause Subscription */}
        <div className="pause-section">
          <div className="toggle-row">
            <div>
              <h3 className="toggle-row-title">Pause Subscription</h3>
              <p className="toggle-row-subtitle">Temporarily stop deliveries</p>
            </div>
            <label className="toggle-switch">
              <input
                type="checkbox"
                checked={isPaused}
                onChange={(e) => setIsPaused(e.target.checked)}
              />
              <span className="toggle-slider"></span>
            </label>
          </div>
        </div>

        {/* Auto-Renew Toggle */}
        <div className="auto-renew-section">
          <div className="toggle-row">
            <div>
              <h3 className="toggle-row-title">Auto-Renew</h3>
              <p className="toggle-row-subtitle">Automatically renew each week</p>
            </div>
            <label className="toggle-switch">
              <input
                type="checkbox"
                checked={autoRenew}
                onChange={(e) => setAutoRenew(e.target.checked)}
              />
              <span className="toggle-slider"></span>
            </label>
          </div>
        </div>

        {/* Subscribe Button */}
        <div className="subscribe-section">
          <Button
            variant="primary"
            size="lg"
            fullWidth
            onClick={handleSubscribe}
            disabled={!startDate}
          >
            Activate Subscription
          </Button>
        </div>
      </div>
    </div>
  )
}

export default SubscriptionScreen

