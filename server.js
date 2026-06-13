import express from "express";
import cors from "cors";
import dotenv from "dotenv";

dotenv.config();

const app = express();
app.use(cors());
app.use(express.json());

app.post("/api/location", async (req, res) => {
    try {
        const { theme } = req.body;

        const response = await fetch("https://openrouter.ai/api/v1/chat/completions", {
            method: "POST",
            headers: {
                "Content-Type": "application/json",
                "Authorization": `Bearer ${process.env.SPY_GAME_API_KEY}`,
            },
            body: JSON.stringify({
                model: "nex-agi/nex-n2-pro:free",
                messages: [
                    {
                        role: "user",
                        content: `You are helping with a Spy party game.
The current theme is "${theme}".
Give me ONE random item in Bengali that belongs to this theme.
Rules:
- Only return the Bengali word, nothing else
- No punctuation, no explanation, no English
- Must be a common, well known item
- Example for theme "Objects": মোমবাতি`,
                    },
                ],
            }),
        });

        const data = await response.json();
        console.log("OpenRouter response:", JSON.stringify(data));

        const location = data.choices[0].message.content.trim();
        res.json({ location });

    } catch (error) {
        console.error("Server error:", error.message);
        res.status(500).json({ error: error.message });
    }
});

app.listen(3001, () => console.log("Server running on http://localhost:3001"));