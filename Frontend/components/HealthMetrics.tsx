import React from 'react';

type HealthMetricsProps = {
    theme: 'light' | 'dark';
};

const HealthMetrics: React.FC<HealthMetricsProps> = ({ theme }) => {
    return (
        <div style={{ color: theme === 'light' ? '#000000' : '#ffffff' }}>
            <h2>Blood Sugar</h2>
            <p>80 mg / dl. <span>Normal</span></p>
            <h2>Heart Rate</h2>
            <p>98 bpm <span>Normal</span></p>
            <h2>Blood Pressure</h2>
            <p>102 / 72 mmHg <span>Normal</span></p>
        </div>
    );
};

export default HealthMetrics;