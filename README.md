
# Define 3.0
The official template repository for Define 3.0

![DefineHack 2025 Logo](https://github.com/user-attachments/assets/8173bc16-418e-4912-b500-c6427e4ba4b6)



# SwasthyaAI
 ![SwasthyaAI 2025 Logo](https://raw.githubusercontent.com/TejasMG12/NagpuriMacchas/main/Assets/logo.svg)


### Team Information
- **Team Name**: NagpuriMacchas 
- **Track**: AI in Ayush

### Team Members
| Name | Role | GitHub | LinkedIn |
|------|------|--------|----------|
|Tejas Gampawar |Backend and AI Integration  | [@TejasMG12](https://github.com/TejasMG12) | [Tejas Gampawar](https://www.linkedin.com/in/tejas-gampawar-463129258) |
|Priyanshu Kumar |Backend and Frontend Integration  | [@priyanshu0463](https://github.com/priyanshu0463) | [Priyanshu Kumar](https://www.linkedin.com/in/priyanshukp0463/) |
|Chetali Beniwal |UI/UX Design and Frontend Integration | [@chetali-beniwal](https://github.com/chetali-beniwal) | [Chetali Beniwal](https://www.linkedin.com/in/chetali-beniwal/) |


## Project Details

### Overview
SwasthyaAI, an AI-powered health platform that analyses symptoms and provides personalised AYUSH-based remedies, lifestyle suggestions, and medical guidance to promote natural and healthy living.
### Problem Statement
Many people rely excessively on pharmaceuticals, neglecting traditional and holistic healing methods. This over-dependence weakens the body's natural functions and leads to long-term medication use, especially among the elderly. There is a lack of AI-powered healthcare systems that integrate traditional medicine (AYUSH) with modern diagnostics to provide personalized, natural remedies while ensuring timely medical intervention. Our solution aims to bridge this gap by leveraging AI to recommend holistic treatments, promote preventive care, and align with SDG Goal 3: Good Health & Well-being.
### Solution
SwasthyaAI analyzes symptoms, refines diagnoses through user inputs, and suggests natural remedies, diet, and lifestyle changes for mild conditions. It recommends medical consultation for severe cases, identifying the right specialist. With real-time location services, users can find nearby doctors, clinics, and pharmacies. A personalized health profile stores medical history, allergies, and conditions, providing tailored health advice.

### Demo
[![Project Demo](https://img.youtube.com/vi/VIDEO_ID/0.jpg)](https://www.youtube.com/watch?v=VIDEO_ID)
_Replace VIDEO_ID with your YouTube video ID or provide an alternative demo link_

### Live Project
[Project Name](https://your-project-url.com)

## Technical Implementation

### Technologies Used
- **Frontend**: Next.js, TailwindCSS
- **Backend**: Node.js, Express.js
- **Database**: MongoDB
- **APIs**: Google maps (real-time location services for nearby doctors and pharmacies)
- **AI-Models**: Gemini(For natural remedy recommendations), SendGrid(email services)


### Key Features
- AI-Powered Symptom Analysis – Identifies possible conditions based on user inputs.
- Interactive Questioning – Asks follow-up questions for accurate diagnosis.
- Natural Remedies & Lifestyle Advice – Suggests AYUSH-backed treatments for mild symptoms.
- Doctor & Specialist Recommendation – Advises professional consultation for severe cases and finds nearby doctors, clinics, and pharmacies.
- EDoctor - Online appointment with available Doctors.
- Personalized Health Profile – Stores medical history, allergies, and health conditions.

## Setup Instructions

### Prerequisites
- Gemini API Key
- SendGrid API Key
- MongoDB Cluster

### Installation 
- Clone the repository:
```bash
git clone git@github.com:TejasMG12/NagpuriMacchas.git
```


### Running the Project
1. Backend setup:
```bash
cd Backend
npm install
npm run start
```
2. Frontend setup(In another terminal):
```bash
cd Frontend
npm install
npm run dev
```

## Additional Resources

### **Project Timeline**  
1. **Design:** Plan features and create a user-friendly UI/UX design in Figma.  
2. **Development:** Start building the frontend and backend.  
3. **Testing:** Use Postman and other tools to test API functionality.  
4. **Microservices:** Develop independent services for email notifications, Google Maps integration, profile management, and database handling.  
5. **Integration:** Connect the frontend with the backend for a seamless user experience.  
6. **Research & Dataset:** Develop a method to create an AYUSH-based dataset for natural remedies and health recommendations.  

### **Challenges Faced**  
1. **Email Service:** Unable to verify our SendGrid account, which blocked email integration.  
2. **LLM Limitations:** Couldn’t download the required Medical LLM for fine-tuning due to limited resources.  
3. **NLP Challenges:** Faced time constraints in developing an NLP model for dataset creation.

### **Future Enhancements**  

- **Mobile App:** Develop a mobile application for better accessibility and daily health notifications.  
- **Custom AI Model:** Instead of relying on expensive general-purpose models, we plan to build an LLM specifically designed for our platform.  
- **Personalized Health Insights:** Improve personalization by continuously learning from users’ health history, lifestyle, and feedback to provide better recommendations.  
- **Wearable Integration:** Connect with smart devices to enable real-time health tracking and early risk detection.  
- **AI-Powered Health Ecosystem:** Create a smart, AI-driven platform where users can manage their health, receive personalized advice, and access the right care at the right time.


### Submission Checklist
- [x] Completed all sections of this README
- [ ] Added project demo video
- [ ] Provided live project link
- [x] Ensured all team members are listed
- [x] Included setup instructions
- [x] Submitted final code to repository

---

© Define 3.0 | [Define 3.0](https://www.define3.xyz/)
