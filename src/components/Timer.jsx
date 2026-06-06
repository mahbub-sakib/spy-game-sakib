import { useNavigate } from "react-router-dom";
import { useGame } from "../context/GameContext";

const Timer = () => {
    const navigate = useNavigate();
    const { timer, setTimer } = useGame();

    function addMinute() {
        if (timer >= 5) return;
        setTimer(timer + 1);
    }

    function removeMinute() {
        if (timer <= 1) return;
        setTimer(timer - 1);
    }

    return (
        <div className="min-h-screen bg-[#0d0620] flex flex-col px-6 py-10">
            {/* Header */}
            <h1 className="text-white text-xl font-bold tracking-widest uppercase mb-8">Timer</h1>

            {/* Counter */}
            <div className="flex items-center justify-center gap-6 bg-[#160930] border border-[#2e1060] rounded-2xl py-6">
                <button
                    onClick={removeMinute}
                    disabled={timer <= 1}
                    className="w-10 h-10 rounded-full bg-[#2a0d5e] border border-[#5a2faa] text-[#a78bfa] text-xl font-bold hover:bg-[#3b1a7a] active:scale-95 transition-all disabled:opacity-30 disabled:cursor-not-allowed"
                >
                    −
                </button>

                <div className="flex flex-col items-center">
                    <span className="text-white text-4xl font-bold">{timer}</span>
                    <span className="text-[#8b6aaa] text-xs uppercase tracking-widest mt-1">Minutes</span>
                </div>

                <button
                    onClick={addMinute}
                    disabled={timer >= 5}
                    className="w-10 h-10 rounded-full bg-[#2a0d5e] border border-[#5a2faa] text-[#a78bfa] text-xl font-bold hover:bg-[#3b1a7a] active:scale-95 transition-all disabled:opacity-30 disabled:cursor-not-allowed"
                >
                    +
                </button>
            </div>

            {/* Hint */}
            <p className="text-center text-[#8b6aaa] text-xs uppercase tracking-widest mt-4">
                Range 1 to 5 minutes
            </p>

            {/* Back Button */}
            <div className="flex-1" />
            <button
                onClick={() => navigate("/")}
                className="mt-8 w-full border border-[#2e1060] text-[#a78bfa] hover:border-[#5a2faa] hover:text-white transition-all text-sm font-bold tracking-widest uppercase py-4 rounded-2xl active:scale-95"
            >
                ← Back
            </button>
        </div>
    );
};

export default Timer;