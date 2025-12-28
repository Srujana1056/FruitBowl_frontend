import { useState, useEffect } from 'react'
import { useNavigate, useSearchParams } from 'react-router-dom'
import { fruits } from '../data/dummyData'
import { useCart } from '../context/CartContext'
import FruitCard from '../components/FruitCard'
import QuantitySelector from '../components/QuantitySelector'
import PriceSummary from '../components/PriceSummary'
import Button from '../components/Button'
import './BowlBuilderScreen.css'

const BowlBuilderScreen = () => {
  const navigate = useNavigate()
  const [searchParams] = useSearchParams()
  const isSubscriptionMode = searchParams.get('subscription') === 'true'
  const { cart, addToCart, updateQuantity, removeFromCart, setIsSubscription } = useCart()
  const [bowlName, setBowlName] = useState('')
  const [showBowlOptions, setShowBowlOptions] = useState(false)
  
  // Set subscription mode when entering from subscription flow
  useEffect(() => {
    if (isSubscriptionMode) {
      setIsSubscription(true)
    }
  }, [isSubscriptionMode, setIsSubscription])
  
  // Get fruits that are in the cart
  const bowlItems = cart.filter(item => item.type === 'fruit')
  
  // Calculate total price
  const totalPrice = bowlItems.reduce((total, item) => total + item.price * item.quantity, 0)
  
  // Get available fruits (not already in bowl or show all)
  const availableFruits = fruits

  // Max 5 fruits for subscription
  const MAX_FRUITS = 5
  const canAddMoreFruits = bowlItems.length < MAX_FRUITS

  const handleAddFruit = (fruit) => {
    if (isSubscriptionMode && !canAddMoreFruits) {
      alert(`You can choose up to ${MAX_FRUITS} fruits for your subscription bowl.`)
      return
    }
    addToCart({
      id: `fruit-${fruit.id}`,
      name: fruit.name,
      type: 'fruit',
      price: fruit.price,
      quantity: 1,
      image: fruit.image
    })
  }

  const handleUpdateQuantity = (id, newQuantity) => {
    updateQuantity(id, newQuantity)
  }

  const handleRemoveFruit = (id) => {
    removeFromCart(id)
  }

  const handleBowlComplete = () => {
    if (bowlItems.length === 0) {
      alert('Please add at least one fruit to your bowl')
      return
    }
    
    if (isSubscriptionMode) {
      // Show default bowl vs daily customization options
      setShowBowlOptions(true)
    } else {
      // One-time order: go to cart
      navigate('/cart')
    }
  }

  const handleSetAsDefault = () => {
    // Set as default bowl for all 6 days
    navigate('/subscription')
  }

  const handleCustomizeDaily = () => {
    // Allow daily customization
    navigate('/subscription')
  }

  return (
    <div className="bowl-builder-screen">
      <div className="bowl-builder-header">
        <button className="back-button" onClick={() => navigate(-1)}>
          ← Back
        </button>
        <h1 className="builder-title">Build Your Bowl</h1>
      </div>

      <div className="bowl-builder-content">
        {/* Subscription Mode Info */}
        {isSubscriptionMode && (
          <div className="subscription-mode-info">
            <p className="subscription-mode-text">
              📅 Weekly Subscription: Pay once for the week. Bowls delivered for 6 days.
            </p>
            <p className="subscription-mode-helper">
              You can choose up to {MAX_FRUITS} fruits for your weekly bowl
            </p>
          </div>
        )}

        {/* Bowl Name Input */}
        <div className="bowl-name-section">
          <label htmlFor="bowl-name" className="bowl-name-label">
            Bowl Name (Optional)
          </label>
          <input
            id="bowl-name"
            type="text"
            placeholder="e.g., My Custom Bowl"
            value={bowlName}
            onChange={(e) => setBowlName(e.target.value)}
            className="bowl-name-input"
          />
        </div>

        {/* Selected Fruits Summary */}
        {bowlItems.length > 0 && (
          <div className="selected-fruits-section">
            <h2 className="section-title">Selected Fruits</h2>
            <div className="selected-fruits-list">
              {bowlItems.map((item) => {
                const fruit = fruits.find(f => f.name === item.name)
                return (
                  <div key={item.id} className="selected-fruit-item">
                    <div className="selected-fruit-info">
                      {typeof item.image === 'string' && item.image.startsWith('http') ? (
                        <img src={item.image} alt={item.name} className="selected-fruit-img" />
                      ) : (
                        <span className="selected-fruit-emoji">{item.image}</span>
                      )}
                      <div className="selected-fruit-details">
                        <p className="selected-fruit-name">{item.name}</p>
                        {!isSubscriptionMode && (
                          <p className="selected-fruit-price">
                            ₹{item.price.toFixed(0)} × {item.quantity}
                          </p>
                        )}
                      </div>
                    </div>
                    <div className="selected-fruit-controls">
                      <QuantitySelector
                        quantity={item.quantity}
                        onIncrease={() => handleUpdateQuantity(item.id, item.quantity + 1)}
                        onDecrease={() => handleUpdateQuantity(item.id, item.quantity - 1)}
                      />
                      <button
                        className="remove-fruit-btn"
                        onClick={() => handleRemoveFruit(item.id)}
                        aria-label="Remove fruit"
                      >
                        🗑️
                      </button>
                    </div>
                  </div>
                )
              })}
            </div>
          </div>
        )}

        {/* Available Fruits */}
        <div className="available-fruits-section">
          <h2 className="section-title">Add Fruits</h2>
          {isSubscriptionMode && (
            <p className="fruits-limit-text">
              {canAddMoreFruits 
                ? `You can choose up to ${MAX_FRUITS} fruits (${bowlItems.length}/${MAX_FRUITS} selected)`
                : `Maximum ${MAX_FRUITS} fruits reached. Remove a fruit to add another.`
              }
            </p>
          )}
          <div className="fruits-grid">
            {availableFruits.map((fruit) => {
              const inBowl = bowlItems.some(item => item.name === fruit.name)
              const isDisabled = isSubscriptionMode && !canAddMoreFruits && !inBowl
              return (
                <div key={fruit.id} className={`fruit-select-card ${isDisabled ? 'disabled' : ''}`}>
                  <FruitCard 
                    fruit={fruit} 
                    onClick={() => !isDisabled && handleAddFruit(fruit)}
                    hidePrice={isSubscriptionMode}
                  />
                  {inBowl && (
                    <div className="in-bowl-badge">In Bowl</div>
                  )}
                  {isDisabled && (
                    <div className="max-fruits-badge">Max Reached</div>
                  )}
                </div>
              )
            })}
          </div>
        </div>

        {/* Price Summary - Only show for one-time orders */}
        {bowlItems.length > 0 && !isSubscriptionMode && (
          <div className="price-summary-section">
            <PriceSummary
              items={bowlItems.reduce((sum, item) => sum + item.quantity, 0)}
              subtotal={totalPrice}
            />
          </div>
        )}

        {/* Bowl Options Modal (Subscription only) */}
        {showBowlOptions && (
          <div className="bowl-options-modal">
            <div className="bowl-options-content">
              <h2 className="bowl-options-title">Choose Bowl Type</h2>
              <p className="bowl-options-subtitle">How would you like to use this bowl?</p>
              
              <div className="bowl-options-buttons">
                <Button
                  variant="primary"
                  size="lg"
                  fullWidth
                  onClick={handleSetAsDefault}
                >
                  Set as Default Bowl
                </Button>
                <p className="bowl-option-description">
                  This bowl will be used for all 6 days of the week
                </p>
                
                <Button
                  variant="secondary"
                  size="lg"
                  fullWidth
                  onClick={handleCustomizeDaily}
                >
                  Customize Daily
                </Button>
                <p className="bowl-option-description">
                  You can edit this bowl separately for each day
                </p>
              </div>
            </div>
          </div>
        )}

        {/* Complete Bowl Button */}
        <div className="add-to-cart-section">
          <Button
            variant="primary"
            size="lg"
            fullWidth
            onClick={handleBowlComplete}
            disabled={bowlItems.length === 0 || (isSubscriptionMode && bowlItems.length > MAX_FRUITS)}
          >
            {isSubscriptionMode 
              ? 'Complete Bowl'
              : bowlItems.length > 0 
                ? `Add to Cart - ₹${totalPrice.toFixed(0)}` 
                : 'Add Fruits to Build Bowl'
            }
          </Button>
        </div>
      </div>
    </div>
  )
}

export default BowlBuilderScreen

