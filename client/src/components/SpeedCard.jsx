import React, { useState, useEffect } from 'react';
import { formatSpeed, animateValue } from '../utils/formatSpeed.js';

const SpeedCard = ({ title, value, unit, icon, loading, subtitle, isMain = false, isActive = false }) => {
  const [displayValue, setDisplayValue] = useState('--');
  const [displayUnit, setDisplayUnit] = useState('');

  useEffect(() => {
    if (loading) {
      setDisplayValue('--');
      setDisplayUnit('');
      return;
    }

    if (title === 'IP' && value) {
      // Handle IP display (object with localIp and publicIp)
      if (typeof value === 'object' && value.localIp) {
        setDisplayValue(value.localIp);
        setDisplayUnit('');
      } else if (typeof value === 'string') {
        setDisplayValue(value);
        setDisplayUnit('');
      } else {
        setDisplayValue('--');
        setDisplayUnit('');
      }
      return;
    }

    if (value && value !== '--' && !isNaN(parseFloat(value))) {
      const numValue = parseFloat(value);
      
      if (unit === 'MB/s') {
        // Animate from 0 to the target value
        animateValue(0, numValue, 1500, (currentValue) => {
          const formatted = formatSpeed(currentValue);
          setDisplayValue(formatted.displayValue);
          setDisplayUnit(formatted.displayUnit);
        });
      } else {
        // For non-speed values (like ping), just set directly
        setDisplayValue(value);
        setDisplayUnit('');
      }
    } else {
      setDisplayValue(value || '--');
      setDisplayUnit('');
    }
  }, [value, unit, loading, title]);

  const cardStyles = {
    backgroundColor: '#1a1a2e',
    border: isMain ? '2px solid #c084fc' : isActive ? '2px solid #e9d5ff' : '1px solid #2d2d44',
    borderRadius: '16px',
    padding: isMain ? '24px' : '20px',
    boxShadow: isMain 
      ? '0 8px 32px rgba(192, 132, 252, 0.3)' 
      : isActive 
      ? '0 6px 24px rgba(233, 213, 255, 0.4)'
      : '0 4px 16px rgba(0, 0, 0, 0.1)',
    transition: 'all 0.3s ease-in-out',
    minHeight: isMain ? '160px' : '120px',
    display: 'flex',
    flexDirection: 'column',
    justifyContent: 'space-between',
    position: 'relative',
    overflow: 'hidden',
    animation: loading ? 'pulse 2s ease-in-out infinite' : 'fadeIn 0.8s ease-out',
    transform: isActive ? 'scale(1.02)' : 'scale(1)',
    cursor: 'pointer'
  };

  const headerStyles = {
    display: 'flex',
    alignItems: 'center',
    marginBottom: isMain ? '16px' : '12px',
    color: isMain ? '#ffffff' : isActive ? '#c084fc' : '#c084fc',
    fontSize: '12px',
    fontWeight: '600',
    textTransform: 'uppercase',
    letterSpacing: '1px',
    opacity: isMain ? 1 : isActive ? 0.9 : 0.8
  };

  const iconStyles = {
    width: '16px',
    height: '16px',
    marginRight: '6px',
    opacity: 0.7
  };

  const valueStyles = {
    fontSize: isMain ? 'clamp(28px, 4vw, 40px)' : 'clamp(20px, 3vw, 28px)',
    fontWeight: '700',
    color: '#ffffff',
    margin: '0',
    lineHeight: '1',
    textShadow: '0 2px 4px rgba(0, 0, 0, 0.3)',
    transition: 'all 0.3s ease-out'
  };

  const unitStyles = {
    fontSize: isMain ? 'clamp(14px, 2vw, 18px)' : 'clamp(12px, 1.5vw, 14px)',
    fontWeight: '500',
    color: '#c084fc',
    marginLeft: '6px',
    opacity: 0.9
  };

  const subtitleStyles = {
    fontSize: '12px',
    color: '#c084fc',
    marginTop: '6px',
    opacity: 0.8,
    textAlign: 'center'
  };

  const loadingStyles = {
    display: 'inline-block',
    width: '20px',
    height: '20px',
    border: '3px solid #2d2d44',
    borderTop: '3px solid #c084fc',
    borderRadius: '50%',
    animation: 'spin 1s linear infinite'
  };

  const glowEffect = (isMain || isActive) ? {
    position: 'absolute',
    top: '-2px',
    left: '-2px',
    right: '-2px',
    bottom: '-2px',
    background: 'linear-gradient(45deg, #c084fc, #e9d5ff, #c084fc)',
    borderRadius: '18px',
    opacity: isMain ? 0.3 : 0.2,
    zIndex: -1,
    animation: 'pulse 2s ease-in-out infinite'
  } : {};

  const contentStyles = {
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
    justifyContent: 'center',
    flex: 1,
    textAlign: 'center'
  };

  const getIcon = () => {
    switch (icon) {
      case 'ping':
        return (
          <svg style={iconStyles} fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 10V3L4 14h7v7l9-11h-7z" />
          </svg>
        );
      case 'download':
        return (
          <svg style={iconStyles} fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M7 16a4 4 0 01-.88-7.903A5 5 0 1115.9 6L16 6a5 5 0 011 9.9M9 19l3 3m0 0l3-3m-3 3V10" />
          </svg>
        );
      case 'upload':
        return (
          <svg style={iconStyles} fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M7 16a4 4 0 01-.88-7.903A5 5 0 1115.9 6L16 6a5 5 0 011 9.9M15 13l-3-3m0 0l-3 3m3-3v12" />
          </svg>
        );
      case 'ip':
        return (
          <svg style={iconStyles} fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 12a9 9 0 01-9 9m9-9a9 9 0 00-9-9m9 9H3m9 9a9 9 0 01-9-9m9 9c1.657 0 3-4.03 3-9s-1.343-9-3-9m0 18c-1.657 0-3-4.03-3-9s1.343-9 3-9m-9 9a9 9 0 019-9" />
          </svg>
        );
      default:
        return null;
    }
  };

  return (
    <div style={cardStyles}>
      {glowEffect && <div style={glowEffect} />}
      <div style={headerStyles}>
        {getIcon()}
        {title}
      </div>
      <div style={contentStyles}>
        {loading ? (
          <div style={loadingStyles} />
        ) : (
          <div>
            <div style={{ display: 'flex', alignItems: 'baseline', justifyContent: 'center' }}>
              <p style={valueStyles}>
                {displayValue}
              </p>
              {unit && <span style={unitStyles}>{displayUnit}</span>}
            </div>
            {subtitle && (
              <div style={subtitleStyles}>
                {subtitle}
              </div>
            )}
          </div>
        )}
      </div>
    </div>
  );
};

export default SpeedCard;
