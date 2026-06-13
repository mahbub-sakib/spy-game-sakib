import express from "express";
import cors from "cors";
import dotenv from "dotenv";
import { Redis } from "@upstash/redis";

dotenv.config();

const redis = new Redis({
    url: process.env.UPSTASH_REDIS_REST_URL,
    token: process.env.UPSTASH_REDIS_REST_TOKEN,
});

const app = express();
app.use(cors());
app.use(express.json());

app.post("/api/location", async (req, res) => {
    try {
        const { theme } = req.body;

        const kvKey = `used_words:${theme}`;
        const usedWords = await redis.get(kvKey) || [];

        let location = null;
        let attempts = 0;

        while (!location && attempts < 5) {
            attempts++;

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
                            content: `স্পাই পার্টি গেমের জন্য "${theme}" থিম থেকে এক বা একাধিক বাংলা শব্দ দাও। আর কিছু না।
যেমন: থিম "Objects" হলে তুমি বলতে পারো: ল্যাপটপ, ছাতা, আয়না ইত্যাদি। একাধিক শব্দের ক্ষেত্রে ঘোড়ার গাড়ি, চাঁদের আলো, নদীর পানি ইত্যাদি হতে পারে।
সচরাচর ব্যাবহার হয় না এমন শব্দগুলো দাও।
`,
                        },
                    ],
                }),
            });

            const data = await response.json();
            console.log("OpenRouter response:", JSON.stringify(data));

            const word = data.choices[0].message.content.trim();

            if (!usedWords.includes(word)) {
                location = word;
            }

        }

        if (!location) {
            return res.status(500).json({ error: "Could not generate a unique word" });
        }

        const updatedWords = [...usedWords, location];
        await redis.set(kvKey, updatedWords, { ex: 60 * 60 * 24 * 7 });

        res.json({ location });

    } catch (error) {
        console.error("Server error:", error.message);
        res.status(500).json({ error: error.message });
    }
});

app.listen(3001, () => console.log("Server running on http://localhost:3001"));