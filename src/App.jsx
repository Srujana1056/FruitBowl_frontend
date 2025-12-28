import { useState, useEffect } from 'react'
import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom'
import SplashScreen from './screens/SplashScreen'
import LoginScreen from './screens/LoginScreen'
import SignupScreen from './screens/SignupScreen'
import HomeScreen from './screens/HomeScreen'
import FruitCatalogScreen from './screens/FruitCatalogScreen'
import FruitDetailScreen from './screens/FruitDetailScreen'
import BowlBuilderScreen from './screens/BowlBuilderScreen'
import CartScreen from './screens/CartScreen'
import SubscriptionScreen from './screens/SubscriptionScreen'
import CheckoutScreen from './screens/CheckoutScreen'
import OrderTrackingScreen from './screens/OrderTrackingScreen'
import ProfileScreen from './screens/ProfileScreen'
import BottomTabNav from './components/BottomTabNav'
import { CartProvider } from './context/CartContext'
import { AuthProvider, useAuth } from './context/AuthContext'

// Protected Route Component
const ProtectedRoute = ({ children }) => {
  const { isAuthenticated } = useAuth()
  return isAuthenticated ? children : <Navigate to="/login" replace />
}

// Main App Routes
const AppRoutes = () => {
  const { isAuthenticated } = useAuth()
  const [showSplash, setShowSplash] = useState(true)

  useEffect(() => {
    const timer = setTimeout(() => {
      setShowSplash(false)
    }, 2500) // 2.5 seconds splash screen

    return () => clearTimeout(timer)
  }, [])

  if (showSplash) {
    return <SplashScreen />
  }

  return (
    <Routes>
      <Route path="/login" element={<LoginScreen />} />
      <Route path="/signup" element={<SignupScreen />} />
      <Route
        path="/home"
        element={
          <ProtectedRoute>
            <HomeScreen />
          </ProtectedRoute>
        }
      />
      <Route
        path="/catalog"
        element={
          <ProtectedRoute>
            <FruitCatalogScreen />
          </ProtectedRoute>
        }
      />
      <Route
        path="/fruit/:id"
        element={
          <ProtectedRoute>
            <FruitDetailScreen />
          </ProtectedRoute>
        }
      />
      <Route
        path="/bowl-builder"
        element={
          <ProtectedRoute>
            <BowlBuilderScreen />
          </ProtectedRoute>
        }
      />
      <Route
        path="/cart"
        element={
          <ProtectedRoute>
            <CartScreen />
          </ProtectedRoute>
        }
      />
      <Route
        path="/subscription"
        element={
          <ProtectedRoute>
            <SubscriptionScreen />
          </ProtectedRoute>
        }
      />
      <Route
        path="/checkout"
        element={
          <ProtectedRoute>
            <CheckoutScreen />
          </ProtectedRoute>
        }
      />
      <Route
        path="/order/:id"
        element={
          <ProtectedRoute>
            <OrderTrackingScreen />
          </ProtectedRoute>
        }
      />
      <Route
        path="/profile"
        element={
          <ProtectedRoute>
            <ProfileScreen />
          </ProtectedRoute>
        }
      />
      <Route
        path="/"
        element={
          <Navigate to={isAuthenticated ? '/home' : '/login'} replace />
        }
      />
    </Routes>
  )
}

function App() {
  return (
    <Router>
      <AuthProvider>
        <CartProvider>
          <div className="app-container">
            <AppRoutes />
            <BottomTabNav />
          </div>
        </CartProvider>
      </AuthProvider>
    </Router>
  )
}

export default App

