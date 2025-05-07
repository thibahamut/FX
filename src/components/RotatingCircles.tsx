import './RotatingCircles.css';
import { useEffect } from 'react';

interface RotatingCirclesProps {
  duration?: number;
  circleScale?: number;
  circleMaskBlur?: number;
  circleBlur?: number;
}

const RotatingCircles = ({ 
  duration = 10,
  circleScale = 2,
  circleMaskBlur = 12,
  circleBlur = 2
}: RotatingCirclesProps) => {
  useEffect(() => {
    document.documentElement.style.setProperty('--circle-scale', circleScale.toString());
    document.documentElement.style.setProperty('--circle-mask-blur', `${circleMaskBlur}px`);
    document.documentElement.style.setProperty('--circle-blur', `${circleBlur}px`);
  }, [circleScale, circleMaskBlur, circleBlur]);

  return (
    <div className="circles-root">
      <div className="circles-container" style={{ animationDuration: `${duration}s`, animationDirection: 'normal' }}>
        <div className="circle circle1"></div>
        <div className="circle circle2"></div>
        <div className="circle circle3"></div>
        <div className="circle circle4"></div>
        <div className="circle circle5"></div>
      </div>

      <div className="circles-container" style={{ animationDuration: `${duration * 0.4}s`, animationDirection: 'reverse' }}>
        <div className="circle circle1"></div>
        <div className="circle circle2"></div>
        <div className="circle circle3"></div>
        <div className="circle circle4"></div>
        <div className="circle circle5"></div>
      </div>
    </div>
  );
};

export default RotatingCircles; 