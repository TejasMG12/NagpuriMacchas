import React from 'react';

type UpcomingAppointmentProps = {
    theme: 'light' | 'dark';
};

const UpcomingAppointment: React.FC<UpcomingAppointmentProps> = ({ theme }) => {
    return (
        <div style={{ color: theme === 'light' ? '#000000' : '#ffffff' }}>
            <h2>Upcoming Appointment</h2>
            <p>August 14, 2021</p>
            <p>Consultation with Dr. James</p>
        </div>
    );
};

export default UpcomingAppointment;