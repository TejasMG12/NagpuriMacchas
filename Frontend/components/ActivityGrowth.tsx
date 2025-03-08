import React from 'react';

type ActivityGrowthProps = {
    theme: 'light' | 'dark';
};

const ActivityGrowth: React.FC<ActivityGrowthProps> = ({ theme }) => {
    return (
        <div style={{ color: theme === 'light' ? '#000000' : '#ffffff' }}>
            <h2>Activity Growth</h2>
            <div className="activity-bars">
                <div style={{ width: '90%', backgroundColor: theme === 'light' ? '#4CAF50' : '#2E7D32' }}>90%</div>
                <div style={{ width: '60%', backgroundColor: theme === 'light' ? '#4CAF50' : '#2E7D32' }}>60%</div>
                <div style={{ width: '40%', backgroundColor: theme === 'light' ? '#4CAF50' : '#2E7D32' }}>40%</div>
                <div style={{ width: '20%', backgroundColor: theme === 'light' ? '#4CAF50' : '#2E7D32' }}>20%</div>
            </div>
        </div>
    );
};

export default ActivityGrowth;