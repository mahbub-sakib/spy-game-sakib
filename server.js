import express from "express";
import cors from "cors";
import dotenv from "dotenv";

dotenv.config();

const app = express();
app.use(cors());
app.use(express.json());

app.post("/api/location", async (req, res) => {
    const { theme } = req.body;

    const response = await fetch(
        `https://generativelanguage.googleapis.com/v1beta/models/gemini-2.0-flash:generateContent?key=${process.env.SPY_GAME_API_KEY}`,
        {
            method: "POST",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify({
                contents: [
                    {
                        parts: [
                            {
                                text: `You are helping with a Spy party game.
The current theme is "${theme}".
Give me ONE random item in Bengali that belongs to this theme.
Rules:
- Only return the Bengali word, nothing else
- No punctuation, no explanation, no English
- Must be a common, well known item
- Example for theme "Objects": মোমবাতি`,
                            },
                        ],
                    },
                ],
            }),
        }
    );

    const data = await response.json();
    const location = data.candidates[0].content.parts[0].text.trim();
    res.json({ location });
});

app.listen(3001, () => console.log("Server running on http://localhost:3001"));