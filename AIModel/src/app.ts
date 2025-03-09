import express from "express";
import dotenv from "dotenv";
import cors from "cors";
import run from "./extractor";
dotenv.config();

const app = express();
const port = 3000;

// Middleware
app.use(express.json());
app.use(cors());

// API Route
app.post("/extract", async (req, res) => {
  const { text } = req.body;

  if (!text) {
    return res.status(400).json({ error: "Text input is required" });
  }

  const extractedData = await run(text);
  res.json(extractedData);
});

app.listen(port, () => {
  console.log(`🚀 Server running on http://localhost:${port}`);
});
