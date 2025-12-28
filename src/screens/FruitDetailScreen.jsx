import { useState } from 'react'
import { useParams, useNavigate } from 'react-router-dom'
import { fruits } from '../data/dummyData'
import { useCart } from '../context/CartContext'
import Button from '../components/Button'
import QuantitySelector from '../components/QuantitySelector'
import './FruitDetailScreen.css'

const FruitDetailScreen = () => {
  const { id } = useParams()
  const navigate = useNavigate()
  const { addToCart } = useCart()
  const [quantity, setQuantity] = useState(1)

  const fruit = fruits.find((f) => f.id === parseInt(id))

  if (!fruit) {
    return (
      <div className="fruit-detail-screen">
        <div className="error-state">
          <p>Fruit not found</p>
          <Button onClick={() => navigate('/catalog')}>Go Back</Button>
        </div>
      </div>
    )
  }

  const handleAddToBowl = () => {
    addToCart({
      id: `fruit-${fruit.id}`,
      name: fruit.name,
      type: 'fruit',
      price: fruit.price,
      quantity: quantity,
      image: fruit.image
    })
    navigate('/bowl-builder')
  }

  return (
    <div className="fruit-detail-screen">
      <button className="back-button" onClick={() => navigate(-1)}>
        ← Back
      </button>

      <div className="fruit-detail-content">
        <div className="fruit-detail-image">
          {typeof fruit.image === 'string' && fruit.image.startsWith('http') ? (
            <img src={fruit.image} alt={fruit.name} className="fruit-large-image" />
          ) : (
            <div className="fruit-large-emoji">{fruit.image}</div>
          )}
          {fruit.seasonal && (
            <span className="seasonal-badge-large">Seasonal</span>
          )}
        </div>

        <div className="fruit-detail-info">
          <h1 className="fruit-detail-name">{fruit.name}</h1>
          <p className="fruit-detail-price">₹{fruit.price.toFixed(0)} per unit</p>
          <p className="fruit-detail-description">{fruit.description}</p>

          {fruit.nutrition && (
            <div className="nutrition-info">
              <h3 className="nutrition-title">Nutrition (per 100g)</h3>
              <div className="nutrition-grid">
                <div className="nutrition-item">
                  <span className="nutrition-label">Calories</span>
                  <span className="nutrition-value">{fruit.nutrition.calories}</span>
                </div>
                <div className="nutrition-item">
                  <span className="nutrition-label">Vitamin C</span>
                  <span className="nutrition-value">{fruit.nutrition.vitaminC}</span>
                </div>
              </div>
            </div>
          )}

          <div className="quantity-section">
            <label className="quantity-label">Quantity</label>
            <QuantitySelector
              quantity={quantity}
              onIncrease={() => setQuantity(quantity + 1)}
              onDecrease={() => setQuantity(Math.max(1, quantity - 1))}
            />
          </div>

          <Button
            variant="primary"
            size="lg"
            fullWidth
            onClick={handleAddToBowl}
          >
            Add to Bowl
          </Button>
        </div>
      </div>
    </div>
  )
}

export default FruitDetailScreen

