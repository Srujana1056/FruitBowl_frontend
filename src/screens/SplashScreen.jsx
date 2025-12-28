import './SplashScreen.css'

const SplashScreen = () => {
  const fruits = ['🍓', '🫐', '🍌', '🍎', '🍊', '🥭', '🍍', '🍇', '🥝', '🍉', '🍑', '🍒']
  
  return (
    <div className="splash-screen">
      <div className="splash-background">
        {fruits.map((fruit, index) => (
          <div
            key={index}
            className="floating-fruit"
            style={{
              left: `${(index * 8) % 100}%`,
              animationDelay: `${index * 0.3}s`,
              animationDuration: `${3 + (index % 3)}s`
            }}
          >
            {fruit}
          </div>
        ))}
      </div>
      <div className="splash-content">
        <div className="splash-logo">
          <span className="logo-emoji">🍎</span>
        </div>
        <h1 className="splash-title">abc</h1>
        <p className="splash-tagline">A box full of calories</p>
      </div>
    </div>
  )
}

export default SplashScreen

