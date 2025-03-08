import React from 'react';

type HeaderProps = {
    theme: 'light' | 'dark';
};

const Header: React.FC<HeaderProps> = ({ theme }) => {
    return (
        <header style={{ color: theme === 'light' ? '#000000' : '#ffffff' }}>
            <h1>Health Overview</h1>
            <p>August 12, 2021</p>
        </header>
    );
};

export default Header;