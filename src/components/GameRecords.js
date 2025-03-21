import React, { useState, useEffect } from 'react';
import styled from 'styled-components';
import { getGameRecords, getLeaderboard } from '../db/gameDB';
import { useNavigate } from 'react-router-dom';

const RecordsContainer = styled.div`
  padding: 20px;
  max-width: 800px;
  margin: 0 auto;
`;

const TabContainer = styled.div`
  display: flex;
  margin-bottom: 20px;
  border-bottom: 2px solid #eee;
`;

const Tab = styled.button`
  padding: 10px 20px;
  border: none;
  background: none;
  cursor: pointer;
  font-size: 16px;
  color: ${props => props.active ? '#1a73e8' : '#666'};
  border-bottom: ${props => props.active ? '2px solid #1a73e8' : 'none'};
  margin-bottom: -2px;

  &:hover {
    color: #1a73e8;
  }
`;

const Table = styled.table`
  width: 100%;
  border-collapse: collapse;
  margin-top: 20px;
`;

const Th = styled.th`
  text-align: left;
  padding: 12px;
  background-color: #f5f5f5;
  border-bottom: 2px solid #ddd;
`;

const Td = styled.td`
  padding: 12px;
  border-bottom: 1px solid #ddd;
`;

const DifficultySelect = styled.select`
  padding: 8px;
  margin-left: 20px;
  border: 1px solid #ddd;
  border-radius: 4px;
`;

const GameRecords = () => {
  const [activeTab, setActiveTab] = useState('records');
  const [records, setRecords] = useState([]);
  const [leaderboard, setLeaderboard] = useState([]);
  const [selectedDifficulty, setSelectedDifficulty] = useState('all');
  const navigate = useNavigate();

  useEffect(() => {
    loadData();
  }, [selectedDifficulty]);

  const loadData = async () => {
    try {
      if (activeTab === 'records') {
        const gameRecords = await getGameRecords();
        setRecords(gameRecords.filter(record => 
          selectedDifficulty === 'all' || record.difficulty === selectedDifficulty
        ));
      } else {
        const leaderboardData = await getLeaderboard(
          selectedDifficulty === 'all' ? null : selectedDifficulty
        );
        setLeaderboard(leaderboardData);
      }
    } catch (error) {
      console.error('加载数据失败:', error);
    }
  };

  const handleTabChange = (tab) => {
    setActiveTab(tab);
    loadData();
  };

  const formatDate = (dateString) => {
    return new Date(dateString).toLocaleString('zh-CN');
  };

  const getLevelColor = (level) => {
    switch (level) {
      case 1: return '#ff4444'; // red
      case 2: return '#ffbb33'; // yellow
      case 3: return '#00C851'; // green
      case 4: return '#3366cc'; // blue
      case 5: return '#ffffff'; // white
      default: return '#ddd';
    }
  };

  return (
    <RecordsContainer>
      <Header>
        <Title>Rekod Permainan</Title>
        <BackButton onClick={() => navigate('/')}>Kembali ke Menu</BackButton>
      </Header>

      <TabContainer>
        <Tab 
          active={activeTab === 'records'} 
          onClick={() => handleTabChange('records')}
        >
          Rekod Permainan
        </Tab>
        <Tab 
          active={activeTab === 'leaderboard'} 
          onClick={() => handleTabChange('leaderboard')}
        >
          Carta Kedudukan
        </Tab>
        <DifficultySelect 
          value={selectedDifficulty}
          onChange={(e) => setSelectedDifficulty(e.target.value)}
        >
          <option value="all">Semua Tahap</option>
          <option value="mudah">Mudah</option>
          <option value="sederhana">Sederhana</option>
          <option value="sukar">Sukar</option>
        </DifficultySelect>
      </TabContainer>

      {activeTab === 'records' ? (
        <Table>
          <thead>
            <tr>
              <Th>Pemain</Th>
              <Th>Tahap</Th>
              <Th>Skor</Th>
              <Th>Masa</Th>
            </tr>
          </thead>
          <tbody>
            {records.map((record) => (
              <tr key={record.id}>
                <Td>{record.playerName}</Td>
                <Td>
                  {record.difficulty === 'mudah' && 'Mudah'}
                  {record.difficulty === 'sederhana' && 'Sederhana'}
                  {record.difficulty === 'sukar' && 'Sukar'}
                </Td>
                <Td>{record.score}</Td>
                <Td>{formatDate(record.timestamp)}</Td>
              </tr>
            ))}
          </tbody>
        </Table>
      ) : (
        <Table>
          <thead>
            <tr>
              <Th>Kedudukan</Th>
              <Th>Pemain</Th>
              <Th>Tahap</Th>
              <Th>Skor</Th>
            </tr>
          </thead>
          <tbody>
            {leaderboard.map((entry, index) => (
              <tr key={entry.id}>
                <Td>{index + 1}</Td>
                <Td>{entry.playerName}</Td>
                <Td>
                  {entry.difficulty === 'mudah' && 'Mudah'}
                  {entry.difficulty === 'sederhana' && 'Sederhana'}
                  {entry.difficulty === 'sukar' && 'Sukar'}
                </Td>
                <Td>{entry.score}</Td>
              </tr>
            ))}
          </tbody>
        </Table>
      )}
    </RecordsContainer>
  );
};

const Header = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin-bottom: 20px;
`;

const Title = styled.h1`
  color: #333;
  margin: 0;
`;

const BackButton = styled.button`
  padding: 10px 20px;
  background: #4CAF50;
  color: white;
  border: none;
  border-radius: 4px;
  cursor: pointer;
  font-size: 1em;

  &:hover {
    background: #45a049;
  }
`;

export default GameRecords; 