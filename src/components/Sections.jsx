import { useNavigate } from "react-router-dom";
import { useGame } from "../context/GameContext";
import { useState } from "react";

const THEMES = ["Objects", "Sports", "Animals", "Transportations", "Places", "Countries"];


const Sections = () => {
    const navigate = useNavigate();
    const { selectedThemes, setSelectedThemes } = useGame();
    const [error, setError] = useState(false);

    function toggleTheme(theme) {
        setError(false);
        if (selectedThemes.includes(theme)) {
            setSelectedThemes(selectedThemes.filter((t) => t !== theme));
        } else {
            setSelectedThemes([...selectedThemes, theme]);
        }
    }

    function handleBack() {
        if (selectedThemes.length === 0) {
            setError(true);
            return;
        }
        navigate("/");
    }

    return (
        <div className="min-h-screen bg-[#0d0620] flex flex-col px-6 py-10">
            {/* Header */}
            <h1 className="text-white text-xl font-bold tracking-widest uppercase mb-2">Sections</h1>
            <p className="text-[#8b6aaa] text-xs uppercase tracking-widest mb-8">
                Select one or more themes
            </p>

            {/* Error */}
            {error && (
                <div className="bg-[#3d0a2a] border border-[#e91e8c] rounded-2xl px-4 py-3 mb-6">
                    <p className="text-[#e91e8c] text-sm text-center tracking-wide">
                        Must choose at least one theme
                    </p>
                </div>
            )}

            {/* Themes Grid */}
            <div className="grid grid-cols-2 gap-4">
                {THEMES.map((theme) => {
                    const isActive = selectedThemes.includes(theme);
                    return (
                        <div
                            key={theme}
                            onClick={() => toggleTheme(theme)}
                            className={`flex flex-col items-center justify-center gap-2 rounded-2xl py-8 cursor-pointer active:scale-95 transition-all border
                ${isActive
                                    ? "bg-[#2a0d5e] border-[#7c3aed]"
                                    : "bg-[#160930] border-[#2e1060] hover:border-[#5a2faa]"
                                }`}
                        >
                            <span className="text-white text-sm font-bold tracking-widest uppercase">
                                {theme}
                            </span>
                            <span className={`text-xs tracking-widest uppercase ${isActive ? "text-[#a78bfa]" : "text-[#3a1880]"}`}>
                                {isActive ? "Enabled" : "Disabled"}
                            </span>
                        </div>
                    );
                })}
            </div>

            {/* Back Button */}
            <div className="flex-1" />
            <button
                onClick={handleBack}
                className="mt-8 w-full border border-[#2e1060] text-[#a78bfa] hover:border-[#5a2faa] hover:text-white transition-all text-sm font-bold tracking-widest uppercase py-4 rounded-2xl active:scale-95"
            >
                ← Back
            </button>
        </div>
    );
};

export default Sections;