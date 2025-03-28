import React, { useState, useEffect } from 'react';
import styled from 'styled-components';
import { useNavigate, useLocation } from 'react-router-dom';
import { levelConfig, difficultySettings } from '../config/gameConfig';
import SafeImage from './SafeImage';
import { saveGameRecord } from '../db/gameDB';
import backgroundImage from '../assets/images/bengkel-rbt.jpg';

const Game = () => {
  const navigate = useNavigate();
  const location = useLocation();
  const { difficulty, level, playerName } = location.state || {};
  
  const [currentLevel, setCurrentLevel] = useState(parseInt(level) || 1);
  const [score, setScore] = useState(0);
  const [timeLeft, setTimeLeft] = useState(60 * (difficultySettings[difficulty]?.timeMultiplier || 1));
  const [gameStatus, setGameStatus] = useState('playing');
  const [foundSymbols, setFoundSymbols] = useState([]);
  const [selectedSymbol, setSelectedSymbol] = useState(null);
  const [isLoading, setIsLoading] = useState(true);
  const [symbolPositions, setSymbolPositions] = useState({});

  const currentLevelData = levelConfig[currentLevel];

  // 检查路由状态
  useEffect(() => {
    if (!location.state || !playerName) {
      navigate('/');
      return;
    }
  }, [location.state, navigate, playerName]);

  // 加载背景图片
  useEffect(() => {
    const bgImage = new Image();
    bgImage.src = backgroundImage;
    bgImage.onload = () => {
      setIsLoading(false);
    };
    bgImage.onerror = (error) => {
      console.error('Background image failed to load:', error);
      setIsLoading(false);
    };
  }, []);

  // 生成随机位置的函数
  const generateRandomPositions = (symbols) => {
    const positions = {};
    const usedPositions = [];
    
    symbols.forEach(symbol => {
      let x, y;
      let isValidPosition = false;
      
      while (!isValidPosition) {
        x = Math.random() * 80 + 10;
        y = Math.random() * 80 + 10;
        
        isValidPosition = usedPositions.every(pos => {
          const distance = Math.sqrt(
            Math.pow(pos.x - x, 2) + Math.pow(pos.y - y, 2)
          );
          return distance > 15;
        });
      }
      
      usedPositions.push({ x, y });
      positions[symbol.id] = { x, y };
    });
    
    return positions;
  };

  // 初始化和重置标识位置
  const initializeSymbols = () => {
    if (currentLevelData?.symbols) {
      setSymbolPositions(generateRandomPositions(currentLevelData.symbols));
    }
  };

  // 在游戏开始时初始化标识位置
  useEffect(() => {
    if (currentLevelData?.symbols && !isLoading) {
      initializeSymbols();
    }
  }, [currentLevelData, isLoading]);

  // 定时器逻辑
  useEffect(() => {
    let timer;
    if (gameStatus === 'playing' && timeLeft > 0 && !isLoading) {
      timer = setInterval(() => {
        setTimeLeft(prev => {
          if (prev <= 0) {
            setGameStatus('finished');
            return 0;
          }
          return prev - 1;
        });
      }, 1000);
    }
    return () => clearInterval(timer);
  }, [timeLeft, gameStatus, isLoading]);

  const handleSymbolClick = async (symbol) => {
    if (gameStatus !== 'playing') return;

    if (symbol.isTarget) {
      const newScore = score + 10;
      setScore(newScore);
      setFoundSymbols(prev => [...prev, symbol.id]);
      
      // 检查是否找到所有目标
      const remainingTargets = currentLevelData.symbols.filter(s => 
        s.isTarget && !foundSymbols.includes(s.id)
      );
      
      if (remainingTargets.length === 1) {
        setGameStatus('completed');
        
        try {
          await saveGameRecord({
            playerName,
            difficulty: location.state.difficulty,
            score: newScore,
          });
        } catch (error) {
          console.error('保存游戏记录失败:', error);
        }
      }
    } else {
      setScore(prev => Math.max(0, prev - 5));
    }

    setSelectedSymbol(symbol);
  };

  const handleCloseSymbol = () => {
    setSelectedSymbol(null);
  };

  const handlePause = () => {
    setGameStatus(prev => prev === 'playing' ? 'paused' : 'playing');
  };

  const handleRestart = () => {
    setCurrentLevel(parseInt(level) || 1);
    setScore(0);
    setTimeLeft(60 * (difficultySettings[difficulty]?.timeMultiplier || 1));
    setGameStatus('playing');
    setFoundSymbols([]);
    setSelectedSymbol(null);
    initializeSymbols();
  };

  const handleBackToStart = () => {
    navigate('/');
  };

  if (!location.state || !currentLevelData) {
    return (
      <GameContainer>
        <LoadingMessage>Sila pilih tahap permainan</LoadingMessage>
        <Button onClick={() => navigate('/')}>Kembali ke Menu</Button>
      </GameContainer>
    );
  }

  if (isLoading) {
    return (
      <GameContainer>
        <LoadingMessage>Sedang Memuat...</LoadingMessage>
      </GameContainer>
    );
  }

  return (
    <GameContainer>
      <GameHeader>
        <PlayerInfo>
          <PlayerName>Pemain: {playerName}</PlayerName>
        </PlayerInfo>
        <ScoreDisplay>Skor: {score}</ScoreDisplay>
        <TimeDisplay>Masa: {timeLeft}s</TimeDisplay>
        <LevelDisplay>Tahap: {currentLevel}</LevelDisplay>
      </GameHeader>

      <GameArea>
        <BackgroundImage 
          src={backgroundImage}
          alt="Latar Belakang Bengkel RBT"
          onError={(e) => {
            console.error('Gambar latar belakang gagal dimuat');
            e.target.style.background = '#f5f5f5';
          }}
        />
        {currentLevelData.symbols.map((symbol) => (
          <Symbol
            key={symbol.id}
            style={{
              left: `${symbolPositions[symbol.id]?.x || 50}%`,
              top: `${symbolPositions[symbol.id]?.y || 50}%`
            }}
            found={foundSymbols.includes(symbol.id)}
            onClick={() => handleSymbolClick(symbol)}
            category={symbol.category}
          >
            <SafeImage
              src={symbol.image}
              alt={symbol.name}
              size={difficultySettings[difficulty]?.symbolSize || 'medium'}
              fallback="Simbol tidak dapat dimuat"
            />
          </Symbol>
        ))}
      </GameArea>

      <GameControls>
        <Button onClick={handlePause}>
          {gameStatus === 'playing' ? 'Berhenti' : 'Teruskan'}
        </Button>
        <Button onClick={handleRestart}>Main Semula</Button>
        <Button onClick={handleBackToStart}>Keluar</Button>
      </GameControls>

      {selectedSymbol && (
        <Modal onClose={handleCloseSymbol}>
          <ModalContent>
            <h3>{selectedSymbol.name}</h3>
            <p>{selectedSymbol.meaning}</p>
            <Button onClick={handleCloseSymbol}>Tutup</Button>
          </ModalContent>
        </Modal>
      )}

      {gameStatus === 'completed' && (
        <GameOverContainer>
          <h2>Tahniah {playerName}! Anda telah selesai tahap ini!</h2>
          <p>Skor: {score}</p>
          <Button onClick={handleBackToStart}>Kembali ke Menu</Button>
          <Button onClick={handleRestart}>Main Semula</Button>
        </GameOverContainer>
      )}

      {gameStatus === 'finished' && (
        <GameOverContainer>
          <h2>Tamat Permainan!</h2>
          <p>Pemain: {playerName}</p>
          <p>Skor Akhir: {score}</p>
          <Button onClick={handleRestart}>Main Semula</Button>
          <Button onClick={handleBackToStart}>Keluar</Button>
        </GameOverContainer>
      )}
    </GameContainer>
  );
};

const GameContainer = styled.div`
  padding: 20px;
  max-width: 1200px;
  margin: 0 auto;
`;

const GameHeader = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin-bottom: 20px;
  padding: 10px;
  background: #f5f5f5;
  border-radius: 8px;
`;

const PlayerInfo = styled.div`
  display: flex;
  align-items: center;
`;

const PlayerName = styled.div`
  font-size: 1.2em;
  font-weight: bold;
  color: #333;
  margin-right: 20px;
`;

const ScoreDisplay = styled.div`
  font-size: 1.2em;
  font-weight: bold;
  color: #4CAF50;
`;

const TimeDisplay = styled.div`
  font-size: 1.2em;
  font-weight: bold;
  color: #f44336;
`;

const LevelDisplay = styled.div`
  font-size: 1.2em;
  font-weight: bold;
  color: #2196F3;
`;

const GameArea = styled.div`
  position: relative;
  width: 100%;
  height: 600px;
  border-radius: 8px;
  overflow: hidden;
  margin-bottom: 20px;
  box-shadow: 0 4px 8px rgba(0,0,0,0.1);
  border: none;
`;

const BackgroundImage = styled.img`
  width: 100%;
  height: 100%;
  object-fit: cover;
  background-color: #f5f5f5;
  will-change: transform;
`;

const Symbol = styled.div`
  position: absolute;
  transform: translate(-50%, -50%);
  cursor: pointer;
  transition: all 0.3s ease;
  opacity: ${props => props.found ? 0.5 : 1};
  border: none;
  border-radius: 8px;
  padding: 4px;
  background-color: ${props => props.found ? 'rgba(255, 255, 255, 0.8)' : 'transparent'};
  box-shadow: 0 2px 8px rgba(0, 0, 0, 0.2);
  will-change: transform, opacity;

  img {
    filter: none !important;
    fill: currentColor;
    color: inherit;
  }

  &:hover {
    transform: translate(-50%, -50%) scale(1.1);
    box-shadow: 0 4px 12px rgba(0, 0, 0, 0.3);
  }
`;

const GameControls = styled.div`
  display: flex;
  gap: 10px;
  justify-content: center;
  margin-bottom: 20px;
`;

const Button = styled.button`
  padding: 10px 20px;
  font-size: 1em;
  background: #4CAF50;
  color: white;
  border: none;
  border-radius: 4px;
  cursor: pointer;
  transition: background 0.2s ease;

  &:hover {
    background: #45a049;
  }
`;

const GameOverContainer = styled.div`
  position: fixed;
  top: 50%;
  left: 50%;
  transform: translate(-50%, -50%);
  background: white;
  padding: 30px;
  border-radius: 8px;
  box-shadow: 0 0 20px rgba(0, 0, 0, 0.2);
  text-align: center;

  h2 {
    color: #f44336;
    margin-bottom: 20px;
  }

  p {
    font-size: 1.2em;
    margin-bottom: 20px;
  }
`;

const Modal = styled.div`
  position: fixed;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  background: rgba(0, 0, 0, 0.7);
  display: flex;
  justify-content: center;
  align-items: center;
  z-index: 1000;
`;

const ModalContent = styled.div`
  background: white;
  padding: 30px;
  border-radius: 12px;
  position: relative;
  max-width: 500px;
  width: 90%;
  text-align: center;
`;

const LoadingMessage = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  height: 100vh;
  font-size: 1.5em;
  color: #666;
`;

export default Game; 