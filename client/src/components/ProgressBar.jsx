import React from 'react';

const ProgressBar = ({ progress, currentTest }) => {
  const containerStyles = {
    width: '100%',
    backgroundColor: '#2d2d44',
    borderRadius: '12px',
    overflow: 'hidden',
    marginBottom: '32px',
    boxShadow: 'inset 0 2px 4px rgba(0, 0, 0, 0.3)',
    position: 'relative'
  };

  const barStyles = {
    height: '12px',
    backgroundColor: 'linear-gradient(90deg, #7c3aed 0%, #a855f7 100%)',
    borderRadius: '12px',
    transition: 'width 0.5s ease-in-out',
    width: `${progress}%`,
    position: 'relative',
    overflow: 'hidden'
  };

  const glowStyles = {
    position: 'absolute',
    top: '0',
    left: '0',
    right: '0',
    bottom: '0',
    background: 'linear-gradient(90deg, transparent 0%, rgba(255, 255, 255, 0.3) 50%, transparent 100%)',
    animation: progress > 0 ? 'shimmer 2s ease-in-out infinite' : 'none'
  };

  const textStyles = {
    display: 'flex',
    justifyContent: 'space-between',
    alignItems: 'center',
    fontSize: '14px',
    color: '#a855f7',
    marginBottom: '12px',
    fontWeight: '500',
    textTransform: 'uppercase',
    letterSpacing: '0.5px'
  };

  const getTestText = () => {
    switch (currentTest) {
      case 'ip':
        return 'Detectando IP';
      case 'ping':
        return 'Medindo Ping';
      case 'download':
        return 'Testando Download';
      case 'upload':
        return 'Testando Upload';
      default:
        return progress > 0 ? 'Finalizando' : '';
    }
  };

  if (!progress && !currentTest) {
    return null;
  }

  return (
    <div style={{ marginBottom: '32px' }}>
      <div style={textStyles}>
        <span>{getTestText()}</span>
        <span>{Math.round(progress)}%</span>
      </div>
      <div style={containerStyles}>
        <div style={barStyles}>
          <div style={glowStyles} />
        </div>
      </div>
    </div>
  );
};

export default ProgressBar;
