import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import styled from 'styled-components';
import { difficultySettings, levelConfig } from '../config/gameConfig';

const getLevelColor = (level) => {
  switch (level) {
    case 1:
      return '#ff4444'; // red
    case 2:
      return '#ffbb33'; // yellow
    case 3:
      return '#00C851'; // green
    case 4:
      return '#3366cc'; // blue
    case 5:
      return '#ffffff'; // white
    default:
      return '#ddd';
  }
};

const levelDescriptions = {
  1: {
    title: "Simbol dan Tanda Keselamatan Merah",
    description: "Simbol keselamatan larangan dan pemadam api",
    count: "7 simbol"
  },
  2: {
    title: "Simbol dan Tanda Keselamatan Kuning",
    description: "Simbol keselamatan perhatian, amaran, waspada dan potensi bahaya",
    count: "3 simbol"
  },
  3: {
    title: "Simbol dan Tanda Keselamatan Hijau",
    description: "Simbol keselamatan zon aman dan pertolongan pertama",
    count: "3 simbol"
  },
  4: {
    title: "Simbol dan Tanda Keselamatan Biru",
    description: "Wajib Dipatuhi",
    count: "2 simbol"
  },
  5: {
    title: "Simbol dan Tanda Keselamatan Putih",
    description: "Informasi Umum",
    count: "1 simbol"
  }
};

const StartScreen = () => {
  const navigate = useNavigate();
  const [selectedLevel, setSelectedLevel] = useState(1);
  const [selectedDifficulty, setSelectedDifficulty] = useState('mudah');
  const [playerName, setPlayerName] = useState('');
  const [showNameError, setShowNameError] = useState(false);

  const handleStartGame = () => {
    if (!playerName.trim()) {
      alert('Sila masukkan nama anda');
      return;
    }
    navigate('/game', { 
      state: { 
        level: selectedLevel,
        difficulty: selectedDifficulty,
        playerName: playerName.trim()
      } 
    });
  };

  const handleViewRecords = () => {
    navigate('/records');
  };

  return (
    <Container>
      <Title>Permainan Simbol Keselamatan Bengkel RBT</Title>

      <PlayerNameSection>
        <SubTitle>Nama:</SubTitle>
        <NameInput
          type="text"
          placeholder="Masukkan nama anda"
          value={playerName}
          onChange={(e) => {
            setPlayerName(e.target.value);
            setShowNameError(false);
          }}
        />
        {showNameError && (
          <ErrorMessage>Sila masukkan nama anda</ErrorMessage>
        )}
      </PlayerNameSection>

      <SubTitle>Tahap:</SubTitle>
      <DifficultyContainer>
        <DifficultyButton 
          selected={selectedDifficulty === 'mudah'}
          onClick={() => setSelectedDifficulty('mudah')}
        >
          Mudah
        </DifficultyButton>
        <DifficultyButton 
          selected={selectedDifficulty === 'sederhana'}
          onClick={() => setSelectedDifficulty('sederhana')}
        >
          Sederhana
        </DifficultyButton>
        <DifficultyButton 
          selected={selectedDifficulty === 'sukar'}
          onClick={() => setSelectedDifficulty('sukar')}
        >
          Sukar
        </DifficultyButton>
      </DifficultyContainer>

      <SubTitle>Pilih Tahap:</SubTitle>
      <LevelsContainer>
        {Object.entries(levelDescriptions).map(([level, { title, description, count }]) => (
          <LevelButton
            key={level}
            selected={selectedLevel === parseInt(level)}
            onClick={() => setSelectedLevel(parseInt(level))}
            color={getLevelColor(parseInt(level))}
          >
            <LevelTitle>Tahap {level}: {title}</LevelTitle>
            <LevelDescription>{description}</LevelDescription>
            <SymbolCount>{count}</SymbolCount>
          </LevelButton>
        ))}
      </LevelsContainer>

      <ButtonContainer>
        <StartButton 
          onClick={handleStartGame}
          disabled={!playerName.trim()}
        >
          Mula Permainan
        </StartButton>
        <RecordsButton onClick={handleViewRecords}>Lihat Rekod</RecordsButton>
      </ButtonContainer>
    </Container>
  );
};

const Container = styled.div`
  max-width: 1200px;
  margin: 0 auto;
  padding: 2rem;
`;

const Title = styled.h1`
  text-align: center;
  color: #333;
  margin-bottom: 2rem;
`;

const SubTitle = styled.h2`
  text-align: center;
  color: #444;
  margin-bottom: 1rem;
`;

const PlayerNameSection = styled.div`
  margin: 2rem 0;
  text-align: center;
`;

const NameInput = styled.input`
  padding: 1rem;
  font-size: 1.2rem;
  border: 2px solid #ddd;
  border-radius: 8px;
  width: 300px;
  text-align: center;
  transition: border-color 0.3s;

  &:focus {
    outline: none;
    border-color: #4CAF50;
  }

  &::placeholder {
    color: #999;
  }
`;

const ErrorMessage = styled.div`
  color: #f44336;
  margin-top: 0.5rem;
  font-size: 0.9rem;
`;

const DifficultyContainer = styled.div`
  margin-bottom: 2rem;
`;

const DifficultyButton = styled.button`
  padding: 1rem 2rem;
  font-size: 1.2rem;
  border: 2px solid ${({ selected }) => (selected ? '#4CAF50' : '#ddd')};
  border-radius: 8px;
  background-color: ${({ selected }) => (selected ? '#4CAF50' : 'transparent')};
  color: ${({ selected }) => (selected ? '#fff' : '#333')};
  margin-right: 1rem;
  transition: all 0.3s;

  &:hover {
    background-color: #4CAF50;
    border-color: #4CAF50;
    color: #fff;
  }

  &:focus {
    outline: none;
  }
`;

const LevelsContainer = styled.div`
  display: flex;
  justify-content: center;
  margin-bottom: 2rem;
`;

const LevelButton = styled.button`
  padding: 1rem 2rem;
  font-size: 1.2rem;
  border: 2px solid ${({ selected, color }) => (selected ? color : '#ddd')};
  border-radius: 8px;
  background-color: ${({ selected }) => (selected ? '#fff' : 'transparent')};
  color: ${({ selected }) => (selected ? '#333' : '#999')};
  margin-right: 1rem;
  transition: all 0.3s;

  &:hover {
    background-color: ${({ color }) => color};
    border-color: ${({ color }) => color};
    color: #fff;
  }

  &:focus {
    outline: none;
  }
`;

const LevelTitle = styled.h3`
  margin-bottom: 0.5rem;
`;

const LevelDescription = styled.p`
  margin-bottom: 0.5rem;
`;

const SymbolCount = styled.span`
  font-size: 0.9rem;
  color: #999;
`;

const ButtonContainer = styled.div`
  display: flex;
  gap: 20px;
  margin-top: 30px;
`;

const StartButton = styled.button`
  padding: 12px 30px;
  font-size: 18px;
  background-color: #4CAF50;
  color: white;
  border: none;
  border-radius: 4px;
  cursor: pointer;
  transition: background-color 0.3s;

  &:hover {
    background-color: #45a049;
  }

  &:disabled {
    background-color: #ddd;
    cursor: not-allowed;
  }
`;

const RecordsButton = styled(StartButton)`
  background-color: #2196F3;

  &:hover {
    background-color: #1976D2;
  }
`;

export default StartScreen;