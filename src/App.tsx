import { useState } from 'react'
import ControlPanel from './components/ControlPanel'
import RotatingCircles from './components/RotatingCircles'
import EntranceAnimation from './components/EntranceAnimation'

type CircleState = {
  duration: number;
  entranceDuration: number;
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
  entranceDuration: 3,
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
  const [showEntrance, setShowEntrance] = useState(false);
  const [showCircles, setShowCircles] = useState(false);
  const [isTransitioning, setIsTransitioning] = useState(false);

  // const handleParamChange = (param: keyof CircleState, value: number | string) => {
  //   setParams(prev => ({
  //     ...prev,
  //     [param]: value
  //   }));
  // };

  // const handleReset = () => {
  //   setParams(DEFAULT_STATE);
  //   setShowEntrance(false);
  //   setShowCircles(false);
  //   setIsTransitioning(false);
  // };

  const handleEntranceComplete = () => {
    setIsTransitioning(true);
    setTimeout(() => {
      setShowEntrance(false);
      setShowCircles(true);
      setIsTransitioning(false);
    }, 300);
  };

  const startAnimation = () => {
    setShowEntrance(true);
    setShowCircles(false);
    setIsTransitioning(false);
  };

  return (
    <>
      {/* <ControlPanel 
        params={params}
        onParamChange={handleParamChange}
        onReset={handleReset}
      /> */}

      <button 
        onClick={startAnimation}
        style={{
          position: 'fixed',
          top: '30px',
          right: '50%',
          padding: '10px 20px',
          transform: 'translateX(50%)',
          fontSize: '14px',
          backgroundColor: '#4f24ee',
          color: 'white',
          border: 'none',
          borderRadius: '5px',
          cursor: 'pointer',
          zIndex: 1001,
          transition: 'background-color 0.3s ease',
        }}
      >
        Play Intro
      </button>


      <div style={{
        position: 'fixed',
        top: 0,
        left: 0,
        width: '100%',
        height: '100%',
        transition: 'opacity 0.5s ease, transform 0.5s ease',
        opacity: isTransitioning ? 0 : 1,
        transform: isTransitioning ? 'scale(0.75)' : 'scale(1)'
      }}>
        {showEntrance && (
          <EntranceAnimation
            onAnimationComplete={handleEntranceComplete}
            circleColor1={params.circleColor1}
            circleColor2={params.circleColor2}
            circleColor3={params.circleColor3}
            circleColor4={params.circleColor4}
            circleColor5={params.circleColor5}
            circleColor6={params.circleColor6}
          />
        )}

        {showCircles && (
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
        )}
      </div>
    </>
  )
}

export default App
