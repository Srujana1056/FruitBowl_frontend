import { createContext, useContext, useState } from 'react'

const CartContext = createContext()

export const useCart = () => {
  const context = useContext(CartContext)
  if (!context) {
    throw new Error('useCart must be used within CartProvider')
  }
  return context
}

export const CartProvider = ({ children }) => {
  const [cart, setCart] = useState([])
  const [isSubscription, setIsSubscription] = useState(false)

  // Fixed pricing constants
  const ONE_TIME_BOWL_PRICE = 250 // Includes delivery
  const WEEKLY_SUBSCRIPTION_PRICE = 300 // Per week, covers 6 days

  const addToCart = (item) => {
    setCart((prev) => {
      const existing = prev.find((i) => i.id === item.id)
      if (existing) {
        return prev.map((i) =>
          i.id === item.id ? { ...i, quantity: i.quantity + item.quantity } : i
        )
      }
      return [...prev, item]
    })
  }

  const updateQuantity = (id, quantity) => {
    if (quantity <= 0) {
      removeFromCart(id)
      return
    }
    setCart((prev) =>
      prev.map((item) => (item.id === id ? { ...item, quantity } : item))
    )
  }

  const removeFromCart = (id) => {
    setCart((prev) => prev.filter((item) => item.id !== id))
  }

  const clearCart = () => {
    setCart([])
  }

  // Get fixed price based on order type
  const getOrderPrice = () => {
    if (isSubscription) {
      return WEEKLY_SUBSCRIPTION_PRICE
    }
    return ONE_TIME_BOWL_PRICE
  }

  const getTotalPrice = () => {
    return cart.reduce((total, item) => total + item.price * item.quantity, 0)
  }

  const getTotalItems = () => {
    return cart.reduce((total, item) => total + item.quantity, 0)
  }

  return (
    <CartContext.Provider
      value={{
        cart,
        isSubscription,
        setIsSubscription,
        addToCart,
        updateQuantity,
        removeFromCart,
        clearCart,
        getTotalPrice,
        getTotalItems,
        getOrderPrice,
        ONE_TIME_BOWL_PRICE,
        WEEKLY_SUBSCRIPTION_PRICE
      }}
    >
      {children}
    </CartContext.Provider>
  )
}

