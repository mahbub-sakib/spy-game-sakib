import dotenv from "dotenv";
dotenv.config();

export default async function handler(req, res) {
    if (req.method !== "POST") {
        return res.status(405).json({ error: "Method not allowed" });
    }

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
}