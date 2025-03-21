// 红色标识
import noFire from './red/no-fire.png';
import noTouch from './red/no-touch.png';
import noWater from './red/no-water.png';
import fireExtinguisher from './red/fire-extinguisher.png';
import fireAlarm from './red/fire-alarm.png';
import noEntry from './red/no-entry.png';
import emergencyExit from './red/emergency-exit.png';

// 黄色标识
import electricWarning from './yellow/electric-warning.png';
import hotSurface from './yellow/hot-surface.png';
import toxicWarning from './yellow/toxic-warning.png';

// 绿色标识
import firstAid from './green/first-aid.png';
import assemblyPoint from './green/assembly-point.png';
import emergencyExitGreen from './green/emergency-exit.png';

// 蓝色标识
import eyeProtection from './blue/eye-protection.png';
import earProtection from './blue/ear-protection.png';

// 白色标识
import info from './white/info.png';

export const symbolImages = {
  red: {
    noFire,
    noTouch,
    noWater,
    fireExtinguisher,
    fireAlarm,
    noEntry,
    emergencyExit
  },
  yellow: {
    electricWarning,
    hotSurface,
    toxicWarning
  },
  green: {
    firstAid,
    assemblyPoint,
    emergencyExit: emergencyExitGreen
  },
  blue: {
    eyeProtection,
    earProtection
  },
  white: {
    info
  }
}; 