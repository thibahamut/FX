import { useEffect, useState } from 'react';

interface EntranceAnimationProps {
  onAnimationComplete: () => void;
  circleColor1: string;
  circleColor2: string;
  circleColor3: string;
  circleColor4: string;
  circleColor5: string;
  circleColor6: string;
}

function randomBetween(min: number, max: number) {
  return Math.random() * (max - min) + min;
}

const EntranceAnimation: React.FC<EntranceAnimationProps> = ({
  onAnimationComplete,
  circleColor1,
  circleColor2,
  circleColor3,
  circleColor4,
  circleColor5,
  circleColor6,
}) => {
  const [phase, setPhase] = useState<'center' | 'exploded' | 'returning' | 'grow' | 'out'>('center');

  useEffect(() => {

    let explodeTimeoutMs = 100;
    let returnTimeoutMs = 800;
    let growTimeoutMs = 800;
    let outTimeoutMs = 1000;
    let doneTimeoutMs = 400;

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
  }, [onAnimationComplete]);

  const circles = [circleColor1, circleColor2, circleColor3, circleColor4, circleColor5, circleColor6];
  const circleSize = 40;

  return (
    <div className="entrance-animation" style={{ 
      position: 'fixed',
      left: '50%',
      top: '50%',
      width: 300, 
      height: 300,
      transformOrigin: 'center center',
      borderRadius: '100%',
      backgroundColor: 'transparent',
      isolation: 'isolate',
      mixBlendMode: 'color-dodge',
      transform: `translate(-50%, -50%) ${phase === 'center' ? 'rotate(0deg)' : 
                phase === 'exploded' ? 'rotate(90deg)' : 
                phase === 'returning' ? 'rotate(180deg)' : 
                phase === 'grow' ? 'rotate(90deg)' : 
                phase === 'out' ? 'rotate(180deg)' : 
                'rotate(270deg)'}`,
      transition: 'transform 0.5s cubic-bezier(0.34, 1.56, 0.64, 1)'
    }}>
      {circles.map((color, index) => {
        const angle = (index * 60) * (Math.PI / 180);
        let distance = 0;
        let blur = 0;
        let transitionDelay = '0s';
        let scaleValue = 1;
        let opacity = 0.9;
        let transitionTime = 0.25;
        let circleStretchX = 1;
        let circleStretchY = 1;

        if (phase === 'center') {
          transitionTime = 0.6;
          opacity = 0;
          distance = 400;
          blur = 20;
          scaleValue = 30;
          circleStretchX = scaleValue * 0.1;
          circleStretchY = scaleValue * 0.5;
          transitionDelay = `${index * 0.25}s`;
        } else if (phase === 'exploded') {
          transitionTime = 0.6;
          distance = 30;
          blur = 10;
          scaleValue = 2;
          circleStretchX = scaleValue * 0.3;
          circleStretchY = scaleValue * 1;
          transitionDelay = `${index * 0.1}s`;
        } else if (phase === 'returning') {
          transitionTime = 0.3;
          distance = 60;
          blur = 0;
          scaleValue = 2;
          circleStretchX = scaleValue * 1;
          circleStretchY = scaleValue * 1;
          transitionDelay = `${index * 0.08}s`;
        } else if (phase === 'grow') {
          transitionTime = 0.5;
          distance = -140;
          blur = 0;
          scaleValue = 2;
          circleStretchX = scaleValue * 1;
          circleStretchY = scaleValue * 1;
          transitionDelay = `${index * 0.15}s`;
        } else if (phase === 'out') {
          transitionTime = 0.8;
          distance = 360;
          blur = 10;
          scaleValue = 0.8;
          circleStretchX = scaleValue * 1;
          circleStretchY = scaleValue * 1;
          transitionDelay = `${index * 0.05}s`;
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
              transition: `transform ${transitionTime}s cubic-bezier(0.34, 1.56, 0.64, 1), filter 1s, opacity 0.3s ease`,
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