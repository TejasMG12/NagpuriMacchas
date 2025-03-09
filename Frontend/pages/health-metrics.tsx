import React from 'react';
import Layout from '../components/Layout';

const HealthMetricsPage: React.FC = () => {
    // Mock data for the patient
    const patient = {
        name: 'Priyanshu Kumar',
        profileImage: 'profile_photo.jpg', // Placeholder image URL
        age: 20,
        gender: 'Male',
        weight: '68 kg',
        height: '184 cm',
        bloodType: 'B+',
        allergies: ['Peanuts', 'Dust', 'Pollen'],
        medications: ['Metformin', 'Lisinopril', 'Atorvastatin'],
        conditions: ['Type 2 Diabetes', 'Hypertension'],
        lastCheckup: '2023-10-01',
        nextAppointment: '2023-11-15',
        vitals: {
            heartRate: '72 bpm',
            bloodPressure: '120/80 mmHg',
            bloodSugar: '90 mg/dL',
            oxygenSaturation: '98%',
            temperature: '98.6°F',
        },
        cardiovascular: {
            cholesterol: {
                total: '190 mg/dL',
                hdl: '50 mg/dL',
                ldl: '110 mg/dL',
                triglycerides: '150 mg/dL',
            },
            ecg: 'Normal sinus rhythm',
            stressTest: 'No signs of ischemia',
        },
        respiratory: {
            lungCapacity: '5.2 L',
            respiratoryRate: '16 breaths/min',
            spirometry: 'Normal',
            chestXRay: 'No abnormalities detected',
        },
        metabolic: {
            liverFunction: {
                alt: '20 U/L',
                ast: '22 U/L',
                bilirubin: '0.8 mg/dL',
            },
            kidneyFunction: {
                creatinine: '1.0 mg/dL',
                bun: '14 mg/dL',
                gfr: '90 mL/min',
            },
            thyroid: {
                tsh: '2.5 mIU/L',
                t4: '1.2 ng/dL',
            },
        },
        immunology: {
            whiteBloodCells: '7,000 cells/µL',
            neutrophils: '55%',
            lymphocytes: '35%',
            eosinophils: '2%',
        },
    };

    // Inline styles
    const styles = {
        container: {
            padding: '20px',
            backgroundColor: '#FFFCF8',
            borderRadius: '8px',
            boxShadow: '0 2px 4px rgba(0, 0, 0, 0.1)',
            maxWidth: '1400px', // Wider container
            margin: '0 auto',
        },
        profileSection: {
            display: 'flex',
            alignItems: 'center',
            marginBottom: '20px',
        },
        profileImage: {
            width: '100px',
            height: '100px',
            borderRadius: '50%',
            marginRight: '20px',
            border: '3px solid #4CAF50', // Green border for the image
        },
        profileName: {
            fontSize: '24px',
            fontWeight: 'bold',
            color: '#333',
        },
        section: {
            marginBottom: '30px',
        },
        sectionTitle: {
            fontSize: '20px',
            fontWeight: 'bold',
            color: '#4CAF50',
            marginBottom: '15px',
            borderBottom: '2px solid #4CAF50',
            paddingBottom: '5px',
        },
        subsection: {
            marginBottom: '20px',
        },
        subsectionTitle: {
            fontSize: '18px',
            fontWeight: 'bold',
            color: '#333',
            marginBottom: '10px',
        },
        metricCard: {
            backgroundColor: '#fff',
            padding: '15px',
            borderRadius: '8px',
            boxShadow: '0 1px 3px rgba(0, 0, 0, 0.1)',
            marginBottom: '10px',
        },
        metricTitle: {
            fontSize: '16px',
            fontWeight: 'bold',
            color: '#555',
            marginBottom: '5px',
        },
        metricValue: {
            fontSize: '18px',
            color: '#333',
        },
    };

    return (
        <Layout>
            <div id="health-metrics-page" style={styles.container}>
                {/* Profile Section */}
                <div style={styles.profileSection}>
                    <img
                        src={patient.profileImage}
                        alt="Profile"
                        style={styles.profileImage}
                    />
                    <div>
                        <h2 style={styles.profileName}>{patient.name}</h2>
                        <p>Age: {patient.age} | Gender: {patient.gender}</p>
                        <p>Weight: {patient.weight} | Height: {patient.height}</p>
                        <p>Blood Type: {patient.bloodType}</p>
                    </div>
                </div>

                {/* General Information */}
                <div style={styles.section}>
                    <h3 style={styles.sectionTitle}>General Information</h3>
                    <div style={styles.metricCard}>
                        <p><strong>Allergies:</strong> {patient.allergies.join(', ')}</p>
                        <p><strong>Medications:</strong> {patient.medications.join(', ')}</p>
                        <p><strong>Conditions:</strong> {patient.conditions.join(', ')}</p>
                        <p><strong>Last Checkup:</strong> {patient.lastCheckup}</p>
                        <p><strong>Next Appointment:</strong> {patient.nextAppointment}</p>
                    </div>
                </div>

                {/* Vitals */}
                <div style={styles.section}>
                    <h3 style={styles.sectionTitle}>Vitals</h3>
                    <div style={styles.metricCard}>
                        <p><strong>Heart Rate:</strong> {patient.vitals.heartRate}</p>
                        <p><strong>Blood Pressure:</strong> {patient.vitals.bloodPressure}</p>
                        <p><strong>Blood Sugar:</strong> {patient.vitals.bloodSugar}</p>
                        <p><strong>Oxygen Saturation:</strong> {patient.vitals.oxygenSaturation}</p>
                        <p><strong>Temperature:</strong> {patient.vitals.temperature}</p>
                    </div>
                </div>

                {/* Cardiovascular */}
                <div style={styles.section}>
                    <h3 style={styles.sectionTitle}>Cardiovascular</h3>
                    <div style={styles.subsection}>
                        <h4 style={styles.subsectionTitle}>Cholesterol</h4>
                        <div style={styles.metricCard}>
                            <p><strong>Total:</strong> {patient.cardiovascular.cholesterol.total}</p>
                            <p><strong>HDL:</strong> {patient.cardiovascular.cholesterol.hdl}</p>
                            <p><strong>LDL:</strong> {patient.cardiovascular.cholesterol.ldl}</p>
                            <p><strong>Triglycerides:</strong> {patient.cardiovascular.cholesterol.triglycerides}</p>
                        </div>
                    </div>
                    <div style={styles.subsection}>
                        <h4 style={styles.subsectionTitle}>ECG</h4>
                        <div style={styles.metricCard}>
                            <p>{patient.cardiovascular.ecg}</p>
                        </div>
                    </div>
                    <div style={styles.subsection}>
                        <h4 style={styles.subsectionTitle}>Stress Test</h4>
                        <div style={styles.metricCard}>
                            <p>{patient.cardiovascular.stressTest}</p>
                        </div>
                    </div>
                </div>

                {/* Respiratory */}
                <div style={styles.section}>
                    <h3 style={styles.sectionTitle}>Respiratory</h3>
                    <div style={styles.subsection}>
                        <h4 style={styles.subsectionTitle}>Lung Capacity</h4>
                        <div style={styles.metricCard}>
                            <p>{patient.respiratory.lungCapacity}</p>
                        </div>
                    </div>
                    <div style={styles.subsection}>
                        <h4 style={styles.subsectionTitle}>Respiratory Rate</h4>
                        <div style={styles.metricCard}>
                            <p>{patient.respiratory.respiratoryRate}</p>
                        </div>
                    </div>
                    <div style={styles.subsection}>
                        <h4 style={styles.subsectionTitle}>Spirometry</h4>
                        <div style={styles.metricCard}>
                            <p>{patient.respiratory.spirometry}</p>
                        </div>
                    </div>
                    <div style={styles.subsection}>
                        <h4 style={styles.subsectionTitle}>Chest X-Ray</h4>
                        <div style={styles.metricCard}>
                            <p>{patient.respiratory.chestXRay}</p>
                        </div>
                    </div>
                </div>

                {/* Metabolic */}
                <div style={styles.section}>
                    <h3 style={styles.sectionTitle}>Metabolic</h3>
                    <div style={styles.subsection}>
                        <h4 style={styles.subsectionTitle}>Liver Function</h4>
                        <div style={styles.metricCard}>
                            <p><strong>ALT:</strong> {patient.metabolic.liverFunction.alt}</p>
                            <p><strong>AST:</strong> {patient.metabolic.liverFunction.ast}</p>
                            <p><strong>Bilirubin:</strong> {patient.metabolic.liverFunction.bilirubin}</p>
                        </div>
                    </div>
                    <div style={styles.subsection}>
                        <h4 style={styles.subsectionTitle}>Kidney Function</h4>
                        <div style={styles.metricCard}>
                            <p><strong>Creatinine:</strong> {patient.metabolic.kidneyFunction.creatinine}</p>
                            <p><strong>BUN:</strong> {patient.metabolic.kidneyFunction.bun}</p>
                            <p><strong>GFR:</strong> {patient.metabolic.kidneyFunction.gfr}</p>
                        </div>
                    </div>
                    <div style={styles.subsection}>
                        <h4 style={styles.subsectionTitle}>Thyroid</h4>
                        <div style={styles.metricCard}>
                            <p><strong>TSH:</strong> {patient.metabolic.thyroid.tsh}</p>
                            <p><strong>T4:</strong> {patient.metabolic.thyroid.t4}</p>
                        </div>
                    </div>
                </div>

                {/* Immunology */}
                <div style={styles.section}>
                    <h3 style={styles.sectionTitle}>Immunology</h3>
                    <div style={styles.metricCard}>
                        <p><strong>White Blood Cells:</strong> {patient.immunology.whiteBloodCells}</p>
                        <p><strong>Neutrophils:</strong> {patient.immunology.neutrophils}</p>
                        <p><strong>Lymphocytes:</strong> {patient.immunology.lymphocytes}</p>
                        <p><strong>Eosinophils:</strong> {patient.immunology.eosinophils}</p>
                    </div>
                </div>
            </div>
        </Layout>
    );
};

export default HealthMetricsPage;