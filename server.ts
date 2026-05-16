import express, { Request, Response } from "express";
import path from "path";
import { createServer as createViteServer } from "vite";
import { GoogleGenAI } from "@google/genai";
import dotenv from "dotenv";

dotenv.config();

const app = express();
const PORT = 3000;

app.use(express.json());

// Lazy-initialized Gemini API
const ai = process.env.GEMINI_API_KEY ? new GoogleGenAI({ 
  apiKey: process.env.GEMINI_API_KEY,
  httpOptions: { headers: { 'User-Agent': 'aistudio-build' } }
}) : null;

// API Routes
app.post("/api/ai/generate", async (req: Request, res: Response) => {
  if (!ai) {
    return res.status(500).json({ error: "Gemini API key is not configured." });
  }

  const { prompt, systemPrompt } = req.body;

  try {
    const response = await ai.models.generateContent({
      model: "gemini-3-flash-preview",
      contents: systemPrompt ? `${systemPrompt}\n\nUser Request: ${prompt}` : prompt,
    });
    res.json({ text: response.text });
  } catch (error: any) {
    console.error("Gemini Error:", error);
    res.status(500).json({ error: error.message || "Failed to generate AI response." });
  }
});

// Mock Professor Matching API
app.post("/api/ai/match", async (req: Request, res: Response) => {
    if (!ai) return res.status(500).json({ error: "Gemini API key not configured" });
    
    const { profile, internship } = req.body;
    const systemPrompt = "You are an elite research mentor at an IIT. Analyze the student profile and the research internship opportunity. Provide a match score (0-100), key alignment points, and recommended skills to bridge the gap. Format as JSON: { \"score\": number, \"analysis\": string, \"missingSkills\": string[] }";
    const prompt = `Student Profile: ${JSON.stringify(profile)}\n\nInternship: ${JSON.stringify(internship)}`;

    try {
        const response = await ai.models.generateContent({
            model: "gemini-3-flash-preview",
            contents: `${systemPrompt}\n\n${prompt}`,
            config: { responseMimeType: "application/json" }
        });
        res.json(JSON.parse(response.text || "{}"));
    } catch (error: any) {
        res.status(500).json({ error: error.message });
    }
});

async function startServer() {
  if (process.env.NODE_ENV !== "production") {
    const vite = await createViteServer({
      server: { middlewareMode: true },
      appType: "spa",
    });
    app.use(vite.middlewares);
  } else {
    const distPath = path.join(process.cwd(), "dist");
    app.use(express.static(distPath));
    app.get("*", (req, res) => {
      res.sendFile(path.join(distPath, "index.html"));
    });
  }

  app.listen(PORT, "0.0.0.0", () => {
    console.log(`Server running on http://localhost:${PORT}`);
  });
}

startServer();
