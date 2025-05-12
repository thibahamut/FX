import React, { useState, useEffect } from 'react';

interface ColorPickerProps {
  label: string;
  value: string;
  onChange: (value: string) => void;
}

const ColorPicker: React.FC<ColorPickerProps> = ({ label, value, onChange }) => {
  const [color, setColor] = useState('#000000');
  const [alpha, setAlpha] = useState(1);
  const [hexWithAlpha, setHexWithAlpha] = useState('');

  // Parse initial color to extract any alpha value
  useEffect(() => {
    if (value.startsWith('rgba')) {
      const match = value.match(/rgba\(\s*(\d+)\s*,\s*(\d+)\s*,\s*(\d+)\s*,\s*([\d.]+)\s*\)/);
      if (match && match[4]) {
        const r = parseInt(match[1]);
        const g = parseInt(match[2]);
        const b = parseInt(match[3]);
        const a = parseFloat(match[4]);
        
        setAlpha(a);
        
        // Convert to hex for the color input
        const rHex = r.toString(16).padStart(2, '0');
        const gHex = g.toString(16).padStart(2, '0');
        const bHex = b.toString(16).padStart(2, '0');
        const aHex = Math.round(a * 255).toString(16).padStart(2, '0');
        
        setColor(`#${rHex}${gHex}${bHex}`);
        setHexWithAlpha(`#${rHex}${gHex}${bHex}${aHex}`);
      }
    } else if (value.startsWith('#') && (value.length === 9 || value.length === 8)) {
      // Handle #RRGGBBAA format
      const r = value.slice(1, 3);
      const g = value.slice(3, 5);
      const b = value.slice(5, 7);
      const a = value.slice(7, 9);
      
      const alphaValue = parseInt(a, 16) / 255;
      setAlpha(alphaValue);
      setColor(`#${r}${g}${b}`);
      setHexWithAlpha(value);
    } else {
      setColor(value);
      setHexWithAlpha(value);
    }
  }, [value]);

  // Convert hex to rgba
  const handleColorChange = (hexColor: string) => {
    setColor(hexColor);
    updateColor(hexColor, alpha);
  };

  const handleAlphaChange = (newAlpha: number) => {
    setAlpha(newAlpha);
    updateColor(color, newAlpha);
  };

  const updateColor = (hexColor: string, alphaValue: number) => {
    // Convert hex to rgba
    const r = parseInt(hexColor.slice(1, 3), 16);
    const g = parseInt(hexColor.slice(3, 5), 16);
    const b = parseInt(hexColor.slice(5, 7), 16);
    const rgba = `rgba(${r}, ${g}, ${b}, ${alphaValue})`;
    
    // Update hex with alpha
    const aHex = Math.round(alphaValue * 255).toString(16).padStart(2, '0');
    setHexWithAlpha(`${hexColor}${aHex}`);
    
    onChange(rgba);
  };

  // Get the color preview background
  const getColorPreview = () => {
    // If color is a valid hex
    if (color.startsWith('#') && (color.length === 7 || color.length === 4)) {
      const r = parseInt(color.slice(1, 3), 16);
      const g = parseInt(color.slice(3, 5), 16);
      const b = parseInt(color.slice(5, 7), 16);
      return `rgba(${r}, ${g}, ${b}, ${alpha})`;
    }
    return color;
  };

  return (
    <div>
      <label>{label}</label>
      <div style={{ display: 'flex', gap: '10px', alignItems: 'center' }}>
        <input
          type="color"
          value={color}
          onChange={(e) => handleColorChange(e.target.value)}
          style={{ width: '50px', height: '30px' }}
        />
        <div style={{ 
          flex: 1,
          display: 'flex',
          flexDirection: 'column',
          gap: '5px'
        }}>
          <input
            type="range"
            min="0"
            max="1"
            step="0.01"
            value={alpha}
            onChange={(e) => handleAlphaChange(parseFloat(e.target.value))}
            style={{ width: '100%' }}
          />
          <span style={{ fontFamily: 'monospace', fontSize: '12px' }}>
            {hexWithAlpha.toUpperCase()}
          </span>
        </div>
        <div 
          style={{ 
            width: '30px', 
            height: '30px', 
            background: getColorPreview(),
            border: '1px solid #ccc',
            borderRadius: '4px'
          }}
        />
      </div>
    </div>
  );
};

export default ColorPicker; 