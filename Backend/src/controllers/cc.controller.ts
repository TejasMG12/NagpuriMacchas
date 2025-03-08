import { userSessions } from "../app";
import { model, queryConfig } from "../handlers/gpt/gemini.service";
import { Request, Response } from "express";

export const defaultProfile = {
    "personal_info": {
        "name": "Rahul Sharma",
        "age": 45,
        "gender": "Male",
        "height_cm": 172,
        "weight_kg": 75,
        "blood_group": "B+"
    },
    "medical_history": {
        "existing_conditions": ["Hypertension", "Diabetes"],
        "allergies": ["Penicillin", "Peanuts"]
    },
    "health_vitals": {
        "blood_pressure": {
            "systolic": 130,
            "diastolic": 85,
            "last_checked": "2025-03-04"
        },
        "blood_sugar": {
            "fasting": 110,
            "post_meal": 150,
            "last_checked": "2025-03-03"
        },
        "heart_rate": 78,
        "sleep_hours": 6.5
    }

}

export const answer = async (req: Request, res: Response): Promise<void> => {
    const { userId, message } = req.body;
    if (!userId || !message) {
        res.status(400).json({ error: "User ID and message are required" });
        return;
    }
    if (!userSessions[userId]) {
        userSessions[userId] = model.startChat({
            history: [],
            generationConfig: queryConfig,
            systemInstruction: {
                role: "system",
                parts: [{
                    text: `User Profile: ${req.body.profile || defaultProfile} \n User wants to have a conversation about his/her health.`
                }]
            },
        });
    }
    try {
        const result = await userSessions[userId].sendMessage(message);
        const reply = result.response.text();
        res.json(JSON.parse(reply));
    } catch (error) {
        console.error("Error communicating with Gemini:", error);
        res.status(500).json({ error: "Failed to process message" });
    }
}
