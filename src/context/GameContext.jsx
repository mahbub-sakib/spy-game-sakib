import { createContext, useContext, useState } from "react";

const GameContext = createContext();

const defaultPlayers = Array.from({ length: 4 }, (_, i) => ({
    id: i + 1,
    name: `Player ${i + 1}`,
}));

export function GameProvider({ children }) {
    const [players, setPlayers] = useState(defaultPlayers);
    const [spies, setSpies] = useState(1);
    const [timer, setTimer] = useState(3);
    const [selectedThemes, setSelectedThemes] = useState(["Countries"]);
    const [roles, setRoles] = useState([]);

    function generateRoles() {
        const pool = [...players].sort(() => Math.random() - 0.5);
        const spyIds = pool.slice(0, spies).map((p) => p.id);
        const theme = selectedThemes[Math.floor(Math.random() * selectedThemes.length)];
        const location = getRandomLocation(theme);

        const assigned = players.map((p) => ({
            ...p,
            isSpy: spyIds.includes(p.id),
            theme,
            location,
        }));

        setRoles(assigned);
    }

    return (
        <GameContext.Provider value={{
            players, setPlayers,
            spies, setSpies,
            timer, setTimer,
            selectedThemes, setSelectedThemes,
            roles, generateRoles,
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
    Objects: ["Laptop", "Umbrella", "Mirror", "Clock", "Bottle", "Scissors", "Candle", "Backpack"],
    Sports: ["Football", "Basketball", "Tennis", "Swimming", "Boxing", "Cycling", "Volleyball", "Golf"],
    Animals: ["Lion", "Elephant", "Dolphin", "Eagle", "Tiger", "Penguin", "Giraffe", "Shark"],
    Transportations: ["Airplane", "Submarine", "Helicopter", "Train", "Cruise Ship", "Motorcycle", "Hot Air Balloon", "Tram"],
    Places: ["Hospital", "Library", "Airport", "Museum", "Beach", "Casino", "School", "Restaurant"],
    Countries: ["Japan", "Brazil", "Egypt", "France", "Australia", "Canada", "India", "Argentina"],
};

function getRandomLocation(theme) {
    const list = THEME_DATA[theme] || [];
    return list[Math.floor(Math.random() * list.length)];
}