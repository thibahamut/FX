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
  contrast: number;
  saturation: number;
  scale: number;
  circleColor1: string;
  circleColor2: string;
  circleColor3: string;
  circleColor4: string;
  circleColor5: string;
  circleColor6: string;
};

const DEFAULT_STATE: CircleState = {
  duration: 30,
  circleScale: 2,
  circleMaskBlur: 0,
  circleBlur: 12,
  brightness: 1.5,
  contrast: 1,
  saturation: 1,
  scale: 0.8,
  circleColor1: 'rgba(0, 116, 255, 0.5)',
  circleColor2: 'rgba(0, 195, 255, 0.3)',
  circleColor3: 'rgba(0, 178, 138, 0.3)',
  circleColor4: 'rgba(148, 206, 104, 0.3)',
  circleColor5: 'rgba(160, 190, 135, 0.3)',
  circleColor6: '#DB9F1FC4',
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
        contrast={params.contrast}
        saturation={params.saturation}
        scale={params.scale}
        circleColor1={params.circleColor1}
        circleColor2={params.circleColor2}
        circleColor3={params.circleColor3}
        circleColor4={params.circleColor4}
        circleColor5={params.circleColor5}
        circleColor6={params.circleColor6}
      />
    </>
  )
}

export default App
