import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { useGame } from "../context/GameContext";

const Game = () => {
    const navigate = useNavigate();
    const { roles, generateRoles, timer, loadingRoles } = useGame();

    const [currentIndex, setCurrentIndex] = useState(0);
    const [isFlipped, setIsFlipped] = useState(false);
    const [phase, setPhase] = useState("reveal"); // "reveal" | "timer"
    const [timeLeft, setTimeLeft] = useState(timer * 60);
    const [allDone, setAllDone] = useState(false);

    useEffect(() => {
        generateRoles();
    }, []);

    // Timer countdown
    useEffect(() => {
        if (phase !== "timer") return;
        if (timeLeft <= 0) {
            setAllDone(true);
            return;
        }
        const interval = setInterval(() => setTimeLeft((t) => t - 1), 1000);
        return () => clearInterval(interval);
    }, [phase, timeLeft]);

    function handleCardTap() {
        if (!isFlipped) {
            setIsFlipped(true);
            return;
        }

        // Hide card and move to next player
        setIsFlipped(false);

        setTimeout(() => {
            if (currentIndex + 1 >= roles.length) {
                setPhase("timer");
            } else {
                setCurrentIndex(currentIndex + 1);
            }
        }, 600);
    }

    const minutes = String(Math.floor(timeLeft / 60)).padStart(2, "0");
    const seconds = String(timeLeft % 60).padStart(2, "0");
    const currentRole = roles[currentIndex];


    // ── Loading Screen ─────────────────────────────────────────
    if (loadingRoles) {
        return (
            <div className="min-h-screen bg-[#0d0620] flex flex-col items-center justify-center px-6 gap-6">
                <div className="w-16 h-16 border-4 border-[#2e1060] border-t-[#e91e8c] rounded-full animate-spin" />
                <p className="text-[#8b6aaa] text-sm uppercase tracking-widest">
                    Loading Theme...
                </p>
            </div>
        );
    }

    // ── Game Over ──────────────────────────────────────────────
    if (allDone) {
        return (
            <div className="min-h-screen bg-[#0d0620] flex flex-col items-center justify-center px-6 gap-6">
                <span className="text-6xl">⏰</span>
                <h1 className="text-white text-2xl font-bold tracking-widest uppercase">Time's Up!</h1>
                <p className="text-[#8b6aaa] text-sm tracking-wide text-center">
                    Discuss and vote for who you think the spy is.
                </p>
                <button
                    onClick={() => navigate("/")}
                    className="mt-4 w-full max-w-sm border border-[#2e1060] text-[#a78bfa] hover:border-[#5a2faa] hover:text-white transition-all text-sm font-bold tracking-widest uppercase py-4 rounded-2xl active:scale-95"
                >
                    ← Back to Menu
                </button>
            </div>
        );
    }

    // ── Timer Phase ────────────────────────────────────────────
    if (phase === "timer") {
        return (
            <div className="min-h-screen bg-[#0d0620] flex flex-col items-center justify-center px-6 gap-6">
                <p className="text-[#8b6aaa] text-xs uppercase tracking-widest">Time Remaining</p>
                <div className="bg-[#160930] border border-[#2e1060] rounded-3xl px-16 py-10 flex flex-col items-center gap-2">
                    <span className="text-white font-bold tracking-widest" style={{ fontSize: "64px" }}>
                        {minutes}:{seconds}
                    </span>
                    <br />
                    <span className="text-[#8b6aaa] text-xs uppercase tracking-widest">minutes : seconds</span>
                </div>
                <p className="text-[#8b6aaa] text-sm tracking-wide text-center mt-2">
                    Have fun and find the spy before time runs out!
                </p>
            </div>
        );
    }

    // ── Reveal Phase ───────────────────────────────────────────
    return (
        <div className="min-h-screen bg-[#0d0620] flex flex-col items-center px-6 py-10">

            {/* Header */}
            <div className="w-full flex justify-between items-center mb-10">
                <h1 className="text-white text-xl font-bold tracking-widest uppercase">Game</h1>
                <span className="text-[#8b6aaa] text-xs uppercase tracking-widest">
                    {currentIndex + 1} / {roles.length}
                </span>
            </div>

            {/* Player Name */}
            <p className="text-[#a78bfa] text-sm uppercase tracking-widest mb-6">
                {currentRole?.name}
            </p>

            {/* Card */}
            <div
                onClick={handleCardTap}
                className="w-full max-w-sm cursor-pointer"
                style={{ perspective: "1000px" }}
            >
                <div
                    style={{
                        transition: "transform 0.6s",
                        transformStyle: "preserve-3d",
                        transform: isFlipped ? "rotateY(180deg)" : "rotateY(0deg)",
                        position: "relative",
                        height: "380px",
                    }}
                >
                    {/* Front - Undiscovered */}
                    <div
                        className="absolute inset-0 bg-[#160930] border border-[#2e1060] rounded-3xl flex flex-col items-center justify-center gap-4"
                        style={{ backfaceVisibility: "hidden" }}
                    >
                        <span className="text-6xl">👁️</span>
                        <p className="text-[#8b6aaa] text-xs uppercase tracking-widest mt-4">Tap To Show</p>
                    </div>

                    {/* Back - Discovered */}
                    <div
                        className="absolute inset-0 rounded-3xl flex flex-col items-center justify-center gap-4 px-6"
                        style={{
                            backfaceVisibility: "hidden",
                            transform: "rotateY(180deg)",
                            background: currentRole?.isSpy ? "#1a0a1a" : "#0d1a30",
                            border: currentRole?.isSpy ? "1px solid #e91e8c" : "1px solid #2e1060",
                        }}
                    >
                        {currentRole?.isSpy ? (
                            <>
                                <span className="text-6xl">🕵️</span>
                                <p className="text-[#e91e8c] text-xl font-bold tracking-widest uppercase text-center">
                                    You are the Spy!
                                </p>
                                <p className="text-[#8b4a6a] text-xs tracking-wide text-center">
                                    Find out the topic without getting caught
                                </p>
                            </>
                        ) : (
                            <>
                                <span className="text-6xl">📍</span>
                                <p className="text-[#8b6aaa] text-xs uppercase tracking-widest">Topic</p>
                                <p
                                    className="text-white text-3xl font-bold tracking-widest text-center"
                                    style={{ fontFamily: "'Hind Siliguri', sans-serif" }}>
                                    {currentRole?.location}
                                </p>
                                <p className="text-[#5a3f7a] text-xs uppercase tracking-widest mt-2">
                                    {currentRole?.theme}
                                </p>
                            </>
                        )}
                        <p className="text-[#3a1880] text-xs uppercase tracking-widest mt-8">
                            Tap again to hide and pass
                        </p>
                    </div>
                </div>
            </div>

            {/* Progress dots */}
            <div className="flex gap-2 mt-10">
                {roles.map((_, i) => (
                    <div
                        key={i}
                        className={`w-2 h-2 rounded-full transition-all ${i < currentIndex
                            ? "bg-[#e91e8c]"
                            : i === currentIndex
                                ? "bg-[#a78bfa]"
                                : "bg-[#2e1060]"
                            }`}
                    />
                ))}
            </div>

        </div>
    );
};

export default Game;