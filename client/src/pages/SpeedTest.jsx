import React, { useState, useCallback } from 'react';
import { useSpeedTest } from '../hooks/useSpeedTest';
import SpeedCard from '../components/SpeedCard';
import IPCard from '../components/IPCard';
import SpeedGauge from '../components/SpeedGauge';
import TestButton from '../components/TestButton';
import ProgressBar from '../components/ProgressBar';

const SpeedTest = () => {
  const [isTestRunning, setIsTestRunning] = useState(false);
  const {
    ip,
    ping,
    jitter,
    download,
    upload,
    loading,
    currentTest,
    progress,
    runSpeedTest
  } = useSpeedTest();

  const handleStartTest = useCallback(async () => {
    if (isTestRunning || loading) return;
    
    setIsTestRunning(true);
    
    try {
      await runSpeedTest();
    } catch (err) {
      console.error('Test failed:', err);
    } finally {
      setIsTestRunning(false);
    }
  }, [isTestRunning, loading, runSpeedTest]);

  const containerStyles = {
    minHeight: '100vh',
    width: '100%',
    backgroundColor: '#0b0b0f',
    padding: '0',
    background: 'linear-gradient(135deg, #0b0b0f 0%, #1a1a2e 50%, #2d1b69 100%)',
    position: 'relative',
    display: 'flex',
    flexDirection: 'column'
  };

  const dashboardStyles = {
    maxWidth: '1200px',
    margin: '0 auto',
    position: 'relative',
    zIndex: 10,
    width: '100%',
    flex: 1,
    display: 'flex',
    flexDirection: 'column'
  };

  const titleStyles = {
    textAlign: 'center',
    marginBottom: '24px',
    animation: 'fadeIn 0.8s ease-out',
    padding: '32px 20px 0'
  };

  const titleTextStyles = {
    fontSize: 'clamp(32px, 5vw, 48px)',
    fontWeight: '800',
    color: '#ffffff',
    margin: '0 0 16px 0',
    letterSpacing: '-1px',
    textShadow: '0 4px 8px rgba(0, 0, 0, 0.3)',
    background: 'linear-gradient(135deg, #ffffff 0%, #c084fc 100%)',
    WebkitBackgroundClip: 'text',
    WebkitTextFillColor: 'transparent',
    backgroundClip: 'text',
    lineHeight: '1.2'
  };

  const buttonContainerStyles = {
    display: 'flex',
    justifyContent: 'center',
    marginBottom: '32px',
    animation: 'fadeIn 1s ease-out 0.2s both',
    padding: '0 20px'
  };

  const mainContentStyles = {
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
    gap: '32px',
    animation: 'fadeIn 1.2s ease-out 0.4s both',
    flex: 1,
    padding: '0 20px 40px'
  };

  const gridStyles = {
    display: 'grid',
    gridTemplateColumns: 'repeat(auto-fit, minmax(280px, 1fr))',
    gap: '24px',
    width: '100%',
    maxWidth: '1200px'
  };

  const statusStyles = {
    textAlign: 'center',
    padding: '20px',
    backgroundColor: 'rgba(26, 26, 46, 0.8)',
    border: '1px solid rgba(192, 132, 252, 0.2)',
    borderRadius: '16px',
    color: '#c084fc',
    fontSize: '16px',
    fontWeight: '500',
    boxShadow: '0 4px 16px rgba(0, 0, 0, 0.2)',
    backdropFilter: 'blur(10px)',
    animation: 'fadeIn 1.4s ease-out 0.6s both'
  };

  const getTestStatusText = () => {
    switch (currentTest) {
      case 'ip':
        return 'Detectando endereço IP...';
      case 'ping':
        return 'Medindo latência e jitter...';
      case 'download':
        return 'Testando velocidade de download...';
      case 'upload':
        return 'Testando velocidade de upload...';
      default:
        return 'Executando testes de velocidade...';
    }
  };

  const getCurrentSpeed = () => {
    if (currentTest === 'download' && download) return download;
    if (currentTest === 'upload' && upload) return upload;
    if (download && !loading) return download;
    return null;
  };

  const currentSpeed = getCurrentSpeed();

  return (
    <div style={containerStyles}>
      <div style={dashboardStyles}>
        <div style={titleStyles}>
          <h1 style={titleTextStyles}>Speed Test</h1>
        </div>

        <div style={buttonContainerStyles}>
          <TestButton
            onClick={handleStartTest}
            disabled={isTestRunning || loading}
            loading={loading}
          />
        </div>

        <ProgressBar progress={progress} currentTest={currentTest} />

        <div style={mainContentStyles}>
          {/* Speed Gauge - Main Feature */}
          <div style={{ width: '100%', maxWidth: '300px', margin: '0 auto' }}>
            <SpeedGauge 
              value={currentSpeed} 
              unit="MB/s" 
              loading={loading && (currentTest === 'download' || currentTest === 'upload')}
              maxValue={1000}
            />
          </div>

          {/* Metrics Cards */}
          <div style={gridStyles}>
            <IPCard
              localIp={ip?.localIp}
              publicIp={ip?.publicIp}
              loading={currentTest === 'ip' && loading}
            />
            
            <SpeedCard
              title="Ping"
              value={ping}
              unit="ms"
              icon="ping"
              loading={currentTest === 'ping' && loading}
              subtitle={jitter && jitter !== 'Error' ? `Jitter: ${jitter}ms` : ''}
              isActive={currentTest === 'ping'}
            />
            
            <SpeedCard
              title="Download"
              value={download}
              unit="MB/s"
              icon="download"
              loading={currentTest === 'download' && loading}
              isMain={true}
              isActive={currentTest === 'download'}
            />
            
            <SpeedCard
              title="Upload"
              value={upload}
              unit="MB/s"
              icon="upload"
              loading={currentTest === 'upload' && loading}
              isActive={currentTest === 'upload'}
            />
          </div>
        </div>

        {loading && (
          <div style={statusStyles}>
            {getTestStatusText()}
          </div>
        )}
      </div>
    </div>
  );
};

export default SpeedTest;
