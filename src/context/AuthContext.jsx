import { createContext, useContext, useState } from 'react'

const AuthContext = createContext()

export const useAuth = () => {
  const context = useContext(AuthContext)
  if (!context) {
    throw new Error('useAuth must be used within AuthProvider')
  }
  return context
}

export const AuthProvider = ({ children }) => {
  const [isAuthenticated, setIsAuthenticated] = useState(false)
  const [user, setUser] = useState(null)

  const login = (email, password) => {
    // Mock authentication - in real app, this would call an API
    setIsAuthenticated(true)
    setUser({
      name: 'User',
      email: email,
      phone: '+1234567890'
    })
    return true
  }

  const signup = (name, email, password) => {
    // Mock signup - in real app, this would call an API
    setIsAuthenticated(true)
    setUser({
      name: name,
      email: email,
      phone: '+1234567890'
    })
    return true
  }

  const logout = () => {
    setIsAuthenticated(false)
    setUser(null)
  }

  return (
    <AuthContext.Provider
      value={{
        isAuthenticated,
        user,
        login,
        signup,
        logout
      }}
    >
      {children}
    </AuthContext.Provider>
  )
}

