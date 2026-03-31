import React, { useState, useEffect } from 'react';
import { formatSpeed, animateValue } from '../utils/formatSpeed.js';

const SpeedGauge = ({ value, unit, loading, maxValue = 1000 }) => {
  const [displayValue, setDisplayValue] = useState('--');
  const [displayUnit, setDisplayUnit] = useState('');

  useEffect(() => {
    if (loading) {
      setDisplayValue('--');
      setDisplayUnit('');
      return;
    }

    if (value && value !== '--' && !isNaN(parseFloat(value))) {
      const numValue = parseFloat(value);
      
      // Animate value
      animateValue(0, numValue, 1500, (currentValue) => {
        const formatted = formatSpeed(currentValue);
        setDisplayValue(formatted.displayValue);
        setDisplayUnit(formatted.displayUnit);
      });
    } else {
      setDisplayValue('--');
      setDisplayUnit('');
    }
  }, [value, unit, loading, maxValue]);

  const gaugeStyles = {
    width: '100%',
    maxWidth: '300px',
    height: 'auto',
    aspectRatio: '1',
    position: 'relative',
    margin: '0 auto 16px',
    animation: 'fadeIn 1s ease-out'
  };

  const centerTextStyles = {
    position: 'absolute',
    top: '45%',
    left: '50%',
    transform: 'translate(-50%, -50%)',
    textAlign: 'center',
    zIndex: 10,
    width: '100%'
  };

  const valueStyles = {
    fontSize: 'clamp(48px, 10vw, 72px)',
    fontWeight: '800',
    color: '#ffffff',
    margin: '0',
    lineHeight: '1',
    textShadow: '0 4px 12px rgba(0, 0, 0, 0.4)',
    letterSpacing: '-2px'
  };

  const belowTextStyles = {
    position: 'absolute',
    bottom: '20px',
    left: '50%',
    transform: 'translateX(-50%)',
    textAlign: 'center',
    width: '100%',
    zIndex: 10
  };

  const belowUnitStyles = {
    fontSize: 'clamp(16px, 3vw, 24px)',
    fontWeight: '600',
    color: '#c084fc',
    margin: '0',
    textTransform: 'uppercase',
    letterSpacing: '1px'
  };

  return (
    <div style={gaugeStyles}>
      {/* SVG Gauge - Simplified without lines */}
      <svg
        width="100%"
        height="100%"
        viewBox="0 0 300 300"
        style={{ position: 'absolute', top: 0, left: 0 }}
      >
        {/* Background arc */}
        <path
          d="M 50 250 A 100 100 0 0 1 250 250"
          fill="none"
          stroke="#2d2d44"
          strokeWidth="20"
          strokeLinecap="round"
        />
        
        {/* Progress arc - simplified without scale marks and labels */}
        <path
          d="M 50 250 A 100 100 0 0 1 250 250"
          fill="none"
          stroke="url(#gaugeGradient)"
          strokeWidth="20"
          strokeLinecap="round"
          strokeDasharray={`${loading ? 0 : ((parseFloat(displayValue) || 0) / maxValue) * Math.PI * 100} ${Math.PI * 100}`}
          style={{
            transition: 'stroke-dasharray 0.3s ease-out',
            filter: 'drop-shadow(0 0 12px rgba(192, 132, 252, 0.6))'
          }}
        />
        
        {/* Gradient definition */}
        <defs>
          <linearGradient id="gaugeGradient" x1="0%" y1="0%" x2="100%" y2="0%">
            <stop offset="0%" stopColor="#c084fc" />
            <stop offset="100%" stopColor="#e9d5ff" />
          </linearGradient>
        </defs>
      </svg>
      
      {/* Center text - Only value */}
      <div style={centerTextStyles}>
        <p style={valueStyles}>
          {displayValue}
        </p>
      </div>

      {/* Below text - Unit */}
      <div style={belowTextStyles}>
        <div style={belowUnitStyles}>
          {displayUnit}
        </div>
      </div>
    </div>
  );
};

export default SpeedGauge;
