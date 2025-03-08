import { sendEmail } from "../handlers/email/email.service";
import path from 'path';
import { Request, Response } from "express";
// import fs from 'fs/promises';

// async function notifyUser() {
//     await sendEmail(
//         'user@example.com',
//         'Welcome to Our Platform!',
//         'Thank you for signing up!',
//         '<h1>Welcome to Our Platform!</h1><p>We are glad to have you onboard.</p>'
//     );
// }

export const sendEmailC = async (req: Request, res: Response): Promise<void> => {
    const { email, subject, message } = req.body;

    try {
        const filePath = req.file 
            ? path.join(__dirname, '../..', 'uploads', req.file.filename) 
            : undefined;

        console.log(`Attachment path: ${filePath}`);

        await sendEmail(
            email,
            subject,
            message,
            filePath
        );

        res.status(200).json({ success: true, message: 'Email sent successfully!' });
    } catch (error) {
        console.error("Error sending email:", error);
        res.status(500).json({ error: "Failed to send email." });
    }
};

