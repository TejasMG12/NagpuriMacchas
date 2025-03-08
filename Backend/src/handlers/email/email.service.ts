import nodemailer from 'nodemailer';
import dotenv from 'dotenv';
import path from 'path';
import multer, { StorageEngine } from "multer";
import { Request } from "express";


const storage: StorageEngine = multer.diskStorage({
    destination: (req: Request, file: Express.Multer.File, cb: (error: Error | null, destination: string) => void) => {
        cb(null, "uploads/");
    },
    filename: (req: Request, file: Express.Multer.File, cb: (error: Error | null, filename: string) => void) => {
        const uniqueSuffix = Date.now() + "-" + Math.round(Math.random() * 1e9);
        cb(null, file.fieldname + "-" + uniqueSuffix + path.extname(file.originalname));
    },
});


// const fileFilter = (req: Request, file: Express.Multer.File, cb: (error: Error | null, acceptFile: boolean) => void) => {
//     if (file.mimetype.startsWith("image/")) {
//         cb(null, true);
//     } else {
//         cb(new Error("Invalid file type. Only images are allowed."), false);
//     }
// };


export const uploadFile = multer({
    storage
});


dotenv.config();

// Transporter Configuration
const transporter = nodemailer.createTransport({
    host: process.env.SMTP_HOST,
    port: Number(process.env.SMTP_PORT) || 587,
    secure: process.env.SMTP_SECURE === 'true', // true for 465, false for other ports
    auth: {
        user: process.env.SMTP_USER,
        pass: process.env.SMTP_PASS,
    },
});

// Email Sending Function with Attachment
export const sendEmail = async (
    to: string,
    subject: string,
    text: string,
    attachmentPath?: string
): Promise<void> => {
    try {
        const mailOptions = {
            from: process.env.SMTP_FROM || 'no-reply@example.com',
            to,
            subject,
            text,
            html:`<html>
<head>
    <title>Meeting Request with Patient</title>
    <style>
        body {
            font-family: Arial, sans-serif;
            background-color: #f9f9f9;
            margin: 0;
            padding: 20px;
        }
        .container {
            background-color: #ffffff;
            border: 2px solid #4CAF50;
            border-radius: 12px;
            padding: 20px;
            max-width: 600px;
            margin: 0 auto;
            box-shadow: 0 4px 8px rgba(0, 0, 0, 0.1);
        }
        h2 {
            color: #4CAF50;
            text-align: center;
        }
        .content {
            margin-top: 10px;
            line-height: 1.6;
        }
        .footer {
            margin-top: 20px;
            text-align: center;
            color: #777;
            font-size: 14px;
        }
    </style>
</head>
<body>
    <div class="container">
        <h2>${subject}</h2>
        <div class="content">
            <p>Dear Dr. Chetali ,</p>
            <p>We kindly request your presence for a scheduled meeting with your patient, <strong>[Patient's Name]</strong>. The meeting is set to discuss their recent health concerns and ongoing treatment.</p>
            <p><strong>${text}</strong></p>
            <br>
            <p>Your expertise and insights would be greatly appreciated to guide the patient effectively. Kindly confirm your availability at your earliest convenience.</p>
            <p>Thank you for your time and dedication to patient care.</p>
            <p>Best regards,</p>
            <p><strong>SwasthyaAI</strong></p>
        </div>
        <div class="footer">
            For any queries, please contact us at <a href="mailto:tejasgampawar@gmail.com">tejasgampawar@gmail.com</a> .
        </div>
    </div>
</body>
</html>
`, // Optional: HTML email body for better formatting
            attachments: attachmentPath ? [{
                filename: path.basename(attachmentPath),
                path: attachmentPath
            }] : []
        };

        const info = await transporter.sendMail(mailOptions);
        console.log(`Email sent: ${info.messageId}`);
    } catch (error) {
        console.error('Error sending email:', error);
        throw new Error('Failed to send email.');
    }
};
