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
  const [phase, setPhase] = useState<'begin' | 'open' | 'out'>('begin');

  useEffect(() => {
    let beginTimeoutMs = 10;
    let openTimeoutMs = 500;
    let outTimeoutMs = 400;
    let doneTimeoutMs = 200;

    let timer = 0;
    timer += beginTimeoutMs;
    const beginTimeout = setTimeout(() => setPhase('open'), timer);
    timer += openTimeoutMs;
    const outTimeout = setTimeout(() => setPhase('out'), timer);
    timer += outTimeoutMs;
    const doneTimeout = setTimeout(() => onAnimationComplete(), timer);

    return () => {
      clearTimeout(beginTimeout);
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
      transform: `translate(-50%, -50%) ${phase === 'begin' ? 'rotate(0deg)' : 
                phase === 'open' ? 'rotate(180deg)' : 
                'rotate(270deg)'}`,
      transition: 'transform 0.2s'
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

        if (phase === 'begin') {
          transitionTime = 0.5;
          opacity = 0;
          distance = 0;
          blur = 20;
          scaleValue = 0;
          circleStretchX = scaleValue * 1;
          circleStretchY = scaleValue * 1;
          transitionDelay = `${index * 0.08}s`;
        } else if (phase === 'open') {
          transitionTime = 0.5;
          distance = 100;
          blur = 5;
          scaleValue = 2;
          circleStretchX = scaleValue * 1;
          circleStretchY = scaleValue * 1;
          transitionDelay = `${index * 0.08}s`;
        } else if (phase === 'out') {
          transitionTime = 0.25;
          distance = 50;
          blur = 10;
          scaleValue = 4;
          circleStretchX = scaleValue * 1;
          circleStretchY = scaleValue * 1;
          transitionDelay = `${index * 0.05}s`;
          opacity = 1;
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