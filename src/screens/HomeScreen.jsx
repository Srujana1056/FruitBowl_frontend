import { useNavigate } from 'react-router-dom'
import { useAuth } from '../context/AuthContext'
import { fruits, popularBowls } from '../data/dummyData'
import FruitCard from '../components/FruitCard'
import Button from '../components/Button'
import './HomeScreen.css'

const HomeScreen = () => {
  const navigate = useNavigate()
  const { user } = useAuth()
  const timeOfDay = new Date().getHours()
  const greeting = timeOfDay < 12 ? 'Good morning' : timeOfDay < 18 ? 'Good afternoon' : 'Good evening'

  const categories = ['Berries', 'Tropical', 'Citrus', 'Stone']
  const featuredFruits = fruits.slice(0, 6)

  return (
    <div className="home-screen">
      <div className="home-header">
        <div>
          <h1 className="greeting">{greeting}, {user?.name || 'User'}</h1>
          <p className="subtitle">What would you like today?</p>
        </div>
      </div>

      <div className="home-content">
        {/* Delivery Address Selector */}
        <div className="address-selector">
          <span className="address-icon">📍</span>
          <div className="address-info">
            <p className="address-label">Delivery to</p>
            <p className="address-value">123 Main St, City, State 12345</p>
          </div>
          <button className="address-change-btn">Change</button>
        </div>

        {/* Banner */}
        <div className="banner-card">
          <div className="banner-content">
            <h2 className="banner-title">Weekly Subscription - ₹300</h2>
            <p className="banner-text">Get fresh bowls delivered 6 days a week. Pay once per week.</p>
            <Button
              variant="secondary"
              size="sm"
              onClick={() => navigate('/subscription')}
            >
              Learn More
            </Button>
          </div>
          <div className="banner-emoji">🍎</div>
        </div>

        {/* Choose Bowl Type */}
        <section className="home-section">
          <h2 className="section-title">Choose how you want your bowl</h2>
          <div className="bowl-type-grid">
            <div
              className="bowl-type-card"
              onClick={() => navigate('/bowl-builder')}
            >
              <span className="bowl-type-emoji">🍓</span>
              <h3 className="bowl-type-title">One-time Bowl</h3>
              <p className="bowl-type-description">Order a bowl just for today</p>
            </div>
            <div
              className="bowl-type-card"
              onClick={() => {
                // Set subscription mode and redirect to bowl builder
                navigate('/bowl-builder?subscription=true')
              }}
            >
              <span className="bowl-type-emoji">📅</span>
              <h3 className="bowl-type-title">Weekly Subscription</h3>
              <p className="bowl-type-description">Get bowls delivered 6 days a week</p>
            </div>
          </div>
        </section>

        {/* Fruit Categories */}
        <section className="home-section">
          <div className="section-header">
            <h2 className="section-title">Categories</h2>
            <button
              className="see-all-btn"
              onClick={() => navigate('/catalog')}
            >
              See All
            </button>
          </div>
          <div className="categories-scroll">
            {categories.map((category) => (
              <div
                key={category}
                className="category-card"
                onClick={() => navigate('/catalog')}
              >
                <span className="category-emoji">
                  {category === 'Berries' && '🫐'}
                  {category === 'Tropical' && '🥭'}
                  {category === 'Citrus' && '🍊'}
                  {category === 'Stone' && '🍑'}
                </span>
                <span className="category-name">{category}</span>
              </div>
            ))}
          </div>
        </section>

        {/* Popular Bowls */}
        <section className="home-section">
          <div className="section-header">
            <h2 className="section-title">Popular Bowls</h2>
            <button
              className="see-all-btn"
              onClick={() => navigate('/catalog')}
            >
              See All
            </button>
          </div>
          <div className="bowls-grid">
            {popularBowls.map((bowl) => (
              <div
                key={bowl.id}
                className="bowl-card"
                onClick={() => navigate('/bowl-builder')}
              >
                <div className="bowl-emoji">{bowl.image}</div>
                <h3 className="bowl-name">{bowl.name}</h3>
                <p className="bowl-fruits">{bowl.fruits.join(', ')}</p>
                <p className="bowl-price">₹{bowl.price.toFixed(0)}</p>
              </div>
            ))}
          </div>
        </section>

        {/* Featured Fruits */}
        <section className="home-section">
          <div className="section-header">
            <h2 className="section-title">Fresh Fruits</h2>
            <button
              className="see-all-btn"
              onClick={() => navigate('/catalog')}
            >
              See All
            </button>
          </div>
          <div className="fruits-scroll">
            {featuredFruits.map((fruit) => (
              <FruitCard key={fruit.id} fruit={fruit} />
            ))}
          </div>
        </section>

        {/* Build Your Own Bowl CTA */}
        <div className="cta-section">
          <Button
            variant="primary"
            size="lg"
            fullWidth
            onClick={() => navigate('/bowl-builder')}
          >
            🍎 Build Your Own Bowl
          </Button>
        </div>
      </div>
    </div>
  )
}

export default HomeScreen

