import express from "express";
import { GoogleGenerativeAI } from "@google/generative-ai";
import User from "../models/User.js";

const router = express.Router();

router.post("/summary", async (req, res) => {
  try {
    const { userId } = req.body;

    const user = await User.findById(userId);
    if (!user) return res.status(404).json({ error: "User not found" });

    if (user.tasks.length === 0) {
      return res.json({ summary: "You have no tasks right now." });
    }

    const tasksFormatted = user.tasks
      .map(
        (t, i) =>
          `${i + 1}. ${t.title} — ${t.description || "No description"} — due ${
            t.dueDate
          } — status ${t.status}`
      )
      .join("\n");

    const genAI = new GoogleGenerativeAI(process.env.GEMINI_API_KEY);
    const model = genAI.getGenerativeModel({ model: "gemini-2.0-flash" });

    const prompt = `
Summarize the following task list in a friendly voice assistant tone:

${tasksFormatted}

Make it short, clear, and easy to read aloud.
`;

    const result = await model.generateContent(prompt);
    const summaryText = result.response
      .text()
      .replace(/```[\s\S]*?```/g, "")
      .replace(/```/g, "")
      .replace(/\*/g, "")
      .trim();

    
    res.json({ summary: summaryText });
  } catch (err) {
    console.error("Summary Error:", err);
    res.status(500).json({ error: "Failed to summarize tasks" });
  }
});

export default router;
