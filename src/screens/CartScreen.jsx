import { useState } from 'react'
import { useNavigate } from 'react-router-dom'
import { useCart } from '../context/CartContext'
import QuantitySelector from '../components/QuantitySelector'
import PriceSummary from '../components/PriceSummary'
import Button from '../components/Button'
import './CartScreen.css'

const CartScreen = () => {
  const navigate = useNavigate()
  const { cart, updateQuantity, removeFromCart, isSubscription, setIsSubscription, getOrderPrice } = useCart()
  const [deliveryDate, setDeliveryDate] = useState('')

  const handleProceedToCheckout = () => {
    if (cart.length === 0) {
      alert('Your cart is empty')
      return
    }
    navigate('/checkout')
  }

  if (cart.length === 0) {
    return (
      <div className="cart-screen">
        <div className="cart-header">
          <h1 className="cart-title">Your Cart</h1>
        </div>
        <div className="empty-cart">
          <div className="empty-cart-emoji">🛒</div>
          <p className="empty-cart-text">Your cart is empty</p>
          <Button onClick={() => navigate('/home')}>Browse Fruits</Button>
        </div>
      </div>
    )
  }

  // Fixed pricing: ₹250 for one-time, ₹300 for weekly subscription
  const orderPrice = getOrderPrice()

  return (
    <div className="cart-screen">
      <div className="cart-header">
        <h1 className="cart-title">Your Cart</h1>
        <p className="cart-subtitle">{cart.length} {cart.length === 1 ? 'item' : 'items'}</p>
      </div>

      <div className="cart-content">
        {/* Cart Items - Show bowl customization */}
        <div className="cart-items">
          <div className="bowl-summary-card">
            <h3 className="bowl-summary-title">Your Custom Bowl</h3>
            <div className="bowl-fruits-list">
              {cart.map((item) => (
                <div key={item.id} className="bowl-fruit-item">
                  <div className="bowl-fruit-image">
                    {typeof item.image === 'string' && item.image.startsWith('http') ? (
                      <img src={item.image} alt={item.name} className="bowl-fruit-img" />
                    ) : (
                      <span className="bowl-fruit-emoji">{item.image}</span>
                    )}
                  </div>
                  <div className="bowl-fruit-info">
                    <span className="bowl-fruit-name">{item.name}</span>
                    <span className="bowl-fruit-quantity">× {item.quantity}</span>
                  </div>
                  <button
                    className="remove-fruit-btn-small"
                    onClick={() => removeFromCart(item.id)}
                    aria-label="Remove fruit"
                  >
                    ×
                  </button>
                </div>
              ))}
            </div>
            <div className="bowl-customize-note">
              {isSubscription 
                ? "This is your default bowl. You can customize it daily."
                : "Customize your one-time delivery bowl."
              }
            </div>
          </div>
        </div>

        {/* Delivery Date Selector */}
        <div className="delivery-date-section">
          <label htmlFor="delivery-date" className="delivery-date-label">
            Delivery Date
          </label>
          <input
            id="delivery-date"
            type="date"
            value={deliveryDate}
            onChange={(e) => setDeliveryDate(e.target.value)}
            className="delivery-date-input"
            min={new Date().toISOString().split('T')[0]}
          />
        </div>

        {/* Order Type Toggle */}
        <div className="subscription-toggle-section">
          <div className="toggle-header">
            <div>
              <h3 className="toggle-title">Order Type</h3>
              <p className="toggle-subtitle">
                {isSubscription 
                  ? "Weekly Subscription: ₹300 per week. You are charged once per week. Bowls are delivered automatically for 6 days."
                  : "One-time Delivery: ₹250 (delivery included). Single delivery only."
                }
              </p>
              {!isSubscription && (
                <p className="convert-subscription-text">
                  💡 Convert to Weekly Subscription to save and get 6 days of delivery
                </p>
              )}
            </div>
            <label className="toggle-switch">
              <input
                type="checkbox"
                checked={isSubscription}
                onChange={(e) => {
                  const newIsSubscription = e.target.checked
                  if (newIsSubscription) {
                    // Enforce 5-fruit limit when converting to subscription
                    const MAX_FRUITS = 5
                    const totalFruits = cart.reduce((sum, item) => sum + item.quantity, 0)
                    if (totalFruits > MAX_FRUITS) {
                      alert(`Subscription bowls can have maximum ${MAX_FRUITS} fruits. Please remove some fruits first.`)
                      return
                    }
                    // Remove excess fruits if more than 5 unique fruits
                    const uniqueFruits = cart.length
                    if (uniqueFruits > MAX_FRUITS) {
                      const fruitsToKeep = cart.slice(0, MAX_FRUITS)
                      // Clear cart and add only first 5 fruits
                      cart.forEach((item, index) => {
                        if (index >= MAX_FRUITS) {
                          removeFromCart(item.id)
                        }
                      })
                      alert(`Subscription allows maximum ${MAX_FRUITS} fruits. Extra fruits have been removed.`)
                    }
                  }
                  setIsSubscription(newIsSubscription)
                }}
              />
              <span className="toggle-slider"></span>
            </label>
          </div>
        </div>

        {/* Price Summary */}
        <PriceSummary
          items={1}
          subtotal={orderPrice}
          delivery={isSubscription ? 0 : 0}
          discount={0}
          total={orderPrice}
          isSubscription={isSubscription}
        />

        {/* Checkout Button */}
        <div className="checkout-section">
          <Button
            variant="primary"
            size="lg"
            fullWidth
            onClick={handleProceedToCheckout}
          >
            Proceed to Checkout
          </Button>
        </div>
      </div>
    </div>
  )
}

export default CartScreen

