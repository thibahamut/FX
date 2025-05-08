import React from 'react';

interface ButtonProps {
  label: string;
  onClick: () => void;
  backgroundColor?: string;
  color?: string;
}

const Button: React.FC<ButtonProps> = ({ 
  label, 
  onClick, 
  backgroundColor = '#4CAF50',
  color = 'white'
}) => {
  return (
    <button 
      onClick={onClick}
      style={{
        padding: '10px',
        fontSize: '16px',
        cursor: 'pointer',
        marginTop: '10px',
        backgroundColor,
        color,
        border: 'none',
        borderRadius: '5px',
        width: '100%'
      }}
    >
      {label}
    </button>
  );
};

export default Button; 