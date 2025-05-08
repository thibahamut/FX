import './RotatingCircles.css';
import { useEffect } from 'react';

interface RotatingCirclesProps {
  duration?: number;
  circleScale?: number;
  circleMaskBlur?: number;
  circleBlur?: number;
  brightness?: number;
  scale?: number;
  circleColor1?: string;
  circleColor2?: string;
  circleColor3?: string;
  circleColor4?: string;
  circleColor5?: string;
}

const RotatingCircles = ({ 
  duration = 10,
  circleScale = 2,
  circleMaskBlur = 12,
  circleBlur = 2,
  brightness = 1.5,
  scale = 1,
  circleColor1 = '#0074ff',
  circleColor2 = '#00c3ff',
  circleColor3 = '#00b28a',
  circleColor4 = '#94ce68',
  circleColor5 = '#a0be87',
}: RotatingCirclesProps) => {
  useEffect(() => {
    document.documentElement.style.setProperty('--circle-scale', circleScale.toString());
    document.documentElement.style.setProperty('--circle-mask-blur', `${circleMaskBlur}px`);
    document.documentElement.style.setProperty('--circle-blur', `${circleBlur}px`);
    document.documentElement.style.setProperty('--brightness', brightness.toString());
    document.documentElement.style.setProperty('--scale', scale.toString());
    document.documentElement.style.setProperty('--circle-color-1', circleColor1);
    document.documentElement.style.setProperty('--circle-color-2', circleColor2);
    document.documentElement.style.setProperty('--circle-color-3', circleColor3);
    document.documentElement.style.setProperty('--circle-color-4', circleColor4);
    document.documentElement.style.setProperty('--circle-color-5', circleColor5);
  }, [circleScale, circleMaskBlur, circleBlur, brightness, scale, circleColor1, circleColor2, circleColor3, circleColor4, circleColor5]);

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