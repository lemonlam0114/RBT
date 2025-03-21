import React, { useState } from 'react';
import styled from 'styled-components';
import { levelConfig } from '../config/gameConfig';

const TeacherMode = () => {
  const [selectedLevel, setSelectedLevel] = useState(null);
  const [gameMode, setGameMode] = useState('demo'); // demo, competition
  const [teams, setTeams] = useState([]);
  const [currentTeam, setCurrentTeam] = useState(0);

  const handleStartDemo = () => {
    // 开始演示模式
  };

  const handleStartCompetition = () => {
    // 开始竞赛模式
  };

  const handleAddTeam = () => {
    const teamName = prompt('请输入队伍名称：');
    if (teamName) {
      setTeams(prev => [...prev, { name: teamName, score: 0 }]);
    }
  };

  return (
    <Container>
      <Header>
        <Title>教师控制面板</Title>
        <ModeSelector>
          <ModeButton
            selected={gameMode === 'demo'}
            onClick={() => setGameMode('demo')}
          >
            演示模式
          </ModeButton>
          <ModeButton
            selected={gameMode === 'competition'}
            onClick={() => setGameMode('competition')}
          >
            竞赛模式
          </ModeButton>
        </ModeSelector>
      </Header>

      <MainContent>
        <LevelSelection>
          <h2>选择关卡</h2>
          <LevelGrid>
            {Object.entries(levelConfig).map(([key, value]) => (
              <LevelButton
                key={key}
                color={value.color}
                selected={selectedLevel === key}
                onClick={() => setSelectedLevel(key)}
              >
                {value.name}
                <span>{value.symbolCount}个标识</span>
              </LevelButton>
            ))}
          </LevelGrid>
        </LevelSelection>

        {gameMode === 'competition' && (
          <TeamManagement>
            <h2>队伍管理</h2>
            <TeamList>
              {teams.map((team, index) => (
                <TeamItem key={index}>
                  <span>{team.name}</span>
                  <span>得分：{team.score}</span>
                </TeamItem>
              ))}
            </TeamList>
            <Button onClick={handleAddTeam}>添加队伍</Button>
          </TeamManagement>
        )}

        <Controls>
          <Button
            onClick={gameMode === 'demo' ? handleStartDemo : handleStartCompetition}
            disabled={!selectedLevel}
          >
            开始{gameMode === 'demo' ? '演示' : '竞赛'}
          </Button>
        </Controls>
      </MainContent>

      <ScoreBoard>
        <h2>计分板</h2>
        <ScoreList>
          {teams.map((team, index) => (
            <ScoreItem key={index}>
              <span>{team.name}</span>
              <span>{team.score}</span>
            </ScoreItem>
          ))}
        </ScoreList>
      </ScoreBoard>
    </Container>
  );
};

const Container = styled.div`
  height: 100vh;
  display: grid;
  grid-template-rows: auto 1fr auto;
  padding: 1rem;
  gap: 1rem;
`;

const Header = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding: 1rem;
  background: #f5f5f5;
  border-radius: 8px;
`;

const Title = styled.h1`
  margin: 0;
  color: #333;
`;

const ModeSelector = styled.div`
  display: flex;
  gap: 1rem;
`;

const ModeButton = styled.button`
  padding: 0.5rem 1rem;
  border: 2px solid ${props => props.selected ? '#4CAF50' : '#ddd'};
  background: ${props => props.selected ? '#E8F5E9' : '#fff'};
  border-radius: 4px;
  cursor: pointer;
  transition: all 0.3s;

  &:hover {
    transform: translateY(-2px);
  }
`;

const MainContent = styled.div`
  display: grid;
  grid-template-columns: 2fr 1fr;
  gap: 1rem;
  padding: 1rem;
  background: #fff;
  border-radius: 8px;
  box-shadow: 0 2px 4px rgba(0,0,0,0.1);
`;

const LevelSelection = styled.div`
  h2 {
    margin-top: 0;
  }
`;

const LevelGrid = styled.div`
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(200px, 1fr));
  gap: 1rem;
`;

const LevelButton = styled.button`
  padding: 1rem;
  border-radius: 8px;
  border: 2px solid ${props => props.color};
  background: ${props => `${props.color}20`};
  color: ${props => props.color};
  cursor: pointer;
  transition: all 0.3s;
  display: flex;
  flex-direction: column;
  align-items: center;

  &:hover {
    transform: translateY(-2px);
    background: ${props => `${props.color}30`};
  }
`;

const TeamManagement = styled.div`
  h2 {
    margin-top: 0;
  }
`;

const TeamList = styled.div`
  margin: 1rem 0;
`;

const TeamItem = styled.div`
  display: flex;
  justify-content: space-between;
  padding: 0.5rem;
  margin: 0.5rem 0;
  background: #f5f5f5;
  border-radius: 4px;
`;

const Controls = styled.div`
  grid-column: 1 / -1;
  display: flex;
  justify-content: center;
`;

const Button = styled.button`
  padding: 0.5rem 1rem;
  border: none;
  border-radius: 4px;
  background: #4CAF50;
  color: white;
  cursor: pointer;
  transition: all 0.3s;

  &:disabled {
    background: #ccc;
    cursor: not-allowed;
  }

  &:hover:not(:disabled) {
    background: #45a049;
  }
`;

const ScoreBoard = styled.div`
  padding: 1rem;
  background: #f5f5f5;
  border-radius: 8px;

  h2 {
    margin-top: 0;
  }
`;

const ScoreList = styled.div`
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(150px, 1fr));
  gap: 1rem;
`;

const ScoreItem = styled.div`
  display: flex;
  justify-content: space-between;
  padding: 0.5rem;
  background: white;
  border-radius: 4px;
  box-shadow: 0 1px 3px rgba(0,0,0,0.1);
`;

export default TeacherMode; 