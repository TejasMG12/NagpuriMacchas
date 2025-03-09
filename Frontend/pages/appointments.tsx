import React from 'react';
import Layout from '../components/Layout';
import AppointmentsCalendar from '@/components/appointments/calender';
import html2pdf from 'html2pdf.js'; // For generating PDFs

const Appointments: React.FC = () => {
    // Inline styles for the layout
    const styles = {
        appointmentsContainer: {
            display: 'grid',
            gridTemplateColumns: '70% 30%',
            gap: '20px',
            padding: '20px',
        },
        calendarSection: {
            backgroundColor: '#FFFCF8',
            borderRadius: '8px',
            boxShadow: '0 2px 4px rgba(0, 0, 0, 0.1)',
        },
        doctorsSection: {
            backgroundColor: '#FFFCF8',
            padding: '20px',
            borderRadius: '8px',
            boxShadow: '0 2px 4px rgba(0, 0, 0, 0.1)',
        },
        doctorList: {
            listStyleType: 'none',
            padding: '0',
        },
        doctorListItem: {
            marginBottom: '10px',
            padding: '10px',
            backgroundColor: '#fff',
            borderRadius: '4px',
            boxShadow: '0 1px 3px rgba(0, 0, 0, 0.1)',
            display: 'flex',
            justifyContent: 'space-between',
            alignItems: 'center',
        },
        meetNowButton: {
            backgroundColor: '#FF0000',
            color: '#fff',
            border: 'none',
            padding: '8px 16px',
            borderRadius: '4px',
            cursor: 'pointer',
            fontSize: '14px',
        },
    };

    // Mock data for doctors
    const doctors = [
        { id: 1, name: 'Dr. Smith', specialty: 'Cardiology', email: 'moudgalpriyanshu463@gmail.com' },
        { id: 2, name: 'Dr. Johnson', specialty: 'Dermatology', email: 'moudgalpriyanshu463@gmail.com' },
        { id: 3, name: 'Dr. Lee', specialty: 'Orthopedics', email: 'moudgalpriyanshu463@gmail.com' },
    ];

    // Function to generate a Google Meet link
    const generateGoogleMeetLink = () => {
        return 'https://meet.google.com/new';
    };

    // Function to generate a PDF of the HealthMetricsPage
    const generateHealthMetricsPDF = () => {
        const element = document.getElementById('health-metrics-page'); // Ensure the HealthMetricsPage has this ID
        if (element) {
            html2pdf()
                .from(element)
                .save('health_metrics.pdf')
                .output('blob')
                .then((pdfBlob: Blob) => {
                    return pdfBlob;
                });
        }
    };

    
    const sendEmailToDoctor = async (doctorEmail: string, meetingLink: string, pdfBlob: Blob) => {
        const formData = new FormData();
        formData.append('email', doctorEmail);
        formData.append('subject', 'Instant Meeting Invitation');
        formData.append('message', `Please join the meeting using this link: ${meetingLink}`);
        formData.append('attachment', pdfBlob, 'health_metrics.pdf');

        try {
            const response = await fetch('/api/send-email', {
                method: 'POST',
                body: formData,
            });
            if (response.ok) {
                alert('Email sent successfully!');
            } else {
                alert('Failed to send email.');
            }
        } catch (error) {
            console.error('Error sending email:', error);
        }
    };

    // Handle "Meet Now" button click
    const handleMeetNow = async (doctorEmail: string) => {
        const meetingLink = generateGoogleMeetLink();
        const pdfBlob = await generateHealthMetricsPDF();

        // Open the meeting link in a new tab
        window.open(meetingLink, '_blank');

        // Send the email to the doctor
        if (pdfBlob) {
            await sendEmailToDoctor(doctorEmail, meetingLink, pdfBlob);
        }
    };

    return (
        <Layout>
            <div style={styles.appointmentsContainer}>
                {/* Calendar Section */}
                <div style={{}}>
                    <AppointmentsCalendar />
                </div>

                {/* Doctors Section */}
                <div style={styles.doctorsSection}>
                    <h2>Available Doctors</h2>
                    <ul style={styles.doctorList}>
                        {doctors.map(doctor => (
                            <li key={doctor.id} style={styles.doctorListItem}>
                                <div>
                                    <strong>{doctor.name}</strong> - {doctor.specialty}
                                </div>
                                <button
                                    style={styles.meetNowButton}
                                    onClick={() => handleMeetNow(doctor.email)}
                                >
                                    Meet Now
                                </button>
                            </li>
                        ))}
                    </ul>
                </div>
            </div>
        </Layout>
    );
};

export default Appointments;