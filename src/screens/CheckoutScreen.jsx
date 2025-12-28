import { useNavigate } from 'react-router-dom'
import { useCart } from '../context/CartContext'
import PriceSummary from '../components/PriceSummary'
import Button from '../components/Button'
import './CheckoutScreen.css'

const CheckoutScreen = () => {
  const navigate = useNavigate()
  const { cart, isSubscription, getOrderPrice, clearCart } = useCart()

  // Fixed pricing: ₹250 for one-time, ₹300 for weekly subscription
  const orderPrice = getOrderPrice()

  const handlePlaceOrder = () => {
    // Mock order placement
    const orderId = Math.floor(Math.random() * 1000000)
    clearCart()
    navigate(`/order/${orderId}`)
  }

  return (
    <div className="checkout-screen">
      <div className="checkout-header">
        <button className="back-button" onClick={() => navigate(-1)}>
          ← Back
        </button>
        <h1 className="checkout-title">Checkout</h1>
      </div>

      <div className="checkout-content">
        {/* Subscription Info Banner (only for subscriptions) */}
        {isSubscription && (
          <div className="subscription-info-banner">
            <p className="subscription-info-text">
              📅 Weekly Subscription: ₹300 per week. You are charged once per week. 
              Bowls are delivered automatically for 6 days. 
              Delivery agents are automatically assigned daily.
            </p>
          </div>
        )}

        {/* One-time Order Info (only for one-time orders) */}
        {!isSubscription && (
          <div className="one-time-info-banner">
            <p className="one-time-info-text">
              🍎 One-time Delivery: ₹250 (delivery included). Single delivery only.
            </p>
          </div>
        )}

        {/* Delivery Address */}
        <div className="address-card">
          <div className="card-header">
            <h2 className="card-title">Delivery Address</h2>
            <button className="edit-button">Edit</button>
          </div>
          <div className="address-details">
            <p className="address-name">John Doe</p>
            <p className="address-line">123 Main Street</p>
            <p className="address-line">Apt 4B</p>
            <p className="address-line">Mumbai, Maharashtra 400001</p>
            <p className="address-phone">Phone: +91 98765 43210</p>
          </div>
        </div>

        {/* Payment Method */}
        <div className="payment-card">
          <div className="card-header">
            <h2 className="card-title">Payment Method</h2>
            <button className="edit-button">Change</button>
          </div>
          <div className="payment-details">
            <div className="payment-method">
              <span className="payment-icon">💳</span>
              <div className="payment-info">
                <p className="payment-type">Credit Card</p>
                <p className="payment-number">**** **** **** 1234</p>
              </div>
            </div>
          </div>
        </div>

        {/* Order Summary */}
        <div className="order-summary-card">
          <h2 className="card-title">Order Summary</h2>
          <div className="order-items">
            {isSubscription ? (
              <div className="order-item">
                <span className="order-item-name">Weekly Subscription Bowl</span>
                <span className="order-item-price">₹{orderPrice.toFixed(0)}</span>
              </div>
            ) : (
              <div className="order-item">
                <span className="order-item-name">One-time Delivery Bowl</span>
                <span className="order-item-price">₹{orderPrice.toFixed(0)}</span>
              </div>
            )}
            <div className="order-bowl-details">
              <p className="order-bowl-label">Bowl Contents:</p>
              {cart.map((item) => (
                <p key={item.id} className="order-bowl-item">
                  {item.name} × {item.quantity}
                </p>
              ))}
            </div>
          </div>
        </div>

        {/* Price Summary */}
        <PriceSummary
          items={1}
          subtotal={orderPrice}
          delivery={0}
          discount={0}
          total={orderPrice}
          isSubscription={isSubscription}
        />

        {/* Place Order Button */}
        <div className="place-order-section">
          <Button
            variant="primary"
            size="lg"
            fullWidth
            onClick={handlePlaceOrder}
          >
            Place Order - ₹{orderPrice.toFixed(0)}
          </Button>
        </div>
      </div>
    </div>
  )
}

export default CheckoutScreen

