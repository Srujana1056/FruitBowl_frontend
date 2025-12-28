import { useNavigate } from 'react-router-dom'
import './FruitCard.css'

const FruitCard = ({ fruit, showPrice = true, hidePrice = false, onClick }) => {
  const navigate = useNavigate()

  const handleClick = () => {
    if (onClick) {
      onClick()
    } else {
      navigate(`/fruit/${fruit.id}`)
    }
  }

  return (
    <div className="fruit-card" onClick={handleClick}>
      <div className="fruit-card-image">
        {typeof fruit.image === 'string' && fruit.image.startsWith('http') ? (
          <img src={fruit.image} alt={fruit.name} className="fruit-image" />
        ) : (
          <span className="fruit-emoji">{fruit.image}</span>
        )}
        {fruit.seasonal && (
          <span className="seasonal-badge">Seasonal</span>
        )}
      </div>
      <div className="fruit-card-content">
        <h3 className="fruit-card-name">{fruit.name}</h3>
        {showPrice && !hidePrice && (
          <p className="fruit-card-price">₹{fruit.price.toFixed(0)}</p>
        )}
      </div>
    </div>
  )
}

export default FruitCard

