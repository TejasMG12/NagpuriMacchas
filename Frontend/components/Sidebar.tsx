import React, { useState, useEffect } from 'react';
import Link from 'next/link';
import Image from 'next/image';
import { useRouter } from 'next/router';
import { 
    LayoutDashboard, 
    CalendarCheck, 
    HeartPulse, 
    MessageCircle, 
    Settings, 
    LogOut 
} from 'lucide-react';

type SidebarProps = {
    theme: 'light' | 'dark';
};

const Sidebar: React.FC<SidebarProps> = ({ theme }) => {
    const router = useRouter();
    const [active, setActive] = useState(router.pathname);

    // Update active link on route change
    useEffect(() => {
        setActive(router.pathname);
    }, [router.pathname]);

    // Menu items with Lucide icons
    const menuItems = [
        { name: 'Dashboard', href: '/', icon: LayoutDashboard },
        { name: 'Appointments', href: '/appointments', icon: CalendarCheck },
        { name: 'Health Metrics', href: '/health-metrics', icon: HeartPulse },
        { name: 'Consult', href: '/chatbox', icon: MessageCircle },
        { name: 'Logout', href: '', icon: LogOut },
    ];

    return (
        <div
            style={{
                width: '80px',
                backgroundColor: theme === 'light' ? '#E8E7E7' : '#333333',
                padding: '20px',
                height: '100vh',
                color: theme === 'light' ? '#000000' : '#ffffff',
                borderTopRightRadius: '10px',
                display: 'flex',
                flexDirection: 'column',
                alignItems: 'center',
            }}
        >
            {/* Logo Section */}
            <Link href="/">
                <div style={{ width: '75px', height: '75px'}}>
                    <Image 
                        src="/Logo2.png" 
                        alt="App Logo" 
                        width={75} 
                        height={75} 
                    />
                </div>
            </Link>

            {/* Navigation Items */}
            <ul style={{ listStyleType: 'none', padding: 0, marginTop: '20px' }}>
                {menuItems.map((item) => {
                    const isActive = active === item.href;
                    return (
                        <li key={item.name} style={{ marginTop: '35px' }}>
                            <Link href={item.href}>
                                <div
                                    style={{
                                        width: '50px',
                                        height: '50px',
                                        display: 'flex',
                                        alignItems: 'center',
                                        justifyContent: 'center',
                                        borderRadius: '10px',
                                        cursor: 'pointer',
                                        backgroundColor: isActive ? '#303030' : 'transparent',
                                    }}
                                >
                                    <item.icon 
                                        size={28} 
                                        color={isActive ? '#ffffff' : theme === 'dark' ? '#ffffff' : '#333333'}
                                    />
                                </div>
                            </Link>
                        </li>
                    );
                })}
            </ul>
        </div>
    );
};

export default Sidebar;
