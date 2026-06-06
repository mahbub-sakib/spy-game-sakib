import { useState } from 'react'
import { BrowserRouter, Routes, Route } from "react-router-dom";
import { GameProvider } from "./context/GameContext";
import Configuration from "./components/Configuration";
import Players from "./components/Players";
import Spies from "./components/Spies";
import Timer from "./components/Timer";
import Sections from "./components/Sections";
import Game from "./components/Game";
import './App.css';

function App() {

  return (
    <GameProvider>
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<Configuration />} />
          <Route path="/players" element={<Players />} />
          <Route path="/spies" element={<Spies />} />
          <Route path="/timer" element={<Timer />} />
          <Route path="/sections" element={<Sections />} />
          <Route path="/game" element={<Game />} />
        </Routes>
      </BrowserRouter>
    </GameProvider>
  )
}

export default App
