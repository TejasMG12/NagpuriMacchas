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