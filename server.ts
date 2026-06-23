import express from "express";
import path from "path";
import { createServer as createViteServer } from "vite";
import { GoogleGenAI } from "@google/genai";
import dotenv from "dotenv";

dotenv.config();

const app = express();
const PORT = 3000;

app.use(express.json());

// Lazy-loaded Gemini AI client to prevent startup crashes when API key is not set
let aiClient: GoogleGenAI | null = null;

function getGeminiClient(): GoogleGenAI | null {
  if (aiClient) return aiClient;
  const apiKey = process.env.GEMINI_API_KEY;
  if (!apiKey || apiKey === "MY_GEMINI_API_KEY") {
    console.warn("GEMINI_API_KEY is not configured. Running in Fallback/Demo mode.");
    return null;
  }
  try {
    aiClient = new GoogleGenAI({
      apiKey: apiKey,
      httpOptions: {
        headers: {
          'User-Agent': 'aistudio-build',
        }
      }
    });
    return aiClient;
  } catch (err) {
    console.error("Failed to initialize GoogleGenAI client:", err);
    return null;
  }
}

// 1. Health Endpoint
app.get("/api/health", (req, res) => {
  res.json({ status: "ok", geminiConfigured: !!process.env.GEMINI_API_KEY });
});

// 2. Chat/Assistant Endpoint (using gemini-3.5-flash)
app.post("/api/chat", async (req, res) => {
  const { message, history = [] } = req.body;
  if (!message) {
    res.status(400).json({ error: "Message is required" });
    return;
  }

  const client = getGeminiClient();
  if (!client) {
    // Elegant fallback simulation
    setTimeout(() => {
      let reply = "";
      const lower = message.toLowerCase();
      if (lower.includes("matchmaking") || lower.includes("connect")) {
        reply = "I can help with matchmaking! Go to the **Networking** tab. Nexus Events AI compares attendees' skills, goals, and interests to suggest high-impact connections. Would you like me to find matches for you?";
      } else if (lower.includes("schedule") || lower.includes("agenda")) {
        reply = "Our schedule assistant can organize tracks. Currently, we have tracks on **AI & Machine Learning**, **Design & Frontend**, and **Foundership**. You can add new sessions dynamically or let me auto-schedule them.";
      } else if (lower.includes("create") || lower.includes("wizard")) {
        reply = "To create an event, you can use our **Event Creation Wizard** in the Dashboard. I can also generate a list of panels, workshop ideas, and keynotes if you give me a theme!";
      } else if (lower.includes("hi") || lower.includes("hello")) {
        reply = "Hello! I am your **Nexus Events AI Assistant**. I can help you build schedules, find matchmaking partners, coordinate volunteers, or brainstorm marketing strategies. Ask me anything!";
      } else {
        reply = `I am running in demo mode (Gemini API key is not set). I've received your query: "${message}". Set up a GEMINI_API_KEY in Settings > Secrets to unlock full conversational power! In the meantime, I can tell you that Nexus Events AI optimizes hackathons and events with modern UI and client-side intelligence.`;
      }
      res.json({ text: reply, isMock: true });
    }, 600);
    return;
  }

  try {
    const formattedHistory = history.map((h: { role: 'user' | 'model'; parts: { text: string }[] }) => ({
      role: h.role,
      parts: h.parts
    }));

    // Start a chat session using gemini-3.5-flash
    const chat = client.chats.create({
      model: "gemini-3.5-flash",
      config: {
        systemInstruction: "You are the primary Nexus Events AI Assistant. You help event organizers, attendees, speakers, and sponsors succeed at tech conferences and hackathons. Provide smart, concise, and helpful answers about agenda planning, attendee networking, icebreakers, event logistics, and platform guides. Keep formatting clean with markdown and clear lists. Refuse to talk about non-event topics unless they relate to tech, hackathons, or business networking.",
      }
    });

    // In @google/genai, chat.sendMessage only accepts the message parameter
    const response = await chat.sendMessage({ message });
    res.json({ text: response.text || "No response generated.", isMock: false });
  } catch (err: any) {
    console.error("Gemini API Error:", err);
    res.status(500).json({ error: err.message || "Internal server error" });
  }
});

// 3. AI Matchmaking Generator (using gemini-3.5-flash)
app.post("/api/matchmaking", async (req, res) => {
  const { userProfile, candidateProfile } = req.body;
  if (!userProfile || !candidateProfile) {
    res.status(400).json({ error: "Both userProfile and candidateProfile are required." });
    return;
  }

  const client = getGeminiClient();
  if (!client) {
    // Dynamic fallback matching logic
    const overlappingSkills = userProfile.skills.filter((s: string) => candidateProfile.skills.includes(s));
    const overlappingInterests = userProfile.interests.filter((i: string) => candidateProfile.interests.includes(i));
    
    let score = 50;
    const reasons: string[] = [];
    if (userProfile.industry === candidateProfile.industry) {
      score += 20;
      reasons.push(`Both operate in the ${userProfile.industry} industry.`);
    }
    if (overlappingSkills.length > 0) {
      score += 15;
      reasons.push(`Shared skills: ${overlappingSkills.slice(0, 2).join(", ")}.`);
    }
    if (overlappingInterests.length > 0) {
      score += 15;
      reasons.push(`Mutual interests: ${overlappingInterests.slice(0, 2).join(", ")}.`);
    }
    
    // Fill up to 3 reasons
    if (reasons.length === 0) {
      reasons.push("Complementary background & role structures.");
      reasons.push("High opportunity for mutual business networking.");
    }
    
    const icebreaker = `Hey ${candidateProfile.name}! I noticed we both are into ${userProfile.interests[0] || "technology"}. I'd love to chat about your experience in ${candidateProfile.industry} and how we can collaborate.`;
    
    res.json({
      score: Math.min(score, 98),
      matchReason: reasons,
      icebreaker: icebreaker,
      isMock: true
    });
    return;
  }

  try {
    const prompt = `Analyze these two profiles and generate event networking compatibility:
Profile A (Me):
Name: ${userProfile.name}
Role: ${userProfile.role}
Industry: ${userProfile.industry}
Skills: ${userProfile.skills.join(", ")}
Goals: ${userProfile.goals.join(", ")}
Interests: ${userProfile.interests.join(", ")}

Profile B (Candidate):
Name: ${candidateProfile.name}
Role: ${candidateProfile.role}
Industry: ${candidateProfile.industry}
Skills: ${candidateProfile.skills.join(", ")}
Goals: ${candidateProfile.goals.join(", ")}
Interests: ${candidateProfile.interests.join(", ")}

Respond with a raw JSON object matching this structure (no markdown code fences, just raw JSON):
{
  "score": <number between 1 and 100 representing networking compatibility>,
  "matchReason": [<array of 2-3 short strings describing exactly why they should connect>],
  "icebreaker": "<a personalized friendly 2-sentence icebreaker message for Profile A to send to Profile B>"
}`;

    const response = await client.models.generateContent({
      model: "gemini-3.5-flash",
      contents: prompt,
      config: {
        responseMimeType: "application/json",
      },
    });

    const parsed = JSON.parse(response.text?.trim() || "{}");
    res.json({
      score: parsed.score || 70,
      matchReason: parsed.matchReason || ["Complementary professional profiles"],
      icebreaker: parsed.icebreaker || `Hi ${candidateProfile.name}, I'd love to connect and discuss our mutual interests!`,
      isMock: false
    });
  } catch (err: any) {
    console.error("Matchmaking API error:", err);
    res.status(500).json({ error: "Failed to generate match profile metrics." });
  }
});

// 4. AI Schedule Builder / Planner (using gemini-3.5-flash)
app.post("/api/generate-schedule", async (req, res) => {
  const { eventTheme, attendeeCount, tracks } = req.body;
  if (!eventTheme) {
    res.status(400).json({ error: "Event theme is required." });
    return;
  }

  const client = getGeminiClient();
  if (!client) {
    // Return high-quality mock schedules based on theme
    const mockSessions = [
      {
        id: "gen-s1",
        eventId: "new-event",
        title: `Opening Keynote: The Future of ${eventTheme}`,
        description: `Kickstarting our event with insights into the modern landscape of ${eventTheme} and what trends to watch in 2026.`,
        speakerId: "spk-1",
        speakerName: "Dr. Elena Vance",
        startTime: "09:00 AM",
        endTime: "10:00 AM",
        track: tracks?.[0] || "General",
        location: "Grand Ballroom"
      },
      {
        id: "gen-s2",
        eventId: "new-event",
        title: `Interactive Workshop: Hands-on ${eventTheme} Blueprinting`,
        description: `An intensive session designed to map out practical workflows and solutions using cutting-edge methodologies.`,
        speakerId: "spk-2",
        speakerName: "Marcus Brody",
        startTime: "10:30 AM",
        endTime: "12:00 PM",
        track: tracks?.[0] || "General",
        location: "Hall B"
      },
      {
        id: "gen-s3",
        eventId: "new-event",
        title: `Panel Discussion: Overcoming Scalability Bottlenecks`,
        description: `Industry experts share real-world post-mortems and tips for taking ${eventTheme} products from zero to millions of users.`,
        speakerId: "spk-3",
        speakerName: "Sarah Chen",
        startTime: "01:30 PM",
        endTime: "02:30 PM",
        track: tracks?.[1] || "Technology",
        location: "Panel Stage"
      }
    ];
    res.json({ sessions: mockSessions, isMock: true });
    return;
  }

  try {
    const prompt = `You are a professional event organizer. Generate 3 core, engaging sessions for a tech hackathon/event with the theme: "${eventTheme}".
The target attendee count is: ${attendeeCount || 200}.
The requested tracks are: ${(tracks || []).join(", ")}.

Respond with a raw JSON array matching this structure (no markdown blocks, just raw JSON):
[
  {
    "title": "<session title>",
    "description": "<one-sentence description>",
    "speakerName": "<invented credible speaker name>",
    "startTime": "<start time e.g. 09:30 AM>",
    "endTime": "<end time e.g. 10:30 AM>",
    "track": "<one of the tracks provided>",
    "location": "<venue location e.g. Stage Alpha>"
  }
]`;

    const response = await client.models.generateContent({
      model: "gemini-3.5-flash",
      contents: prompt,
      config: {
        responseMimeType: "application/json",
      },
    });

    const parsed = JSON.parse(response.text?.trim() || "[]");
    const sessions = parsed.map((s: any, idx: number) => ({
      id: `gen-s${idx + 1}`,
      eventId: "generated-event",
      title: s.title || "Session Topic",
      description: s.description || "Exciting interactive session.",
      speakerId: `spk-gen-${idx}`,
      speakerName: s.speakerName || "Expert Guest Speaker",
      startTime: s.startTime || "10:00 AM",
      endTime: s.endTime || "11:00 AM",
      track: s.track || (tracks?.[0] || "General"),
      location: s.location || "Main Room"
    }));

    res.json({ sessions, isMock: false });
  } catch (err: any) {
    console.error("AI Schedule error:", err);
    res.status(500).json({ error: "Failed to generate schedule sessions dynamically." });
  }
});

// Vite and Static assets middleware
async function startServer() {
  if (process.env.NODE_ENV !== "production") {
    const vite = await createViteServer({
      server: { middlewareMode: true },
      appType: "spa",
    });
    app.use(vite.middlewares);
  } else {
    const distPath = path.join(process.cwd(), 'dist');
    app.use(express.static(distPath));
    app.get('*', (req, res) => {
      res.sendFile(path.join(distPath, 'index.html'));
    });
  }

  app.listen(PORT, "0.0.0.0", () => {
    console.log(`Nexus Events AI Server listening on http://0.0.0.0:${PORT}`);
  });
}

startServer();
