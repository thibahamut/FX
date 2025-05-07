import './App.css'
import RotatingCircles from './components/RotatingCircles'
import { useState, useEffect, useRef } from 'react'

function easeInOut(t: number): number {
  return t < 0.5 ? 2 * t * t : 1 - Math.pow(-2 * t + 2, 2) / 2;
}

function lerp(start: number, end: number, t: number) {
  return start * (1 - t) + end * t;
}

type CircleState = {
  duration: number;
  circleScale: number;
  circleMaskBlur: number;
  circleBlur: number;
  brightness: number;
  scale: number;
};

const DEFAULT_STATE: CircleState = {
  duration: 16,
  circleScale: 2,
  circleMaskBlur: 12,
  circleBlur: 16,
  brightness: 1.5,
  scale: 1,
};

const INTERACT_STATE: CircleState = {
  duration: 16,
  circleScale: 1.8,
  circleMaskBlur: 3,
  circleBlur: 2,
  brightness: 2,
  scale: 0.9,
};

function App() {
  const [params, setParams] = useState(DEFAULT_STATE);
  const [targetParams, setTargetParams] = useState(DEFAULT_STATE);
  const animationRef = useRef<number | undefined>(undefined);
  const isTransitioning = useRef<boolean>(false);
  const transitionStartTime = useRef<number>(0);
  const timeoutRef = useRef<number | undefined>(undefined);
  const TRANSITION_DURATION = 400;
  const REVERT_DURATION = 1000;

  const handleClick = () => {
    if (timeoutRef.current) {
      clearTimeout(timeoutRef.current);
    }

    setTargetParams(INTERACT_STATE);
    isTransitioning.current = true;
    transitionStartTime.current = Date.now();

    timeoutRef.current = window.setTimeout(() => {
      setTargetParams(DEFAULT_STATE);
      isTransitioning.current = true;
      transitionStartTime.current = Date.now();
    }, REVERT_DURATION);
  };

  useEffect(() => {
    const animate = () => {
      if (isTransitioning.current) {
        const currentTime = Date.now();
        const elapsed = currentTime - transitionStartTime.current;
        const duration = elapsed < TRANSITION_DURATION ? TRANSITION_DURATION : REVERT_DURATION;
        const progress = Math.min(elapsed / duration, 1);
        const easedProgress = easeInOut(progress);

        setParams(prev => ({
          duration: lerp(prev.duration, targetParams.duration, easedProgress),
          circleScale: lerp(prev.circleScale, targetParams.circleScale, easedProgress),
          circleMaskBlur: lerp(prev.circleMaskBlur, targetParams.circleMaskBlur, easedProgress),
          circleBlur: lerp(prev.circleBlur, targetParams.circleBlur, easedProgress),
          brightness: lerp(prev.brightness, targetParams.brightness, easedProgress),
          scale: lerp(prev.scale, targetParams.scale, easedProgress),
        }));

        if (progress < 1) {
          animationRef.current = requestAnimationFrame(animate);
        } else {
          isTransitioning.current = false;
        }
      }
    };

    animationRef.current = requestAnimationFrame(animate);
    return () => {
      if (animationRef.current) {
        cancelAnimationFrame(animationRef.current);
      }
    };
  }, [targetParams]);

  return (
    <>
      <button 
        onClick={handleClick}
        style={{
          position: 'fixed',
          top: '10%',
          left: '50%',
          transform: 'translate(-50%, -50%)',
          zIndex: 1000,
          padding: '24px 32px',
          fontSize: '20px',
          cursor: 'pointer'
        }}
      >
        Interact
      </button>
      <RotatingCircles 
        duration={params.duration}
        circleScale={params.circleScale}
        circleMaskBlur={params.circleMaskBlur}
        circleBlur={params.circleBlur}
        brightness={params.brightness}
        scale={params.scale}
      />
    </>
  )
}

export default App
