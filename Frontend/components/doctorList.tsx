import React, { useEffect, useState } from "react";

const DoctorList = ({ data }) => {
    const [doctors, setDoctors] = useState([]);

    useEffect(() => {
        if (data?.map?.query) {
            fetch("http://localhost:5000/api/scrape", {
                method: "POST",
                headers: {
                    "Content-Type": "application/json",
                },
                body: JSON.stringify({ query: data.map.query }),
            })
                .then((response) => response.json())
                .then((result) => setDoctors(result))
                .catch((error) => console.error("Error fetching data:", error));
        }
    }, [data]);

    return (
        <div style={styles.container}>
            {data?.question?.question && (
                <div style={styles.questionBox}>
                    <p>{data.question.question}</p>
                </div>
            )}

            {data?.map?.description && (
                <div style={styles.descriptionBox}>
                    <p>{data.map.description}</p>
                </div>
            )}

            {doctors.length > 0 && <h2 style={styles.heading}>Results..</h2>}

            {doctors.map((doctor, index) => (
                <div key={index} style={styles.card}>
                    <h3 style={styles.cardTitle}>{doctor.name}</h3>
                    <p style={styles.cardText}>⭐ {doctor.rating} {doctor.reviews}</p>
                    <p style={styles.cardText}>{doctor.specialization}</p>
                    <p style={styles.cardText}>{doctor.address}</p>
                    <a 
                        href={doctor.profileLink} 
                        target="_blank" 
                        rel="noopener noreferrer" 
                        style={styles.mapLink}
                    >
                        Open in Maps 🔗
                    </a>
                </div>
            ))}
        </div>
    );
};

// Inline Styles
const styles = {
    container: {
        maxWidth: "600px",
        margin: "auto",
        background: "#f9f9f9",
        padding: "20px",
        borderRadius: "10px",
        fontFamily: "Arial, sans-serif"
    },
    questionBox: {
        background: "#f1f1f1",
        padding: "12px",
        borderLeft: "4px solid #007bff",
        borderRadius: "5px",
        marginBottom: "10px",
        fontSize: "16px"
    },
    descriptionBox: {
        background: "#dff0d8",
        padding: "12px",
        borderLeft: "4px solid #28a745",
        borderRadius: "5px",
        marginBottom: "10px",
        fontSize: "16px"
    },
    heading: {
        marginTop: "15px",
        fontSize: "20px"
    },
    card: {
        background: "white",
        padding: "15px",
        margin: "10px 0",
        borderRadius: "10px",
        boxShadow: "0px 2px 5px rgba(0, 0, 0, 0.1)"
    },
    cardTitle: {
        margin: "0",
        fontSize: "18px"
    },
    cardText: {
        fontSize: "14px",
        margin: "5px 0",
        color: "#555"
    },
    mapLink: {
        display: "inline-block",
        padding: "8px 10px",
        background: "#007bff",
        color: "white",
        textDecoration: "none",
        borderRadius: "5px",
        marginTop: "5px"
    },
    mapLinkHover: {
        background: "#0056b3"
    }
};

export default DoctorList;
