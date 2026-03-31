import React from 'react';

const TestButton = ({ onClick, disabled, loading }) => {
  const buttonStyles = {
    backgroundColor: disabled ? '#2d2d44' : '#7c3aed',
    color: 'white',
    border: 'none',
    borderRadius: '12px',
    padding: '16px 40px',
    fontSize: '18px',
    fontWeight: '700',
    cursor: disabled ? 'not-allowed' : 'pointer',
    transition: 'all 0.3s ease-in-out',
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    minWidth: '200px',
    boxShadow: disabled 
      ? 'none' 
      : '0 8px 32px rgba(124, 58, 237, 0.4)',
    position: 'relative',
    overflow: 'hidden',
    textTransform: 'uppercase',
    letterSpacing: '1px'
  };

  const glowEffect = !disabled ? {
    position: 'absolute',
    top: '-4px',
    left: '-4px',
    right: '-4px',
    bottom: '-4px',
    background: 'linear-gradient(45deg, #7c3aed, #a855f7, #7c3aed)',
    borderRadius: '16px',
    opacity: 0.6,
    zIndex: -1,
    filter: 'blur(8px)'
  } : {};

  const spinnerStyles = {
    display: 'inline-block',
    width: '20px',
    height: '20px',
    border: '3px solid rgba(255, 255, 255, 0.3)',
    borderTop: '3px solid white',
    borderRadius: '50%',
    animation: 'spin 1s linear infinite',
    marginRight: '12px'
  };

  const getButtonText = () => {
    if (loading) return 'Testando...';
    if (disabled) return 'Aguarde...';
    return 'Iniciar Teste';
  };

  return (
    <button
      style={buttonStyles}
      onClick={onClick}
      disabled={disabled || loading}
      onMouseEnter={(e) => {
        if (!disabled && !loading) {
          e.target.style.backgroundColor = '#a855f7';
          e.target.style.transform = 'translateY(-2px)';
          e.target.style.boxShadow = '0 12px 40px rgba(124, 58, 237, 0.6)';
        }
      }}
      onMouseLeave={(e) => {
        if (!disabled && !loading) {
          e.target.style.backgroundColor = '#7c3aed';
          e.target.style.transform = 'translateY(0)';
          e.target.style.boxShadow = '0 8px 32px rgba(124, 58, 237, 0.4)';
        }
      }}
    >
      {glowEffect && <div style={glowEffect} />}
      {loading && <div style={spinnerStyles} />}
      {getButtonText()}
    </button>
  );
};

export default TestButton;
