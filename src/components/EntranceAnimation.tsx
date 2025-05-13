import { useEffect, useState } from 'react';
import './EntranceAnimation.css';

interface EntranceAnimationProps {
  onAnimationComplete: () => void;
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
}

const EntranceAnimation: React.FC<EntranceAnimationProps> = ({
  onAnimationComplete,
  duration,
  circleScale,
  circleMaskBlur,
  circleBlur,
  brightness,
  contrast,
  saturation,
  scale,
  circleColor1,
  circleColor2,
  circleColor3,
  circleColor4,
  circleColor5,
  circleColor6,
}) => {
  const [phase, setPhase] = useState<'center' | 'exploded' | 'returning' | 'grow'>('center');

  useEffect(() => {
    const explodeTimeout = setTimeout(() => setPhase('exploded'), 30);
    const returnTimeout = setTimeout(() => setPhase('returning'), 500);
    const growTimeout = setTimeout(() => setPhase('grow'), 1200);
    const doneTimeout = setTimeout(() => onAnimationComplete(), 1800);

    return () => {
      clearTimeout(explodeTimeout);
      clearTimeout(returnTimeout);
      clearTimeout(growTimeout);
      clearTimeout(doneTimeout);
    };
  }, [duration, onAnimationComplete]);

  const circles = [circleColor1, circleColor2, circleColor3, circleColor4, circleColor5, circleColor6];
  const circleSize = 40 * circleScale;

  return (
    <div className="entrance-animation" style={{ 
      position: 'fixed',
      left: '50%',
      top: '50%',
      width: 300, 
      height: 300,
      transform: `translate(-50%, -50%) ${phase === 'center' ? 'rotate(0deg)' : 
                phase === 'exploded' ? 'rotate(90deg)' : 
                phase === 'returning' ? 'rotate(0deg)' : 
                'rotate(0deg)'}`,
      
      transformOrigin: 'center',
      transition: 'transform 0.5s cubic-bezier(0.34, 1.56, 0.64, 1)'

    }}>
      {circles.map((color, index) => {
        const angle = (index * 60) * (Math.PI / 180);
        let distance = 600;
        let blur = 0;
        let transition = 'none';
        let transitionDelay = '0s';
        let scaleValue = 1;
        if (phase === 'exploded') {
          distance = 150;
          blur = 60;
          scaleValue = 1;
          transition = 'transform 0.25s cubic-bezier(0.34, 1.56, 0.64, 1), filter 3.7s, opacity 0.3s ease';
          transitionDelay = `${index * 0.03}s`;
        } else if (phase === 'returning') {
          distance = 60;
          blur = 0;
          scaleValue = 2;
          transition = `transform 0.5s cubic-bezier(0.34, 1.56, 0.64, 1), opacity 0.3s ease`;
          transitionDelay = `${index * 0.07}s`;
        } else if (phase === 'grow') {
          distance = 60;
          blur = 0.5;
          scaleValue = 3.5;
          transition = 'transform 0.4s cubic-bezier(0.34, 1.56, 0.64, 1), opacity 0.3s ease';
          transitionDelay = `${index * 0.08}s`;
        }
        const x = Math.cos(angle) * distance;
        const y = Math.sin(angle) * distance;
        return (
          <div
            key={index}
            style={{
              position: 'absolute',
              left: '50%',
              top: '50%',
              width: `${circleSize}px`,
              height: `${circleSize}px`,
              borderRadius: '50%',
              background: color,
              filter: `blur(${blur}px)`,
              transform: `translate(-50%, -50%) translate(${x}px, ${y}px) scale(${scaleValue})`,
              transition,
              transitionDelay,
              boxShadow: `0 0 10px 10px ${color}`,
              mixBlendMode: 'color-dodge',
              opacity: phase === 'center' ? 0 : 0.9,
            } as React.CSSProperties}
          />
        );
      })}
    </div>
  );
};

export default EntranceAnimation; 