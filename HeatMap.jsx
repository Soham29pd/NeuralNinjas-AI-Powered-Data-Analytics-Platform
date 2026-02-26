import React from 'react';

const HeatMap = ({ data }) => {
    // 🔧 DATA GUARD: Ensures the component doesn't crash if data is loading or malformed
    const gridData = Array.isArray(data) ? data : [];

    // 🔧 DYNAMIC CALCULATION: Find max engagement to scale the color opacity
    const maxEngage = gridData.length > 0 
        ? Math.max(...gridData.map(d => d.Total_Engagement || 0), 1) 
        : 1;
    
    // 🔧 DYNAMIC CALCULATION: Identify the peak hour for the "Top" label
    const topHourData = gridData.length > 0 
        ? gridData.reduce((prev, curr) => ((prev.Total_Engagement || 0) > (curr.Total_Engagement || 0)) ? prev : curr)
        : null;

    return (
        <div className="chart-card">
            <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: '1.5rem' }}>
                <h3 style={{ margin: 0 }}>Best Posting Times (GMT)</h3>
                {topHourData && (
                    <span style={{ color: '#4ade80', fontSize: '0.85rem', fontWeight: 'bold' }}>
                        Peak: {topHourData.Hour}:00
                    </span>
                )}
            </div>

            {/* 🔧 GRID LAYOUT: 6 columns for 24 hours creates a clear, readable 4-row grid */}
            <div className="heatmap-grid">
                {Array.from({ length: 24 }).map((_, i) => {
                    // Match the index to the 'Hour' column in your CSV
                    const hourEntry = gridData.find(d => parseInt(d.Hour) === i);
                    const intensity = hourEntry ? (hourEntry.Total_Engagement / maxEngage) : 0.05;

                    return (
                        <div
                            key={i}
                            title={`Hour ${i}:00 | Engagement: ${hourEntry?.Total_Engagement || 0}`}
                            style={{
                                aspectRatio: '1',
                                borderRadius: '6px',
                                backgroundColor: `rgba(99, 102, 241, ${intensity * 0.9 + 0.1})`,
                                transition: 'transform 0.2s ease',
                                border: '1px solid rgba(255,255,255,0.05)',
                                cursor: 'pointer'
                            }}
                            onMouseEnter={(e) => e.currentTarget.style.transform = 'scale(1.1)'}
                            onMouseLeave={(e) => e.currentTarget.style.transform = 'scale(1)'}
                        />
                    );
                })}
            </div>
            
            <div style={{ display: 'flex', justifyContent: 'space-between', marginTop: '1.2rem', fontSize: '0.7rem', color: '#64748b' }}>
                <span>00:00 (Midnight)</span>
                <span>Density</span>
                <span>23:00 (Night)</span>
            </div>
        </div>
    );
};

export default HeatMap;