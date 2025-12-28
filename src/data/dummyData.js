// Dummy data for the app

export const fruits = [
  {
    id: 1,
    name: 'Strawberry',
    price: 85,
    image: 'https://images.pexels.com/photos/934066/pexels-photo-934066.jpeg?auto=compress&cs=tinysrgb&w=400&h=400&fit=crop',
    category: 'Berries',
    seasonal: true,
    description: 'Sweet and juicy organic strawberries, perfect for your bowl.',
    nutrition: { calories: 32, vitaminC: '58.8mg' }
  },
  {
    id: 2,
    name: 'Blueberry',
    price: 120,
    image: 'https://images.pexels.com/photos/1300975/pexels-photo-1300975.jpeg?auto=compress&cs=tinysrgb&w=400&h=400&fit=crop',
    category: 'Berries',
    seasonal: true,
    description: 'Fresh blueberries packed with antioxidants.',
    nutrition: { calories: 57, vitaminC: '9.7mg' }
  },
  {
    id: 3,
    name: 'Banana',
    price: 45,
    image: 'https://images.pexels.com/photos/2872755/pexels-photo-2872755.jpeg?auto=compress&cs=tinysrgb&w=400&h=400&fit=crop',
    category: 'Tropical',
    seasonal: false,
    description: 'Ripe and creamy bananas, great for energy.',
    nutrition: { calories: 89, vitaminC: '8.7mg' }
  },
  {
    id: 4,
    name: 'Apple',
    price: 60,
    image: 'https://images.pexels.com/photos/102104/pexels-photo-102104.jpeg?auto=compress&cs=tinysrgb&w=400&h=400&fit=crop',
    category: 'Core',
    seasonal: false,
    description: 'Crisp and refreshing apples, always in season.',
    nutrition: { calories: 52, vitaminC: '4.6mg' }
  },
  {
    id: 5,
    name: 'Orange',
    price: 55,
    image: 'https://images.pexels.com/photos/143133/pexels-photo-143133.jpeg?auto=compress&cs=tinysrgb&w=400&h=400&fit=crop',
    category: 'Citrus',
    seasonal: true,
    description: 'Juicy oranges bursting with vitamin C.',
    nutrition: { calories: 47, vitaminC: '53.2mg' }
  },
  {
    id: 6,
    name: 'Mango',
    price: 90,
    image: 'https://images.pexels.com/photos/1300972/pexels-photo-1300972.jpeg?auto=compress&cs=tinysrgb&w=400&h=400&fit=crop',
    category: 'Tropical',
    seasonal: true,
    description: 'Sweet and tropical mangoes, a summer favorite.',
    nutrition: { calories: 60, vitaminC: '36.4mg' }
  },
  {
    id: 7,
    name: 'Pineapple',
    price: 75,
    image: 'https://images.pexels.com/photos/1300974/pexels-photo-1300974.jpeg?auto=compress&cs=tinysrgb&w=400&h=400&fit=crop',
    category: 'Tropical',
    seasonal: true,
    description: 'Tropical pineapple with a perfect balance of sweet and tart.',
    nutrition: { calories: 50, vitaminC: '47.8mg' }
  },
  {
    id: 8,
    name: 'Grapes',
    price: 70,
    image: 'https://images.pexels.com/photos/1300973/pexels-photo-1300973.jpeg?auto=compress&cs=tinysrgb&w=400&h=400&fit=crop',
    category: 'Berries',
    seasonal: false,
    description: 'Sweet and refreshing grapes, perfect for snacking.',
    nutrition: { calories: 69, vitaminC: '3.2mg' }
  },
  {
    id: 9,
    name: 'Kiwi',
    price: 80,
    image: 'https://images.pexels.com/photos/1300976/pexels-photo-1300976.jpeg?auto=compress&cs=tinysrgb&w=400&h=400&fit=crop',
    category: 'Tropical',
    seasonal: true,
    description: 'Tart and tangy kiwis, packed with vitamin C.',
    nutrition: { calories: 61, vitaminC: '92.7mg' }
  },
  {
    id: 10,
    name: 'Watermelon',
    price: 40,
    image: 'https://images.pexels.com/photos/1313267/pexels-photo-1313267.jpeg?auto=compress&cs=tinysrgb&w=400&h=400&fit=crop',
    category: 'Melons',
    seasonal: true,
    description: 'Refreshing watermelon, perfect for hot days.',
    nutrition: { calories: 30, vitaminC: '8.1mg' }
  },
  {
    id: 11,
    name: 'Peach',
    price: 65,
    image: 'https://images.pexels.com/photos/1300977/pexels-photo-1300977.jpeg?auto=compress&cs=tinysrgb&w=400&h=400&fit=crop',
    category: 'Stone',
    seasonal: true,
    description: 'Sweet and juicy peaches, a summer delight.',
    nutrition: { calories: 39, vitaminC: '6.6mg' }
  },
  {
    id: 12,
    name: 'Cherry',
    price: 110,
    image: 'https://images.pexels.com/photos/1300978/pexels-photo-1300978.jpeg?auto=compress&cs=tinysrgb&w=400&h=400&fit=crop',
    category: 'Stone',
    seasonal: true,
    description: 'Sweet and tart cherries, a seasonal treat.',
    nutrition: { calories: 50, vitaminC: '7mg' }
  }
]

export const categories = [
  { id: 'all', name: 'All Fruits', emoji: '🍎' },
  { id: 'berries', name: 'Berries', emoji: '🫐' },
  { id: 'tropical', name: 'Tropical', emoji: '🥭' },
  { id: 'citrus', name: 'Citrus', emoji: '🍊' },
  { id: 'stone', name: 'Stone Fruits', emoji: '🍑' },
  { id: 'core', name: 'Core Fruits', emoji: '🍎' },
  { id: 'melons', name: 'Melons', emoji: '🍉' }
]

export const popularBowls = [
  {
    id: 1,
    name: 'Berry Blast',
    fruits: ['Strawberry', 'Blueberry', 'Grapes'],
    price: 280,
    image: 'https://images.pexels.com/photos/1300979/pexels-photo-1300979.jpeg?auto=compress&cs=tinysrgb&w=400&h=400&fit=crop'
  },
  {
    id: 2,
    name: 'Tropical Paradise',
    fruits: ['Mango', 'Pineapple', 'Banana'],
    price: 320,
    image: 'https://images.pexels.com/photos/1300980/pexels-photo-1300980.jpeg?auto=compress&cs=tinysrgb&w=400&h=400&fit=crop'
  },
  {
    id: 3,
    name: 'Citrus Sunrise',
    fruits: ['Orange', 'Kiwi', 'Pineapple'],
    price: 300,
    image: 'https://images.pexels.com/photos/1300981/pexels-photo-1300981.jpeg?auto=compress&cs=tinysrgb&w=400&h=400&fit=crop'
  },
  {
    id: 4,
    name: 'Summer Delight',
    fruits: ['Watermelon', 'Peach', 'Cherry'],
    price: 350,
    image: 'https://images.pexels.com/photos/1300982/pexels-photo-1300982.jpeg?auto=compress&cs=tinysrgb&w=400&h=400&fit=crop'
  }
]

export const orderStatuses = [
  { id: 1, status: 'confirmed', label: 'Order Confirmed', time: '10:30 AM' },
  { id: 2, status: 'preparing', label: 'Preparing Your Bowl', time: '11:00 AM' },
  { id: 3, status: 'out-for-delivery', label: 'Out for Delivery', time: '11:30 AM' },
  { id: 4, status: 'delivered', label: 'Delivered', time: '12:00 PM' }
]

