import './QuantitySelector.css'

const QuantitySelector = ({ quantity, onIncrease, onDecrease, min = 0, max = 99 }) => {
  return (
    <div className="quantity-selector">
      <button
        className="quantity-btn"
        onClick={onDecrease}
        disabled={quantity <= min}
        aria-label="Decrease quantity"
      >
        −
      </button>
      <span className="quantity-value">{quantity}</span>
      <button
        className="quantity-btn"
        onClick={onIncrease}
        disabled={quantity >= max}
        aria-label="Increase quantity"
      >
        +
      </button>
    </div>
  )
}

export default QuantitySelector

