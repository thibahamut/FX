import React from 'react';

interface ColorPickerProps {
  label: string;
  value: string;
  onChange: (value: string) => void;
}

const ColorPicker: React.FC<ColorPickerProps> = ({ label, value, onChange }) => {
  return (
    <div>
      <label>{label}</label>
      <div style={{ display: 'flex', gap: '10px', alignItems: 'center' }}>
        <input
          type="color"
          value={value}
          onChange={(e) => onChange(e.target.value)}
          style={{ width: '50px', height: '30px' }}
        />
        <span style={{ fontFamily: 'monospace' }}>{value}</span>
      </div>
    </div>
  );
};

export default ColorPicker; 