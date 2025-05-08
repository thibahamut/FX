import React from 'react';
import Slider from './Slider';
import ColorPicker from './ColorPicker';
import Button from './Button';

interface ControlPanelProps {
  params: {
    scale: number;
    duration: number;
    circleScale: number;
    circleMaskBlur: number;
    circleBlur: number;
    brightness: number;
    circleColor1: string;
    circleColor2: string;
    circleColor3: string;
    circleColor4: string;
    circleColor5: string;
  };
  onParamChange: (param: keyof ControlPanelProps['params'], value: number | string) => void;
  onReset: () => void;
}

const ControlPanel: React.FC<ControlPanelProps> = ({ params, onParamChange, onReset }) => {
  return (
    <div style={{
      position: 'fixed',
      top: '3em',
      left: '3em',
      zIndex: 1000,
      backgroundColor: 'white',
      boxShadow: '0 0 30px rgba(0, 0, 0, 0.1)',
      padding: '20px',
      borderRadius: '30px',
      color: 'black',
      display: 'flex',
      flexDirection: 'column',
      gap: '10px',
      minWidth: '300px',
      maxHeight: '90vh',
      overflowY: 'auto'
    }}>
      <h3 style={{ margin: '0 0 10px 0', textAlign: 'center' }}>Circle Controls</h3>
      
      <Slider
        label="Duration"
        value={params.duration}
        min={1}
        max={60}
        step={0.1}
        unit="s"
        onChange={(value) => onParamChange('duration', value)}
      />

      <Slider
        label="Circle Scale"
        value={params.circleScale}
        min={0.1}
        max={5}
        step={0.1}
        onChange={(value) => onParamChange('circleScale', value)}
      />

      <Slider
        label="Mask Blur"
        value={params.circleMaskBlur}
        min={0}
        max={20}
        step={0.1}
        unit="px"
        onChange={(value) => onParamChange('circleMaskBlur', value)}
      />

      <Slider
        label="Circle Blur"
        value={params.circleBlur}
        min={0}
        max={20}
        step={0.1}
        unit="px"
        onChange={(value) => onParamChange('circleBlur', value)}
      />

      <Slider
        label="Brightness"
        value={params.brightness}
        min={0.1}
        max={3}
        step={0.1}
        onChange={(value) => onParamChange('brightness', value)}
      />

      <Slider
        label="Scale"
        value={params.scale}
        min={0.1}
        max={2}
        step={0.1}
        onChange={(value) => onParamChange('scale', value)}
      />

      <ColorPicker
        label="Circle 1 Color"
        value={params.circleColor1}
        onChange={(value) => onParamChange('circleColor1', value)}
      />

      <ColorPicker
        label="Circle 2 Color"
        value={params.circleColor2}
        onChange={(value) => onParamChange('circleColor2', value)}
      />

      <ColorPicker
        label="Circle 3 Color"
        value={params.circleColor3}
        onChange={(value) => onParamChange('circleColor3', value)}
      />

      <ColorPicker
        label="Circle 4 Color"
        value={params.circleColor4}
        onChange={(value) => onParamChange('circleColor4', value)}
      />

      <ColorPicker
        label="Circle 5 Color"
        value={params.circleColor5}
        onChange={(value) => onParamChange('circleColor5', value)}
      />

      <Button
        label="Reset to Default"
        onClick={onReset}
      />
    </div>
  );
};

export default ControlPanel; 