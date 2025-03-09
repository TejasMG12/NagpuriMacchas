# Backend API Documentation

## Overview

This backend provides APIs for user authentication, profile management, and AI-based symptom analysis. Below is a detailed description of each API endpoint, including request and response formats.

---

## **Authentication APIs**

### **1. User Signup**

**Endpoint:** `POST /auth/signup`

**Request Body:**

```json
{
  "name": "Tejas gampawar",
  "email": "tejas@gmail.com",
  "password": "Password",
  "location": "Manewada, Nagpur",
  "age": 25,
  "gender": "Male"
}
```

**Response:**

```json
{
  "message": "Signup successful",
  "token": "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VySWQiOiJjZTliZmRjMC03YzlhLTQyZmYtYjNkYS0yMGUzYjI2NGJmMTkiLCJlbWFpbCI6InRlamFzQGdtYWlsLmNvbSIsImlhdCI6MTc0MTQ0MDcyMSwiZXhwIjoxNzQyMDQ1NTIxfQ.1UU5B289iwrbMbMzc3lX0MPUDHxS2tzmfFt3C-_lffE",
  "user": {
    "name": "Tejas gampawar",
    "email": "tejas@gmail.com",
    "password": "$2b$10$VwjuoBVkSekO3cJGE2eDlelRDFyOO4wlIvKy6iUyAeyG3Lsnv2.gG",
    "location": "Manewada, Nagpur",
    "age": 12,
    "gender": "Male",
    "medicalHistory": {
      "allergies": [],
      "chronicDiseases": [],
      "medications": []
    },
    "healthGoals": [],
    "_id": "ce9bfdc0-7c9a-42ff-b3da-20e3b264bf19",
    "createdAt": "2025-03-08T13:32:01.201Z",
    "updatedAt": "2025-03-08T13:32:01.201Z",
    "__v": 0
  }
}
```

---

### **2. User Signin**

**Endpoint:** `POST /auth/signin`

**Request Body:**

```json
{
  "email": "tejas@gmail.com",
  "password": "Password"
}
```

**Response:**

```json
{
  "message": "Login successful",
  "token": "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VySWQiOiJjZTliZmRjMC03YzlhLTQyZmYtYjNkYS0yMGUzYjI2NGJmMTkiLCJlbWFpbCI6InRlamFzQGdtYWlsLmNvbSIsImlhdCI6MTc0MTQ0MDcyNywiZXhwIjoxNzQyMDQ1NTI3fQ.rp6Y0NuUAoFvNnJSA1ZwxVz32BgkuHA5mvhiO3PecSQ",
  "user": {
    "medicalHistory": {
      "allergies": [],
      "chronicDiseases": [],
      "medications": []
    },
    "_id": "ce9bfdc0-7c9a-42ff-b3da-20e3b264bf19",
    "name": "Tejas gampawar",
    "email": "tejas@gmail.com",
    "password": "$2b$10$VwjuoBVkSekO3cJGE2eDlelRDFyOO4wlIvKy6iUyAeyG3Lsnv2.gG",
    "age": 12,
    "gender": "Male",
    "location": "Manewada, Nagpur",
    "healthGoals": [],
    "createdAt": "2025-03-08T13:32:01.201Z",
    "updatedAt": "2025-03-08T13:32:01.201Z",
    "__v": 0
  }
}
```

---

## **AI Symptom Analyzer APIs**

### **3. First-Time Query (Start Symptom Analysis)**

**Endpoint:** `POST /doctor/firsttime`

**Request Body:**

```json
{
  "email": "tejas@gmail.com",
  "qtype": "doctor/remedy/describe/default"
}
```

**Response:**

```json
{
  "suggestedReplys": ["Yes", "No", "Sometimes"],
  "question": {
    "question": "Do you have a fever?",
    "type": "mcq",
    "options": ["Yes", "No", "Sometimes"]
  },
  "map": {
    "description": "These are the doctors near you",
    "query": "doctors near me in Manewada nagpur"
  },
  "textMessage": "Let's start by analyzing your symptoms."
}
```

---

### **4. Answer Query (Continue Symptom Analysis)**

**Endpoint:** `POST /doctor/answer`

**Request Body:**

```json
{
  "email": "tejas@gmail.com",
  "message": "fever"
}
```

**Response:**

```json
{
  "suggestedReplys": ["Mild", "Moderate", "Severe"],
  "question": {
    "question": "How severe is your fever?",
    "type": "mcq",
    "options": ["Mild", "Moderate", "Severe"]
  },
  "map": {
    "description": "These are the doctors near you",
    "query": "doctors near me in Manewada nagpur"
  },
  "textMessage": "Understanding your condition further..."
}
```

---

## **User Profile APIs**

### **5. Get User Profile**

**Endpoint:** `GET /profile/:email`

**Example Request:**

```http
GET http://localhost:5000/profile/tejas@gmail.com
```

**Response:**

```json
{
  "profile": {
    "medicalHistory": {
      "allergies": ["asthama"],
      "chronicDiseases": ["xyz"],
      "medications": ["abc"]
    },
    "_id": "ce9bfdc0-7c9a-42ff-b3da-20e3b264bf19",
    "name": "Tejas gampawar",
    "email": "tejas@gmail.com",
    "age": 12,
    "gender": "Male",
    "healthGoals": ["Want to gain weight"],
    "createdAt": "2025-03-08T13:32:01.201Z",
    "updatedAt": "2025-03-08T13:33:00.664Z",
    "__v": 0
  }
}
```

---

### **6. Update User Profile**

**Endpoint:** `POST /profile/:email`

**Request Body:**

```json
{
  "medicalHistory": {
    "allergies": ["asthama"],
    "chronicDiseases": ["xyz"],
    "medications": ["abc"]
  },
  "healthGoals": ["Want to gain weight"]
}
```

**Response:**

```json
{
  "message": "Profile updated",
  "profile": {
    "medicalHistory": {
      "allergies": ["asthama"],
      "chronicDiseases": ["xyz"],
      "medications": ["abc"]
    },
    "_id": "ce9bfdc0-7c9a-42ff-b3da-20e3b264bf19",
    "name": "Tejas gampawar",
    "email": "tejas@gmail.com",
    "password": "$2b$10$VwjuoBVkSekO3cJGE2eDlelRDFyOO4wlIvKy6iUyAeyG3Lsnv2.gG",
    "age": 12,
    "gender": "Male",
    "healthGoals": ["Want to gain weight"],
    "createdAt": "2025-03-08T13:32:01.201Z",
    "updatedAt": "2025-03-08T13:33:00.664Z",
    "__v": 0
  }
}
```

---

### **7. Delete User Profile**

**Endpoint:** `DELETE /:email`

**Example Request:**

```http
DELETE /john@example.com
```

**Response:**

```json
{
  "message": "User profile deleted successfully."
}
```

---
