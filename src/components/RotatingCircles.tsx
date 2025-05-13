import { useEffect } from 'react';
import './RotatingCircles.css';

interface RotatingCirclesProps {
  duration?: number;
  circleScale?: number;
  circleMaskBlur?: number;
  circleBlur?: number;
  brightness?: number;
  contrast?: number;
  saturation?: number;
  scale?: number;
  circleColor1?: string;
  circleColor2?: string;
  circleColor3?: string;
  circleColor4?: string;
  circleColor5?: string;
  circleColor6?: string;
  shadowBlurClass?: string;
}

const RotatingCircles = ({
  duration = 30,
  circleScale = 1.6,
  circleMaskBlur = 2.3,
  circleBlur = 14.7,
  brightness = 1,
  contrast = 1,
  saturation = 1,
  scale = 1,
  circleColor1 = '#ffcb16ff',
  circleColor2 = '#ff245bff',
  circleColor3 = '#7d26c9ff',
  circleColor4 = '#00dc7cff',
  circleColor5 = '#4f24eeff',
  circleColor6 = '#ff2de46e',
  shadowBlurClass = '',
}: RotatingCirclesProps) => {
  useEffect(() => {
    document.documentElement.style.setProperty('--circle-scale', circleScale.toString());
    document.documentElement.style.setProperty('--circle-mask-blur', `${circleMaskBlur}px`);
    document.documentElement.style.setProperty('--circle-blur', `${circleBlur}px`);
    document.documentElement.style.setProperty('--brightness', brightness.toString());
    document.documentElement.style.setProperty('--contrast', contrast.toString());
    document.documentElement.style.setProperty('--saturation', saturation.toString());
    document.documentElement.style.setProperty('--scale', scale.toString());
    document.documentElement.style.setProperty('--circle-color-1', circleColor1);
    document.documentElement.style.setProperty('--circle-color-2', circleColor2);
    document.documentElement.style.setProperty('--circle-color-3', circleColor3);
    document.documentElement.style.setProperty('--circle-color-4', circleColor4);
    document.documentElement.style.setProperty('--circle-color-5', circleColor5);
    document.documentElement.style.setProperty('--circle-color-6', circleColor6);
  }, [circleScale, circleMaskBlur, circleBlur, brightness, contrast, saturation, scale, circleColor1, circleColor2, circleColor3, circleColor4, circleColor5, circleColor6]);

  return (
    <>
      {/* SHADOW */}
      <div className={`circles-root ${shadowBlurClass || ''}`}>
        <div className="circles-container" style={{ animationDuration: `${duration}s`, animationDirection: 'normal' }}>
          <div className="circle circle1"></div>
          <div className="circle circle2"></div>
          <div className="circle circle3"></div>
          <div className="circle circle4"></div>
          <div className="circle circle5"></div>
          <div className="circle circle6"></div>
        </div>

        <div className="circles-container" style={{ animationDuration: `${duration * 0.4}s`, animationDirection: 'reverse' }}>
          <div className="circle circle1"></div>
          <div className="circle circle2"></div>
          <div className="circle circle3"></div>
          <div className="circle circle4"></div>
          <div className="circle circle5"></div>
          <div className="circle circle6"></div>
        </div>
      </div>

      {/* MAIN */}
      <div className={`circles-root`}>
        <div className="circles-container" style={{ animationDuration: `${duration}s`, animationDirection: 'normal' }}>
          <div className="circle circle1"></div>
          <div className="circle circle2"></div>
          <div className="circle circle3"></div>
          <div className="circle circle4"></div>
          <div className="circle circle5"></div>
          <div className="circle circle6"></div>
        </div>

        <div className="circles-container" style={{ animationDuration: `${duration * 0.4}s`, animationDirection: 'reverse' }}>
          <div className="circle circle1"></div>
          <div className="circle circle2"></div>
          <div className="circle circle3"></div>
          <div className="circle circle4"></div>
          <div className="circle circle5"></div>
          <div className="circle circle6"></div>
        </div>
      </div>
    </>
  );
};

export default RotatingCircles; 