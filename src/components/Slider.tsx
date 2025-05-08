import React from 'react';

interface SliderProps {
  label: string;
  value: number;
  min: number;
  max: number;
  step: number;
  unit?: string;
  onChange: (value: number) => void;
}

const Slider: React.FC<SliderProps> = ({ label, value, min, max, step, unit = '', onChange }) => {
  return (
    <div>
      <label>{label}: {value.toFixed(1)}{unit}</label>
      <input
        type="range"
        min={min}
        max={max}
        step={step}
        value={value}
        onChange={(e) => onChange(parseFloat(e.target.value))}
        style={{ width: '100%' }}
      />
    </div>
  );
};

export default Slider; 