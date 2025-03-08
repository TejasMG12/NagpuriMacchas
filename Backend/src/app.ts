import express from 'express';
import cors from "cors";
import bodyParser from 'body-parser';
import session from 'express-session';
import { ChatSession } from '@google/generative-ai';
import mongoose from 'mongoose';
import { configDotenv } from "dotenv";
import authRoutes from './routes/auth.routes';
import profileRoutes from './routes/profile.routes';
import doctorRoutes from './routes/doctor.routes';
import puppeteer from 'puppeteer';
// import UserProfile from './models/profile.model';
configDotenv();

mongoose.connect(process.env.MONGO_URI)
  .then(async () => {
    console.log("Connected to MongoDB");
    // try {
    //   await UserProfile.deleteMany({});
    //   console.log("All user profiles deleted successfully.");
    // } catch (error) {
    //   console.error("Error deleting user profiles:", error);
    // }
  })
  .catch((err) => console.error("MongoDB connection error:", err));

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

app.use("/auth", authRoutes);
app.use("/profile", profileRoutes);
app.use("/doctor", doctorRoutes);

app.post('/api/scrape', async (req, res) => {
  const query = req.body.query || 'doctors near me';

  const browser = await puppeteer.launch({ headless: true });
  const page = await browser.newPage();
  await page.goto(`https://www.google.com/maps/search/${encodeURIComponent(query)}`);

  await page.waitForSelector('.Nv2PK');

  const results = await page.evaluate(() => {
    const data: Array<Record<string, string>> = [];
    const elements = document.querySelectorAll('.Nv2PK');

    elements.forEach(el => {
      const name = (el.querySelector('.qBF1Pd') as HTMLElement)?.innerText || 'N/A';
      const rating = (el.querySelector('.MW4etd') as HTMLElement)?.innerText || 'N/A';
      const reviews = (el.querySelector('.UY7F9') as HTMLElement)?.innerText || 'N/A';
      const specialization = (el.querySelectorAll('.W4Efsd')[0] as HTMLElement)?.innerText || 'N/A';
      const address = (el.querySelectorAll('.W4Efsd')[1] as HTMLElement)?.innerText || 'N/A';
      const profileLink = (el.querySelector('a') as HTMLAnchorElement)?.href || 'N/A';

      data.push({
        name,
        rating,
        reviews,
        specialization,
        address,
        profileLink
      });
    });

    return data;
  });

  await browser.close();

  res.json(results);
});


// app.post('/doctor/firsttime', (req, res) => {
//   const { userId, qtype } = req.body;
//   console.log({ userId, qtype });
//   let message = 'How can we help you today?';
//   if (qtype == "remedy") {
//     message = 'What remdey would you like to know?';
//   }
//   else if (qtype == "doctor") {
//     message = 'What kind of doctor are you looking for?';
//   }
//   else if (qtype == "describe") {
//     message = 'How you feeling today?';
//   }
//   res.json({
//     type: 'textMessage',
//     textMessage: message,
//     question: {},
//     map: {}
//   })
// });
// let ind = 0;
// const result = [
//   {
//     textMessage: ' Hello! How can I assist you today?',
//   },
//   {
//     question: {
//       type: "mcq",
//       question: "Got it. Is your headache mild, moderate, or severe?",
//       options: ["Mild", "Moderate", "Severe"]
//     },
//   },
//   {
//     question: {
//       type: "msq",
//       question: "Thanks for sharing. Do you also have any of the following symptoms? (Select all that apply)",
//       options: ["Nausea", "Dizziness", "Sensitivity to light/sound", "Fever", "None of these"]
//     }
//   },
//   {
//     question: {
//       type: "mcq",
//       question: "Understood. Have you been sleeping well and staying hydrated lately?",
//       options: ["Yes, I've been drinking enough water and sleeping well.", "No, I haven't been drinking much water.", "No, my sleep schedule has been messed up.", "Both - I'm dehydrated and not sleeping well."]
//     }
//   },
//   {
//     textMessage: `That could be a major cause! Dehydration and lack of sleep often lead to headaches. Based on your symptoms, here are some suggestions:
// 💡 Natural Remedies:
// Drink at least 2-3 glasses of water now and continue hydrating throughout the day.
// Rest in a quiet, dark room to reduce sensitivity to light.
// Try a gentle head massage or deep breathing exercises to relieve tension.
// 💊 Possible Conditions:
// Your symptoms might indicate dehydration headache or tension headache. If it persists or worsens, consider consulting a doctor.
// 🚑 When to Seek Medical Help:
// If you experience severe dizziness, vision problems, or vomiting, visit a doctor immediately.`,
//     question: {
//       type: "mcq",
//       question: "Would you like to find nearby doctors or pharmacies?",
//       options: ["Yes, show me doctors.", " No, I'll try the remedies first."]
//     }
//   },
//   {
//     textMessage: "Great! I hope you feel better soon. I’ll send you a reminder to drink water in 30 minutes. Let me know if your symptoms change! 😊"
//   },
// ];
// app.post('/doctor/answer', (req: Request, res: Response) => {
//   const { userId, answer } = req.body;
//   console.log({ userId, answer });
//   res.json(result[ind % 6]);
//   ind += 1;
// });

