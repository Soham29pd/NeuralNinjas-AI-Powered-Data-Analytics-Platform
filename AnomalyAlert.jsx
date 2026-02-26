import React from 'react';
import { AlertTriangle, CheckCircle } from 'lucide-react';

const AnomalyAlert = ({ alerts }) => {
    return (
        <>
            {alerts.map((alert, index) => (
                <div key={index} style={{
                    background: alert.type === 'warning' ? 'rgba(239, 68, 68, 0.1)' : 'rgba(34, 197, 94, 0.1)',
                    border: `1px solid ${alert.type === 'warning' ? 'rgba(239, 68, 68, 0.3)' : 'rgba(34, 197, 94, 0.3)'}`,
                    borderRadius: '12px',
                    padding: '12px 16px',
                    display: 'flex',
                    alignItems: 'center',
                    gap: '12px',
                    marginBottom: '20px',
                    color: alert.type === 'warning' ? '#fca5a5' : '#86efac'
                }}>
                    {alert.type === 'warning' ? <AlertTriangle size={20} /> : <CheckCircle size={20} />}
                    <span style={{ fontSize: '0.95rem' }}>{alert.message}</span>
                </div>
            ))}
        </>
    );
};

export default AnomalyAlert;
