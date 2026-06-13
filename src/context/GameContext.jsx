import { createContext, useContext, useState } from "react";
import { getLocationFromAI } from "../utils/aiAgent";

const GameContext = createContext();

const defaultPlayers = Array.from({ length: 4 }, (_, i) => ({
    id: i + 1,
    name: `Player ${i + 1}`,
}));

export function GameProvider({ children }) {
    const [players, setPlayers] = useState(defaultPlayers);
    const [spies, setSpies] = useState(1);
    const [timer, setTimer] = useState(3);
    const [selectedThemes, setSelectedThemes] = useState(["Objects"]);
    const [roles, setRoles] = useState([]);
    const [loadingRoles, setLoadingRoles] = useState(false);

    async function generateRoles() {
        setLoadingRoles(true);

        const theme = selectedThemes[Math.floor(Math.random() * selectedThemes.length)];

        // Ask AI for a location based on the theme
        const location = await getLocationFromAI(theme);

        const pool = [...players].sort(() => Math.random() - 0.5);
        const spyIds = pool.slice(0, spies).map((p) => p.id);
        // const theme = selectedThemes[Math.floor(Math.random() * selectedThemes.length)];
        // const location = getRandomLocation(theme);

        const assigned = players.map((p) => ({
            ...p,
            isSpy: spyIds.includes(p.id),
            theme,
            location,
        }));

        setRoles(assigned);
        setLoadingRoles(false);
    }

    return (
        <GameContext.Provider value={{
            players, setPlayers,
            spies, setSpies,
            timer, setTimer,
            selectedThemes, setSelectedThemes,
            roles, generateRoles,
            loadingRoles,
        }}>
            {children}
        </GameContext.Provider>
    );
}

export function useGame() {
    return useContext(GameContext);
}

// ── Theme Data ──────────────────────────────────────────────
const THEME_DATA = {
    Objects: [
        "ল্যাপটপ", "ছাতা", "আয়না", "ঘড়ি", "বোতল",
        "কাঁচি", "মোমবাতি", "ব্যাগ", "চেয়ার", "টেবিল"
    ],
    Sports: [
        "ফুটবল", "ক্রিকেট", "টেনিস", "সাঁতার", "বক্সিং",
        "সাইক্লিং", "ভলিবল", "গলফ", "হকি", "কাবাডি"
    ],
    Animals: [
        "সিংহ", "হাতি", "ডলফিন", "ঈগল", "বাঘ",
        "পেঙ্গুইন", "জিরাফ", "হাঙর", "বানর", "কুমির"
    ],
    Transportations: [
        "বিমান", "সাবমেরিন", "হেলিকপ্টার", "ট্রেন", "জাহাজ",
        "মোটরসাইকেল", "বেলুন", "ট্রাম", "বাস", "নৌকা"
    ],
    Places: [
        "হাসপাতাল", "পাঠাগার", "বিমানবন্দর", "জাদুঘর", "সমুদ্র সৈকত",
        "ক্যাসিনো", "বিদ্যালয়", "রেস্তোরাঁ", "মসজিদ", "বাজার"
    ],
    Countries: [
        "জাপান", "ব্রাজিল", "মিশর", "ফ্রান্স", "অস্ট্রেলিয়া",
        "কানাডা", "ভারত", "আর্জেন্টিনা", "বাংলাদেশ", "চীন"
    ],
};

function getRandomLocation(theme) {
    const list = THEME_DATA[theme] || [];
    return list[Math.floor(Math.random() * list.length)];
}