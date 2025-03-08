import React from 'react';

type SymptomCheckerProps = {
    theme: 'light' | 'dark';
};

const SymptomChecker: React.FC<SymptomCheckerProps> = ({ theme }) => {
    return (
        <div style={{ color: theme === 'light' ? '#000000' : '#ffffff' }}>
            <h2>Not Feeling Well?</h2>
            <p>Let AI Guide You to Better Health!</p>
            <button
                style={{
                    padding: '8px 16px',
                    backgroundColor: theme === 'light' ? '#333333' : '#ffffff',
                    color: theme === 'light' ? '#ffffff' : '#333333',
                    border: 'none',
                    borderRadius: '4px',
                    cursor: 'pointer',
                }}
            >
                AI-Powered Health Check Start Now
            </button>
            <h3>Describe Your Symptoms</h3>
            <p>Start by describing how you feel. Your health journey begins here!</p>
            <button
                style={{
                    padding: '8px 16px',
                    backgroundColor: theme === 'light' ? '#333333' : '#ffffff',
                    color: theme === 'light' ? '#ffffff' : '#333333',
                    border: 'none',
                    borderRadius: '4px',
                    cursor: 'pointer',
                    marginRight: '10px',
                }}
            >
                Find Medical Help
            </button>
            <button
                style={{
                    padding: '8px 16px',
                    backgroundColor: theme === 'light' ? '#333333' : '#ffffff',
                    color: theme === 'light' ? '#ffffff' : '#333333',
                    border: 'none',
                    borderRadius: '4px',
                    cursor: 'pointer',
                }}
            >
                Get Health Insights
            </button>
        </div>
    );
};

export default SymptomChecker;