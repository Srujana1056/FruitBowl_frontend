import { useState } from 'react'
import { fruits, categories } from '../data/dummyData'
import FruitCard from '../components/FruitCard'
import './FruitCatalogScreen.css'

const FruitCatalogScreen = () => {
  const [selectedCategory, setSelectedCategory] = useState('all')
  const [sortBy, setSortBy] = useState('default')

  let filteredFruits = [...fruits]

  // Filter by category
  if (selectedCategory !== 'all') {
    filteredFruits = filteredFruits.filter(
      (fruit) => fruit.category.toLowerCase() === selectedCategory.toLowerCase()
    )
  }

  // Sort fruits
  if (sortBy === 'price-low') {
    filteredFruits.sort((a, b) => a.price - b.price)
  } else if (sortBy === 'price-high') {
    filteredFruits.sort((a, b) => b.price - a.price)
  } else if (sortBy === 'alphabetical') {
    filteredFruits.sort((a, b) => a.name.localeCompare(b.name))
  } else if (sortBy === 'seasonal') {
    filteredFruits.sort((a, b) => (b.seasonal ? 1 : 0) - (a.seasonal ? 1 : 0))
  }

  return (
    <div className="catalog-screen">
      <div className="catalog-header">
        <h1 className="catalog-title">Fruit Catalog</h1>
        <p className="catalog-subtitle">Choose your favorite fruits</p>
      </div>

      <div className="catalog-filters">
        <div className="category-filters">
          {categories.slice(0, 5).map((category) => (
            <button
              key={category.id}
              className={`category-filter ${selectedCategory === category.id ? 'active' : ''}`}
              onClick={() => setSelectedCategory(category.id)}
            >
              <span>{category.emoji}</span>
              <span>{category.name}</span>
            </button>
          ))}
        </div>

        <div className="sort-filters">
          <select
            value={sortBy}
            onChange={(e) => setSortBy(e.target.value)}
            className="sort-select"
          >
            <option value="default">Default</option>
            <option value="price-low">Price: Low to High</option>
            <option value="price-high">Price: High to Low</option>
            <option value="alphabetical">Alphabetical</option>
            <option value="seasonal">Seasonal First</option>
          </select>
        </div>
      </div>

      <div className="catalog-grid">
        {filteredFruits.map((fruit) => (
          <FruitCard key={fruit.id} fruit={fruit} />
        ))}
      </div>
    </div>
  )
}

export default FruitCatalogScreen

