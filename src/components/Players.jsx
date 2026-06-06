import { useNavigate } from "react-router-dom";
import { useGame } from "../context/GameContext";



const Players = () => {
    const navigate = useNavigate();
    const { players, setPlayers } = useGame();

    function addPlayer() {
        if (players.length >= 10) return;
        setPlayers([...players, { id: Date.now(), name: `Player ${players.length + 1}` }]);
    }

    function removePlayer() {
        if (players.length <= 3) return;
        setPlayers(players.slice(0, -1));
    }

    function updateName(id, name) {
        setPlayers(players.map((p) => (p.id === id ? { ...p, name } : p)));
    }
    return (
        <div className="min-h-screen bg-[#0d0620] flex flex-col px-6 py-10">
            {/* Header */}
            <h1 className="text-white text-xl font-bold tracking-widest uppercase mb-8">Players</h1>

            {/* Counter */}
            <div className="flex items-center justify-center gap-6 bg-[#160930] border border-[#2e1060] rounded-2xl py-6">
                <button
                    onClick={removePlayer}
                    disabled={players.length <= 3}
                    className="w-10 h-10 rounded-full bg-[#2a0d5e] border border-[#5a2faa] text-[#a78bfa] text-xl font-bold hover:bg-[#3b1a7a] active:scale-95 transition-all disabled:opacity-30 disabled:cursor-not-allowed"
                >
                    −
                </button>

                <div className="flex flex-col items-center">
                    <span className="text-white text-4xl font-bold">{players.length}</span>
                    <span className="text-[#8b6aaa] text-xs uppercase tracking-widest mt-1">Players</span>
                </div>

                <button
                    onClick={addPlayer}
                    disabled={players.length >= 10}
                    className="w-10 h-10 rounded-full bg-[#2a0d5e] border border-[#5a2faa] text-[#a78bfa] text-xl font-bold hover:bg-[#3b1a7a] active:scale-95 transition-all disabled:opacity-30 disabled:cursor-not-allowed"
                >
                    +
                </button>
            </div>

            {/* Player List */}
            <div className="flex flex-col gap-3 mt-8">
                {players.map((player, index) => (
                    <div
                        key={player.id}
                        className="flex items-center gap-4 bg-[#160930] border border-[#2e1060] rounded-2xl px-4 py-3 hover:border-[#5a2faa] transition-colors"
                    >
                        <div className="w-8 h-8 rounded-full bg-[#2a0d5e] border border-[#5a2faa] flex items-center justify-center text-[#a78bfa] text-sm font-bold flex-shrink-0">
                            {index + 1}
                        </div>
                        <input
                            type="text"
                            value={player.name}
                            onChange={(e) => updateName(player.id, e.target.value)}
                            placeholder={`Player ${index + 1}`}
                            className="flex-1 bg-transparent text-white text-sm placeholder-[#5a3f7a] outline-none"
                        />
                        <span className="text-[#3a1880] text-lg">✎</span>
                    </div>
                ))}
            </div>

            <button
                onClick={() => navigate("/")}
                className="mt-8 w-full border border-[#2e1060] text-[#a78bfa] hover:border-[#5a2faa] hover:text-white transition-all text-sm font-bold tracking-widest uppercase py-4 rounded-2xl active:scale-95"
            >
                ← Back
            </button>
        </div>
    );
};

export default Players;