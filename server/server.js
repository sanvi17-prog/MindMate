const express = require("express");
const cors = require("cors");
require("dotenv").config();
const { GoogleGenAI } = require("@google/genai");
const app = express();

const PORT = process.env.PORT || 5000;
const ai = new GoogleGenAI({
  apiKey: process.env.GEMINI_API_KEY,
});
// Middleware
app.use(cors());
app.use(express.json());

// Test route
app.get("/", (req, res) => {
  res.json({
    message: "MindMate backend is running! 🧠",
  });
});

// AI Mood Analysis
app.post("/api/mood/analyze", async (req, res) => {
  const { mood, journal } = req.body;

  if (!mood || !journal) {
    return res.status(400).json({
      success: false,
      message: "Mood and journal are required.",
    });
  }

  try {
    const prompt = `
You are MindMate, a supportive wellness companion.

The user selected this mood:
${mood}

The user wrote:
"${journal}"

Analyze the user's check-in in a supportive and non-judgmental way.

Return ONLY valid JSON in this exact structure:

{
  "emotion": "string",
  "intensity": "Low | Moderate | High",
  "possibleTrigger": "string",
  "insight": "string",
  "suggestions": [
    "string",
    "string",
    "string"
  ],
  "resetActivity": {
    "title": "string",
    "duration": "2 minutes",
    "instructions": "string"
  }
}

Important:
- Do not diagnose any mental health condition.
- Do not claim certainty about the user's emotional state.
- Give general wellness suggestions only.
- Keep suggestions practical and safe.
- Include one simple 2-minute wellness reset activity.
- The activity may involve breathing, gentle movement, grounding, hydration, or a short screen break.
- Keep it suitable for a general audience.
- Do not recommend medication or medical treatment.
- Do not diagnose the user.
`;

   const interaction = await ai.interactions.create({
  model: "gemini-3.6-flash",
  input: prompt,
  response_format: {
    type: "text",
    mime_type: "application/json",
  },
});

const analysis = JSON.parse(interaction.output_text);
    res.json({
      success: true,
      data: analysis,
    });

  } catch (error) {
    console.error("AI analysis error:", error);

    res.status(500).json({
      success: false,
      message: "Unable to analyze the mood right now.",
    });
  }
});

// Start server
app.listen(PORT, () => {
  console.log(`MindMate server running on http://localhost:${PORT}`);
});

