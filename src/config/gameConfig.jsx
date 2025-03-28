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
      },
    ]
  },
  2: {
    symbols: [
      {
        id: 'yellow-electric',
        name: 'Awas Kejutan Elektrik',
        meaning: 'Bahaya kejutan elektrik di kawasan ini',
        image: symbolImages.yellow.electricWarning,
        category: 'yellow',
        isTarget: true
      },
      {
        id: 'yellow-hot',
        name: 'Awas Permukaan Panas',
        meaning: 'Permukaan panas, berhati-hati',
        image: symbolImages.yellow.hotSurface,
        category: 'yellow',
        isTarget: true
      },
      {
        id: 'yellow-toxic',
        name: 'Amaran Bahan Toksik',
        meaning: 'Bahan toksik, gunakan perlindungan',
        image: symbolImages.yellow.toxicWarning,
        category: 'yellow',
        isTarget: true
      }
    ]
  },
  3: {
    symbols: [
      {
        id: 'green-firstaid',
        name: 'Peti Pertolongan Cemas',
        meaning: 'Lokasi peti pertolongan cemas',
        image: symbolImages.green.firstAid,
        category: 'green',
        isTarget: true
      },
      {
        id: 'green-assembly',
        name: 'Tempat Berkumpul',
        meaning: 'Tempat berkumpul semasa kecemasan',
        image: symbolImages.green.assemblyPoint,
        category: 'green',
        isTarget: true
      },
      {
        id: 'green-emergency-exit',
        name: 'Pintu Kecemasan',
        meaning: 'Laluan keluar kecemasan',
        image: symbolImages.green.emergencyExit,
        category: 'green',
        isTarget: true
      }
    ]
  },
  4: {
    symbols: [
      {
        id: 'blue-eye',
        name: 'Wajib Pakai Cermin Mata Keselamatan',
        meaning: 'Mesti memakai cermin mata keselamatan',
        image: symbolImages.blue.eyeProtection,
        category: 'blue',
        isTarget: true
      },
      {
        id: 'blue-ear',
        name: 'Wajib Pakai Pelindung Telinga',
        meaning: 'Mesti memakai pelindung telinga',
        image: symbolImages.blue.earProtection,
        category: 'blue',
        isTarget: true
      }
    ]
  },
  5: {
    symbols: [
      {
        id: 'white-info',
        name: 'Tanda Maklumat',
        meaning: 'Maklumat penting',
        image: symbolImages.white.info,
        category: 'white',
        isTarget: true
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