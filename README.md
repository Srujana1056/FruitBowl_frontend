# Fruit Bowl Customer App 🍎

A mobile-first customer frontend for a fruit bowl delivery app, built with React and Vite. This app is designed to feel like a native mobile app but runs in a web browser for easy development and preview.

## Features

- 🎨 **Pastel Aesthetic Design** - Soft greens, creams, peach, and light orange color palette
- 🍓 **Floating Fruit Animations** - Beautiful splash screen with animated fruits
- 📱 **Mobile-First UI** - Single-column layouts optimized for mobile devices
- 🛒 **Full Shopping Flow** - Browse fruits, build custom bowls, manage cart, and checkout
- 🔄 **Subscription Management** - Weekly subscription with customizable delivery days
- 📦 **Order Tracking** - Visual timeline showing order status
- 👤 **User Profile** - Manage account, addresses, and order history

## Tech Stack

- **React 18** - UI library
- **React Router DOM** - Navigation and routing
- **Vite** - Fast development server and build tool
- **CSS3** - Custom styling with CSS variables and animations

## Getting Started

### Prerequisites

- Node.js (v16 or higher)
- npm or yarn

### Installation

1. Install dependencies:
```bash
npm install
```

2. Start the development server:
```bash
npm run dev
```

3. Open your browser and navigate to `http://localhost:3000`

The app will automatically open in your default browser.

### Build for Production

```bash
npm run build
```

The production build will be in the `dist` folder.

### Preview Production Build

```bash
npm run preview
```

## Project Structure

```
src/
├── components/          # Reusable UI components
│   ├── Button.jsx
│   ├── FruitCard.jsx
│   ├── QuantitySelector.jsx
│   ├── PriceSummary.jsx
│   └── BottomTabNav.jsx
├── screens/            # Screen components
│   ├── SplashScreen.jsx
│   ├── LoginScreen.jsx
│   ├── SignupScreen.jsx
│   ├── HomeScreen.jsx
│   ├── FruitCatalogScreen.jsx
│   ├── FruitDetailScreen.jsx
│   ├── BowlBuilderScreen.jsx
│   ├── CartScreen.jsx
│   ├── SubscriptionScreen.jsx
│   ├── CheckoutScreen.jsx
│   ├── OrderTrackingScreen.jsx
│   └── ProfileScreen.jsx
├── context/            # React Context providers
│   ├── AuthContext.jsx
│   └── CartContext.jsx
├── data/               # Dummy data
│   └── dummyData.js
├── App.jsx             # Main app component with routing
├── main.jsx            # Entry point
└── index.css           # Global styles and design system
```

## Design System

### Colors
- **Green Light**: `#B8E6B8` - Primary actions
- **Cream**: `#FFF8E7` - Background
- **Peach**: `#FFD4B3` - Secondary accents
- **Orange Light**: `#FFE5CC` - Highlights
- **Yellow Pastel**: `#FFF9C4` - Accents

### Typography
- System font stack for optimal performance
- Clear hierarchy with font weights and sizes
- Mobile-optimized line heights

## Key Features

### Authentication
- Login and Signup screens
- Mock authentication (no backend)
- Protected routes

### Home Screen
- Personalized greeting
- Delivery address selector
- Subscription banner
- Fruit categories
- Popular bowls
- Featured fruits
- Build Your Own Bowl CTA

### Fruit Catalog
- Grid layout of all fruits
- Category filters
- Sort options (price, alphabetical, seasonal)
- Seasonal badges

### Bowl Builder
- Add multiple fruits
- Quantity controls
- Real-time price calculation
- Remove fruits
- Optional bowl naming

### Cart
- Item management
- Delivery date picker
- Subscription toggle (20% discount)
- Price breakdown

### Subscription
- Weekly subscription (6 days/week)
- Start date selection
- Skip day selection
- Pause/resume toggle
- Auto-renew option

### Order Tracking
- Visual status timeline
- Map placeholder
- Delivery agent details
- Order information

### Profile
- User information
- Menu items for settings
- Logout functionality

## Navigation

- **Bottom Tab Navigation**: Home, Cart, Profile
- **Stack Navigation**: Navigate between screens with back buttons
- **Protected Routes**: Authentication required for most screens

## Development Notes

- All data is static/dummy data - no backend integration
- Designed for mobile-first, but works on desktop browsers
- Ready for migration to React Native/Expo
- Smooth animations and transitions throughout
- Touch-friendly button sizes and interactions

## Future Enhancements

- Backend API integration
- Real payment processing
- Push notifications
- Real-time order tracking
- Image uploads for custom bowls
- Social sharing features

## License

This project is for development and preview purposes.

