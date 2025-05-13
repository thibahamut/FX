import { useState } from 'react'
import ControlPanel from './components/ControlPanel'
import RotatingCircles from './components/RotatingCircles'

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
  circleScale: 1.6,
  circleMaskBlur: 2.3,
  circleBlur: 14.7,
  brightness: 1,
  contrast: 1,
  saturation: 1,
  scale: 1,
  circleColor1: '#ffcb16ff',
  circleColor2: '#ff245bff',
  circleColor3: '#7d26c9ff',
  circleColor4: '#00dc7cff',
  circleColor5: '#4f24eeff',
  circleColor6: '#ff2de46e',
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
        shadowBlurClass="shadow-blur"
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
