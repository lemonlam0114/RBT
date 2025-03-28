// 初始化 IndexedDB 数据库
const dbName = 'gameRecordsDB';
const dbVersion = 1;

// 打开数据库连接
export const openDB = () => {
  return new Promise((resolve, reject) => {
    const request = indexedDB.open(dbName, dbVersion);

    request.onerror = (event) => {
      console.error('数据库错误:', event.target.error);
      reject(event.target.error);
    };

    request.onsuccess = (event) => {
      const db = event.target.result;
      resolve(db);
    };

    request.onupgradeneeded = (event) => {
      const db = event.target.result;

      // 创建游戏记录存储
      if (!db.objectStoreNames.contains('gameRecords')) {
        const gameRecordsStore = db.createObjectStore('gameRecords', { keyPath: 'id', autoIncrement: true });
        gameRecordsStore.createIndex('playerName', 'playerName', { unique: false });
        gameRecordsStore.createIndex('difficulty', 'difficulty', { unique: false });
        gameRecordsStore.createIndex('score', 'score', { unique: false });
        gameRecordsStore.createIndex('timestamp', 'timestamp', { unique: false });
      }

      // 创建排行榜存储
      if (!db.objectStoreNames.contains('leaderboard')) {
        const leaderboardStore = db.createObjectStore('leaderboard', { keyPath: 'id', autoIncrement: true });
        leaderboardStore.createIndex('playerName', 'playerName', { unique: false });
        leaderboardStore.createIndex('difficulty', 'difficulty', { unique: false });
        leaderboardStore.createIndex('score', 'score', { unique: false });
      }
    };
  });
};

// 保存游戏记录
export const saveGameRecord = async (record) => {
  const db = await openDB();
  return new Promise((resolve, reject) => {
    const transaction = db.transaction(['gameRecords', 'leaderboard'], 'readwrite');
    const gameRecordsStore = transaction.objectStore('gameRecords');
    const leaderboardStore = transaction.objectStore('leaderboard');

    // 添加到游戏记录
    const recordRequest = gameRecordsStore.add({
      ...record,
      timestamp: new Date().toISOString()
    });

    recordRequest.onsuccess = () => {
      // 检查是否需要更新排行榜
      const leaderboardRequest = leaderboardStore.index('difficulty').getAll(record.difficulty);
      
      leaderboardRequest.onsuccess = () => {
        const scores = leaderboardRequest.result;
        scores.push(record);
        scores.sort((a, b) => b.score - a.score);
        
        // 只保留前10名
        if (scores.length > 10) {
          scores.length = 10;
        }
        
        // 清空当前难度的排行榜
        const clearRequest = leaderboardStore.index('difficulty').openKeyCursor(record.difficulty);
        clearRequest.onsuccess = (event) => {
          const cursor = event.target.result;
          if (cursor) {
            leaderboardStore.delete(cursor.primaryKey);
            cursor.continue();
          } else {
            // 添加新的排行榜数据
            scores.forEach(score => {
              leaderboardStore.add(score);
            });
          }
        };
      };
    };

    transaction.oncomplete = () => {
      resolve();
    };

    transaction.onerror = (event) => {
      reject(event.target.error);
    };
  });
};

// 获取游戏记录
export const getGameRecords = async () => {
  const db = await openDB();
  return new Promise((resolve, reject) => {
    const transaction = db.transaction(['gameRecords'], 'readonly');
    const store = transaction.objectStore('gameRecords');
    const request = store.getAll();

    request.onsuccess = () => {
      resolve(request.result);
    };

    request.onerror = (event) => {
      reject(event.target.error);
    };
  });
};

// 获取排行榜
export const getLeaderboard = async (difficulty) => {
  const db = await openDB();
  return new Promise((resolve, reject) => {
    const transaction = db.transaction(['leaderboard'], 'readonly');
    const store = transaction.objectStore('leaderboard');
    const request = difficulty 
      ? store.index('difficulty').getAll(difficulty)
      : store.getAll();

    request.onsuccess = () => {
      const results = request.result;
      results.sort((a, b) => b.score - a.score);
      resolve(results);
    };

    request.onerror = (event) => {
      reject(event.target.error);
    };
  });
}; 