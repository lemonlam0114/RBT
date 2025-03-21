import { symbolImages } from '../assets/images/symbols';

export const difficultySettings = {
  mudah: {
    timeMultiplier: 1.5,
    symbolSize: 'large',
    scoreMultiplier: 1
  },
  sederhana: {
    timeMultiplier: 1.0,
    symbolSize: 'medium',
    scoreMultiplier: 1.5
  },
  sukar: {
    timeMultiplier: 0.7,
    symbolSize: 'small',
    scoreMultiplier: 2
  }
};

export const levelConfig = {
  1: {
    symbols: [
      {
        id: 'noFire',
        name: 'Dilarang Merokok',
        meaning: 'Kawasan larangan merokok',
        image: symbolImages.red.noFire,
        category: 'red',
        isTarget: true
      },
      {
        id: 'noTouch',
        name: 'Jangan Sentuh',
        meaning: 'Dilarang menyentuh peralatan',
        image: symbolImages.red.noTouch,
        category: 'red',
        isTarget: true
      },
      {
        id: 'fireExtinguisher',
        name: 'Alat Pemadam Api',
        meaning: 'Lokasi alat pemadam api',
        image: symbolImages.red.fireExtinguisher,
        category: 'red',
        isTarget: true
      },
      {
        id: 'noWater',
        name: 'Dilarang Menggunakan Air',
        meaning: 'Dilarang memadamkan api dengan air',
        image: symbolImages.red.noWater,
        category: 'red',
        isTarget: true
      },
      {
        id: 'fireAlarm',
        name: 'Penggera Kebakaran',
        meaning: 'Lokasi penggera kebakaran',
        image: symbolImages.red.fireAlarm,
        category: 'red',
        isTarget: true
      },
      {
        id: 'noEntry',
        name: 'Dilarang Masuk',
        meaning: 'Dilarang memasuki kawasan ini',
        image: symbolImages.red.noEntry,
        category: 'red',
        isTarget: true
      },
      {
        id: 'emergencyExit',
        name: 'Pintu Kecemasan',
        meaning: 'Pintu keluar kecemasan',
        image: symbolImages.red.emergencyExit,
        category: 'red',
        isTarget: true
      }
    ]
  },
  2: {
    difficulty: 'sederhana',
    color: 'yellow',
    symbols: [
      {
        id: 'yellow-electric-2',
        name: 'Awas Kejutan Elektrik',
        image: symbolImages.yellow.electricWarning,
        category: 'yellow',
        position: { x: 60, y: 45 },
        meaning: 'Bahaya kejutan elektrik di kawasan ini'
      },
      {
        id: 'yellow-hot-2',
        name: 'Awas Permukaan Panas',
        image: symbolImages.yellow.hotSurface,
        category: 'yellow',
        position: { x: 40, y: 30 },
        meaning: 'Permukaan panas, berhati-hati'
      },
      {
        id: 'yellow-toxic-2',
        name: 'Amaran Bahan Toksik',
        image: symbolImages.yellow.toxicWarning,
        category: 'yellow',
        position: { x: 75, y: 55 },
        meaning: 'Bahan toksik, gunakan perlindungan'
      }
    ]
  },
  3: {
    difficulty: 'sederhana',
    color: 'green',
    symbols: [
      {
        id: 'green-firstaid-3',
        name: 'Peti Pertolongan Cemas',
        image: symbolImages.green.firstAid,
        category: 'green',
        position: { x: 10, y: 75 },
        meaning: 'Lokasi peti pertolongan cemas'
      },
      {
        id: 'green-assembly-3',
        name: 'Tempat Berkumpul',
        image: symbolImages.green.assemblyPoint,
        category: 'green',
        position: { x: 5, y: 90 },
        meaning: 'Tempat berkumpul semasa kecemasan'
      },
      {
        id: 'green-emergency-exit-3',
        name: 'Pintu Kecemasan',
        image: symbolImages.green.emergencyExit,
        category: 'green',
        position: { x: 95, y: 85 },
        meaning: 'Pintu keluar kecemasan'
      }
    ]
  },
  4: {
    difficulty: 'sukar',
    color: 'blue',
    symbols: [
      {
        id: 'blue-eye-4',
        name: 'Wajib Pakai Cermin Mata Keselamatan',
        image: symbolImages.blue.eyeProtection,
        category: 'blue',
        position: { x: 25, y: 40 },
        meaning: 'Mesti memakai cermin mata keselamatan'
      },
      {
        id: 'blue-ear-4',
        name: 'Wajib Pakai Pelindung Telinga',
        image: symbolImages.blue.earProtection,
        category: 'blue',
        position: { x: 55, y: 35 },
        meaning: 'Mesti memakai pelindung telinga'
      }
    ]
  },
  5: {
    difficulty: 'sukar',
    color: 'white',
    symbols: [
      {
        id: 'white-info-5',
        name: 'Tanda Maklumat',
        image: symbolImages.white.info,
        category: 'white',
        position: { x: 20, y: 15 },
        meaning: 'Maklumat penting'
      }
    ]
  }
};

export const rewardSystem = {
  achievements: {
    speedMaster: "快速完成",
    perfectScore: "满分通关",
    noHints: "无提示完成",
    allLevels: "全关卡通关"
  },
  
  leaderboard: {
    easy: [],
    normal: [],
    hard: [],
    byLevel: {
      red: [],
      yellow: [],
      green: [],
      blue: [],
      white: []
    }
  }
}; 