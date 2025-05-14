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
  circleStretchX: number;
  circleStretchY: number;
}

// Função utilitária para gerar número aleatório entre min e max
function randomBetween(min: number, max: number) {
  return Math.random() * (max - min) + min;
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
  circleStretchX,
  circleStretchY,
}) => {
  const [phase, setPhase] = useState<'center' | 'exploded' | 'returning' | 'grow' | 'out'>('center');

  useEffect(() => {

    let explodeTimeoutMs = 100;
    let returnTimeoutMs = 800;
    let growTimeoutMs = 500;
    let outTimeoutMs = 700;
    let doneTimeoutMs = 200;

    let timer = 0;
    timer += explodeTimeoutMs;
    const explodeTimeout = setTimeout(() => setPhase('exploded'), timer);
    timer += returnTimeoutMs;
    const returnTimeout = setTimeout(() => setPhase('returning'), timer);
    timer += growTimeoutMs;
    const growTimeout = setTimeout(() => setPhase('grow'), timer);
    timer += outTimeoutMs;
    const outTimeout = setTimeout(() => setPhase('out'), timer);
    timer += doneTimeoutMs;
    const doneTimeout = setTimeout(() => onAnimationComplete(), timer);

    return () => {
      clearTimeout(explodeTimeout);
      clearTimeout(returnTimeout);
      clearTimeout(growTimeout);
      clearTimeout(outTimeout);
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
                phase === 'returning' ? 'rotate(180deg)' : 
                phase === 'grow' ? 'rotate(90deg)' : 
                phase === 'out' ? 'rotate(180deg)' : 
                'rotate(270deg)'}`,      
      transformOrigin: 'center',
      transition: 'transform 0.5s cubic-bezier(0.34, 1.56, 0.64, 1)'
    }}>      
      {circles.map((color, index) => {
        const angle = (index * 60) * (Math.PI / 180);
        let distance = 0;
        let blur = 0;
        let transition = 'none';
        let transitionDelay = '0s';
        let scaleValue = 1;
        let opacity = 0.9;

        if (phase === 'center') {
          distance = 400;
          blur = 20;
          scaleValue = 30;
          circleStretchX = scaleValue * 0.1;
          circleStretchY = scaleValue * 0.5;
          transition = `transform 0.25s cubic-bezier(0.34, 1.56, 0.64, 1), filter 1s, opacity 0.3s ease`;
          opacity = 0;
        } else if (phase === 'exploded') {
          distance = 30;
          blur = 0;
          scaleValue = 2;
          circleStretchX = scaleValue * 0.3;
          circleStretchY = scaleValue * 1;
          transitionDelay = `${index * 0.1}s`;
          transition = `transform 0.25s cubic-bezier(0.34, 1.56, 0.64, 1), filter 1s, opacity 0.3s ease`;
        } else if (phase === 'returning') {
          distance = 60;
          blur = 0;
          scaleValue = 2;
          circleStretchX = scaleValue * 1;
          circleStretchY = scaleValue * 1;
          transitionDelay = `${index * 0.07}s`;
          transition = `transform 0.5s cubic-bezier(0.34, 1.56, 0.64, 1), opacity 0.3s ease, filter 1s`;
        } else if (phase === 'grow') {
          distance = 120;
          blur = 0;
          scaleValue = 2;
          circleStretchX = scaleValue * 0.8;
          circleStretchY = scaleValue * 1;
          transitionDelay = `${index * 0.08}s`;
          transition = `transform 0.4s cubic-bezier(0.34, 1.56, 0.64, 1), opacity 0.3s ease, filter 1s`;
        } else if (phase === 'out') {
          distance = 300;
          blur = 10;
          scaleValue = 0.5;
          circleStretchX = 0.5;
          circleStretchY = 0.5;
          transitionDelay = `${index * 0.05}s`;
          transition = `transform 0.5s cubic-bezier(0.34, 1.56, 0.64, 1), opacity 0.5s ease, filter 0.5s`;
          opacity = 0;
        }
        const x = Math.cos(angle) * distance;
        const y = Math.sin(angle) * distance;
        const angleDeg = (Math.atan2(y, x) * 180) / Math.PI;
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
              transform: `translate(-50%, -50%) translate(${x}px, ${y}px) rotate(${angleDeg + 90}deg) scaleX(${circleStretchX}) scaleY(${circleStretchY})`,
              transition,
              transitionDelay,
              boxShadow: `0 0 10px 10px ${color}`,
              mixBlendMode: 'color-dodge',
              opacity,
            } as React.CSSProperties}
          />
        );
      })}
    </div>
  );
};

export default EntranceAnimation; 