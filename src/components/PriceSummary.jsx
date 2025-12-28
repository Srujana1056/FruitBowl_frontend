import './PriceSummary.css'

const PriceSummary = ({ items, subtotal, delivery = 0, discount = 0, total, isSubscription = false }) => {
  const calculatedTotal = total || (subtotal + delivery - discount)

  return (
    <div className="price-summary">
      {isSubscription ? (
        <>
          <div className="price-row">
            <span>Weekly Subscription (6 days)</span>
            <span>₹{subtotal.toFixed(0)}</span>
          </div>
          <div className="price-row">
            <span>Delivery</span>
            <span>Included</span>
          </div>
        </>
      ) : (
        <>
          <div className="price-row">
            <span>Bowl Price</span>
            <span>₹{subtotal.toFixed(0)}</span>
          </div>
          <div className="price-row">
            <span>Delivery Fee</span>
            <span>Included</span>
          </div>
        </>
      )}
      <div className="price-row total">
        <span>Total Payable</span>
        <span>₹{calculatedTotal.toFixed(0)}</span>
      </div>
    </div>
  )
}

export default PriceSummary

