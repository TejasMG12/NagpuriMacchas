import React from 'react';

type SmartHealthCheckupProps = {
    theme: 'light' | 'dark';
};

const SmartHealthCheckup: React.FC<SmartHealthCheckupProps> = ({ theme }) => {
    return (
        <div style={{ color: theme === 'light' ? '#000000' : '#ffffff' }}>
            <h2>Smart Health Checkup</h2>
            <p>History</p>
        </div>
    );
};

export default SmartHealthCheckup;