import React from 'react';

const IPCard = ({ localIp, publicIp, loading }) => {
  const cardStyles = {
    backgroundColor: '#1a1a2e',
    border: '1px solid #2d2d44',
    borderRadius: '16px',
    padding: '20px',
    boxShadow: '0 4px 16px rgba(0, 0, 0, 0.1)',
    transition: 'all 0.3s ease-in-out',
    minHeight: '120px',
    display: 'flex',
    flexDirection: 'column',
    justifyContent: 'space-between',
    position: 'relative',
    overflow: 'hidden',
    animation: loading ? 'pulse 2s ease-in-out infinite' : 'fadeIn 0.8s ease-out'
  };

  const headerStyles = {
    display: 'flex',
    alignItems: 'center',
    marginBottom: '12px',
    color: '#c084fc',
    fontSize: '12px',
    fontWeight: '600',
    textTransform: 'uppercase',
    letterSpacing: '1px',
    opacity: 0.8
  };

  const iconStyles = {
    width: '16px',
    height: '16px',
    marginRight: '6px',
    opacity: 0.7
  };

  const ipSectionStyles = {
    marginBottom: '8px'
  };

  const ipLabelStyles = {
    fontSize: '10px',
    color: '#c084fc',
    opacity: '0.7',
    marginBottom: '3px',
    textTransform: 'uppercase',
    letterSpacing: '0.5px'
  };

  const ipValueStyles = {
    fontSize: '16px',
    fontWeight: '600',
    color: '#ffffff',
    margin: '0',
    fontFamily: 'monospace',
    letterSpacing: '0.5px'
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

  const getIcon = () => (
    <svg style={iconStyles} fill="none" stroke="currentColor" viewBox="0 0 24 24">
      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 12a9 9 0 01-9 9m9-9a9 9 0 00-9-9m9 9H3m9 9a9 9 0 01-9-9m9 9c1.657 0 3-4.03 3-9s-1.343-9-3-9m0 18c-1.657 0-3-4.03-3-9s1.343-9 3-9m-9 9a9 9 0 019-9" />
    </svg>
  );

  return (
    <div style={cardStyles}>
      <div style={headerStyles}>
        {getIcon()}
        IP
      </div>
      <div>
        {loading ? (
          <div style={loadingStyles} />
        ) : (
          <div>
            {/* Local IP */}
            <div style={ipSectionStyles}>
              <div style={ipLabelStyles}>Local</div>
              <p style={ipValueStyles}>
                {localIp || '--'}
              </p>
            </div>
            
            {/* Public IP */}
            {publicIp && (
              <div style={ipSectionStyles}>
                <div style={ipLabelStyles}>Público</div>
                <p style={ipValueStyles}>
                  {publicIp}
                </p>
              </div>
            )}
          </div>
        )}
      </div>
    </div>
  );
};

export default IPCard;
