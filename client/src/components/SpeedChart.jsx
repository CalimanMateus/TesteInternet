import React, { useState, useEffect, useRef } from 'react';
import { LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer } from 'recharts';

// Move tooltip component outside render
const CustomTooltip = ({ active, payload, label }) => {
  if (active && payload && payload.length) {
    return (
      <div style={{
        backgroundColor: 'rgba(26, 26, 46, 0.9)',
        border: '1px solid rgba(124, 58, 237, 0.3)',
        borderRadius: '8px',
        padding: '8px 12px',
        color: '#ffffff',
        fontSize: '14px',
        backdropFilter: 'blur(10px)'
      }}>
        <p style={{ margin: '0 0 4px 0', opacity: 0.8 }}>{label}</p>
        <p style={{ margin: 0, fontWeight: '600', color: '#a855f7' }}>
          {payload[0].value.toFixed(1)} MB/s
        </p>
      </div>
    );
  }
  return null;
};

const SpeedChart = ({ data, active, type = 'download' }) => {
  const [chartData, setChartData] = useState([]);
  const intervalRef = useRef(null);

  useEffect(() => {
    if (active && data) {
      // Add new data point
      const newPoint = {
        time: new Date().toLocaleTimeString(),
        value: parseFloat(data) || 0,
        timestamp: Date.now()
      };

      setChartData(prev => {
        const updated = [...prev, newPoint];
        // Keep only last 20 points
        return updated.slice(-20);
      });
    } else if (!active) {
      // Clear data when not active
      setChartData([]);
    }

    return () => {
      const currentInterval = intervalRef.current;
      if (currentInterval) {
        clearInterval(currentInterval);
      }
    };
  }, [data, active]);

  const chartStyles = {
    width: '100%',
    height: '200px',
    backgroundColor: 'rgba(26, 26, 46, 0.6)',
    borderRadius: '16px',
    padding: '20px',
    backdropFilter: 'blur(10px)',
    border: '1px solid rgba(124, 58, 237, 0.2)',
    boxShadow: '0 4px 16px rgba(0, 0, 0, 0.2)'
  };

  const CustomTooltip = ({ active, payload, label }) => {
    if (active && payload && payload.length) {
      return (
        <div style={{
          backgroundColor: 'rgba(26, 26, 46, 0.9)',
          border: '1px solid rgba(124, 58, 237, 0.3)',
          borderRadius: '8px',
          padding: '8px 12px',
          color: '#ffffff',
          fontSize: '14px',
          backdropFilter: 'blur(10px)'
        }}>
          <p style={{ margin: '0 0 4px 0', opacity: 0.8 }}>{label}</p>
          <p style={{ margin: 0, fontWeight: '600', color: '#a855f7' }}>
            {payload[0].value.toFixed(1)} MB/s
          </p>
        </div>
      );
    }
    return null;
  };

  if (!active && chartData.length === 0) {
    return null;
  }

  return (
    <div style={chartStyles}>
      <div style={{
        fontSize: '14px',
        fontWeight: '600',
        color: '#a855f7',
        marginBottom: '12px',
        textTransform: 'uppercase',
        letterSpacing: '1px'
      }}>
        {type === 'download' ? 'Download' : 'Upload'} Speed
      </div>
      
      <ResponsiveContainer width="100%" height="100%">
        <LineChart data={chartData} margin={{ top: 5, right: 5, left: 5, bottom: 5 }}>
          <CartesianGrid 
            strokeDasharray="3 3" 
            stroke="rgba(124, 58, 237, 0.1)" 
            vertical={false}
          />
          <XAxis 
            dataKey="time" 
            stroke="#a855f7" 
            fontSize="12"
            opacity={0.6}
            tick={{ fontSize: 10 }}
            interval="preserveStartEnd"
          />
          <YAxis 
            stroke="#a855f7" 
            fontSize="12"
            opacity={0.6}
            tick={{ fontSize: 10 }}
            domain={[0, 'dataMax + 50']}
          />
          <Tooltip content={CustomTooltip} />
          <Line
            type="monotone"
            dataKey="value"
            stroke="url(#lineGradient)"
            strokeWidth={3}
            dot={false}
            animationDuration={300}
            style={{
              filter: 'drop-shadow(0 0 8px rgba(124, 58, 237, 0.6))'
            }}
          />
          <defs>
            <linearGradient id="lineGradient" x1="0" y1="0" x2="1" y2="0">
              <stop offset="0%" stopColor="#7c3aed" />
              <stop offset="100%" stopColor="#a855f7" />
            </linearGradient>
          </defs>
        </LineChart>
      </ResponsiveContainer>
    </div>
  );
};

export default SpeedChart;
