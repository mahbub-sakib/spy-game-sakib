import { useNavigate } from "react-router-dom";
import { useGame } from "../context/GameContext";



const Configuration = () => {
    const navigate = useNavigate();
    const { players, spies, timer, selectedThemes } = useGame();

    const cards = [
        { label: `Players: ${players.length}`, icon: "👥", path: "/players" },
        { label: `Spies: ${spies}`, icon: "🕵️", path: "/spies" },
        { label: `Timer: ${timer} min`, icon: "⏱️", path: "/timer" },
        { label: `Sections: ${selectedThemes.length}`, icon: "🗂️", path: "/sections" },
    ];

    return (
        <div className="min-h-screen bg-[#0d0620] flex flex-col items-center px-6 py-10">
            <div className="flex items-center gap-3 mb-10">
                <div className="bg-[#2a0d5e] border border-[#5a2faa] rounded-xl p-2 text-2xl">🕵️</div>
                <h1 className="text-white text-2xl font-bold tracking-widest uppercase">Spy</h1>
            </div>

            <div className="grid grid-cols-2 gap-4 w-full max-w-sm mb-10">
                {cards.map((card) => (
                    <div
                        key={card.label}
                        className="config-card"
                        onClick={() => navigate(card.path)}
                        className="bg-[#160930] border border-[#2e1060] rounded-2xl p-5 flex flex-col items-center justify-center gap-2 cursor-pointer hover:border-[#5a2faa] active:scale-95 transition-all"
                    >
                        <span className="text-3xl">{card.icon}</span>
                        <span className="text-[#8b6aaa] text-xs uppercase tracking-widest">{card.label}</span>
                        <span className="text-white text-2xl font-bold">{card.value}</span>
                    </div>
                ))}
            </div>
            <button className="w-full max-w-sm bg-[#e91e8c] hover:bg-[#c91677] active:scale-95 transition-all text-white font-bold text-sm tracking-widest uppercase py-4 rounded-2xl" onClick={() => navigate("/game")}>
                PLAY
            </button>
        </div>
    );
};

export default Configuration;