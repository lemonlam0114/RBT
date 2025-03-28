import React from 'react';
import { Routes, Route } from 'react-router-dom';
import StartScreen from './components/StartScreen';
import Game from './components/Game';
import GameRecords from './components/GameRecords';
import ImagePreloader from './components/ImagePreloader';

function App() {
  return (
    <div className="App">
      <ImagePreloader>
        <Routes>
          <Route path="/" element={<StartScreen />} />
          <Route path="/game" element={<Game />} />
          <Route path="/records" element={<GameRecords />} />
        </Routes>
      </ImagePreloader>
    </div>
  );
}

export default App; 