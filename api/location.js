import dotenv from "dotenv";
dotenv.config();

export default async function handler(req, res) {
    if (req.method !== "POST") {
        return res.status(405).json({ error: "Method not allowed" });
    }

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
                        role: "system",
                        content: "You are a Bengali language assistant. You ONLY respond in Bengali script. Never use English.",
                    },
                    {
                        role: "user",
                        content: `স্পাই পার্টি গেমের জন্য "${theme}" থিম থেকে এক বা একাধিক বাংলা শব্দ দাও। আর কিছু না।`,
                    },
                ],
            }),
        });

        const data = await response.json();
        const location = data.choices[0].message.content.trim();
        res.json({ location });

    } catch (error) {
        console.error("Server error:", error.message);
        res.status(500).json({ error: error.message });
    }
}
