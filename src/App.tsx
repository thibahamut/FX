import './App.css'
import RotatingCircles from './components/RotatingCircles'
import ControlPanel from './components/ControlPanel'
import { useState } from 'react'

type CircleState = {
  duration: number;
  circleScale: number;
  circleMaskBlur: number;
  circleBlur: number;
  brightness: number;
  scale: number;
  circleColor1: string;
  circleColor2: string;
  circleColor3: string;
  circleColor4: string;
  circleColor5: string;
};

const DEFAULT_STATE: CircleState = {
  duration: 30,
  circleScale: 2,
  circleMaskBlur: 0,
  circleBlur: 12,
  brightness: 1.5,
  scale: 0.8,
  circleColor1: '#0074ff',
  circleColor2: '#00c3ff',
  circleColor3: '#00b28a',
  circleColor4: '#94ce68',
  circleColor5: '#a0be87',
};

function App() {
  const [params, setParams] = useState(DEFAULT_STATE);

  const handleParamChange = (param: keyof CircleState, value: number | string) => {
    setParams(prev => ({
      ...prev,
      [param]: value
    }));
  };

  const handleReset = () => {
    setParams(DEFAULT_STATE);
  };

  return (
    <>
      <ControlPanel 
        params={params}
        onParamChange={handleParamChange}
        onReset={handleReset}
      />
      <RotatingCircles 
        duration={params.duration}
        circleScale={params.circleScale}
        circleMaskBlur={params.circleMaskBlur}
        circleBlur={params.circleBlur}
        brightness={params.brightness}
        scale={params.scale}
        circleColor1={params.circleColor1}
        circleColor2={params.circleColor2}
        circleColor3={params.circleColor3}
        circleColor4={params.circleColor4}
        circleColor5={params.circleColor5}
      />
    </>
  )
}

export default App
