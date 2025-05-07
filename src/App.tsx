import './App.css'
import RotatingCircles from './components/RotatingCircles'

function App() {
  return (
    <>
      <RotatingCircles duration={16} circleScale={2} circleMaskBlur={12} circleBlur={16} />
    </>
  )
}

export default App
