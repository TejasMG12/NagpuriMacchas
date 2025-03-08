import React, { ReactNode, useState, useEffect } from 'react';
import Sidebar from './Sidebar';
import Navbar from './Navbar';

type LayoutProps = {
    children: ReactNode;
};

const Layout: React.FC<LayoutProps> = ({ children }) => {
    const [theme, setTheme] = useState<'light' | 'dark'>('light');

    useEffect(() => {
        const savedTheme = localStorage.getItem('theme') as 'light' | 'dark' | null;
        if (savedTheme) {
            setTheme(savedTheme);
        }

        // Prevent unwanted scrollbars by ensuring body has no margin/padding
        document.body.style.margin = "0";
        document.body.style.padding = "0";
        document.body.style.overflow = "hidden";

        return () => {
            document.body.style.overflow = "";
        };
    }, []);

    const toggleTheme = () => {
        const newTheme = theme === 'light' ? 'dark' : 'light';
        setTheme(newTheme);
        localStorage.setItem('theme', newTheme);
    };

    return (
        <div
            style={{
                display: 'flex',
                height: '100vh', // Use full viewport height
                width: '100vw', // Ensure no horizontal overflow
                backgroundColor: theme === 'light' ? '#FFFCF8' : '#1a1a1a',
                overflow: 'hidden', // Prevent any overflow
            }}
        >
            {/* Sidebar */}
            <Sidebar theme={theme} />

            {/* Main Content Area */}
            <div style={{ display: 'flex', flexDirection: 'column', flex: 1, overflow: 'hidden' }}>
                
                {/* Navbar */}
                <Navbar theme={theme} toggleTheme={toggleTheme} />

                {/* Page Content */}
                <div
                    style={{
                        flex: 1,
                        padding: '20px',
                        overflowY: 'auto', // Allow scrolling only when needed
                        backgroundColor: theme === 'light' ? '#FFFCF8' : '#1a1a1a',
                        color: theme === 'light' ? '#000000' : '#ffffff',
                    }}
                >
                    {children}
                </div>
            </div>
        </div>
    );
};

export default Layout;
