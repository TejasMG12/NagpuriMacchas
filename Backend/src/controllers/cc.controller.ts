import { userSessions } from "../app";
import { model, queryConfig } from "../handlers/gpt/gemini.service";
import { Request, Response } from "express";
import profileService from "../handlers/user/profile.service";

export const defaultProfile = "Unknown"

export const answer = async (req: Request, res: Response): Promise<void> => {
    const { email, message } = req.body;
    if (!email || !message) {
        res.status(400).json({ error: "User ID and message are required" });
        return;
    }
    if (!userSessions[email]) {
        userSessions[email] = model.startChat({
            history: [],
            generationConfig: queryConfig
            
        });
    }
    try {
        const result = await userSessions[email].sendMessage(message);
        const reply = result.response.text();
        res.json(JSON.parse(reply));
    } catch (error) {
        console.error("Error communicating with Gemini:", error);
        res.status(500).json({ error: "Failed to process message" });
    }
}

export const firsttime = async (req: Request, res: Response): Promise<void> => {
    const { email, qtype } = req.body;
    if (!email || !qtype) {
        res.status(400).json({ error: "Email ID and query type are required" });
        return;
    }
    const userProfile = await profileService.getProfileByEmail(email);
    console.log(userProfile);
    if (userSessions[email]) {
        delete userSessions[email];
    }
    userSessions[email] = model.startChat({
        history: [],
        generationConfig: queryConfig
    });


    let message = `User Profile: ${userProfile || defaultProfile} \n User wants to have a conversation. Find out what he/she wants and guide him/her.`;
    if (qtype == "remedy") {
        message = `User Profile: ${userProfile || defaultProfile} \nUser wants to find a remedy for something. Understand and guide him/her.`;
    }
    else if (qtype == "doctor") {
        message = `User Profile: ${userProfile || defaultProfile} \nUser wants to find a remedy for something. Understand and guide him/her.`;
    }
    else if (qtype == "describe") {
        message = `User Profile: ${userProfile || defaultProfile} \nUser wants to have a conversation about his/her health.`;
    }
    try {
        const result = await userSessions[email].sendMessage(message);
        const reply = result.response.text();
        res.json(JSON.parse(reply));
    } catch (error) {
        console.error("Error communicating with Gemini:", error);
        res.status(500).json({ error: "Failed to process message" });
    }
}
