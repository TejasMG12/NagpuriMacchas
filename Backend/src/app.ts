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
import otherRoutes from './routes/other.routes';
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

app.use('/api', otherRoutes);