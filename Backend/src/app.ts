import express from 'express';
import cors from "cors";
import bodyParser from 'body-parser';
import session from 'express-session';
import { ChatSession } from '@google/generative-ai';
import mongoose from 'mongoose';
import { configDotenv } from "dotenv";
import { Request, Response } from 'express';
configDotenv();

mongoose.connect(process.env.MONGO_URI)
  .then(async () => {
    console.log("Connected to MongoDB");

  })
  .catch(err => console.error("MongoDB Connection Error:", err));

const app = express();
const port = 5000;

app.use(
  session({
    secret: process.env.SESSION_SECRET,
    resave: false,
    saveUninitialized: true,
    cookie: { secure: false },
  })
);

app.use(bodyParser.json());
app.use(cors());
app.use(express.json());

export const userSessions: { [key: string]: ChatSession } = {};



app.get('/', (_req, res) => {
  res.send('Server is running.....');
});

app.listen(port, () => {
  return console.log(`Express is listening at http://localhost:${port}`);
});

app.post('/doctor/firsttime', (req, res) => {
  const { userId, qtype } = req.body;
  console.log({ userId, qtype });
  let message = 'How can we help you today?';
  if (qtype == "remedy") {
    message = 'What remdey would you like to know?';
  }
  else if (qtype == "doctor") {
    message = 'What kind of doctor are you looking for?';
  }
  else if (qtype == "describe") {
    message = 'How you feeling today?';
  }
  res.json({
    type: 'textMessage',
    textMessage: message,
    question: {},
    map: {}
  })
});

let ind = 0;
const result = [
  {
    textMessage: ' Hello! How can I assist you today?',
    question: {},
    map: {}
  },
  {
    textMessage: null,
    question: {
      type: "mcq",
      question: "Got it. Is your headache mild, moderate, or severe?",
      options: ["Mild", "Moderate", "Severe"]
    },
    map: {}
  },
  {
    textMessage: null,
    question: {
      type: "msq",
      question: "Thanks for sharing. Do you also have any of the following symptoms? (Select all that apply)",
      options: ["Nausea", "Dizziness", "Sensitivity to light/sound", "Fever", "None of these"]
    },
    map: {}
  },
  {
    textMessage: null,
    question: {
      type: "mcq",
      question: "Understood. Have you been sleeping well and staying hydrated lately?",
      options: ["Yes, I've been drinking enough water and sleeping well.", "No, I haven't been drinking much water.", "No, my sleep schedule has been messed up.", "Both - I'm dehydrated and not sleeping well."]
    },
    map: {}
  },
  {
    textMessage: `That could be a major cause! Dehydration and lack of sleep often lead to headaches. Based on your symptoms, here are some suggestions:
💡 Natural Remedies:

Drink at least 2-3 glasses of water now and continue hydrating throughout the day.
Rest in a quiet, dark room to reduce sensitivity to light.
Try a gentle head massage or deep breathing exercises to relieve tension.
💊 Possible Conditions:
Your symptoms might indicate dehydration headache or tension headache. If it persists or worsens, consider consulting a doctor.

🚑 When to Seek Medical Help:
If you experience severe dizziness, vision problems, or vomiting, visit a doctor immediately.`,
    question: {
      type: "mcq",
      question: "Would you like to find nearby doctors or pharmacies?",
      options: ["Yes, show me doctors.", " No, I'll try the remedies first."]
    },
    map: {}
  },
  {
    textMessage: "Great! I hope you feel better soon. I’ll send you a reminder to drink water in 30 minutes. Let me know if your symptoms change! 😊",
    question: {},
    map: {}
  },
];
app.post('/doctor/answer', (req: Request, res: Response) => {
  const { userId, answer } = req.body;
  console.log({ userId, answer });

  res.json(result[ind % 6]);
  ind += 1;

});

