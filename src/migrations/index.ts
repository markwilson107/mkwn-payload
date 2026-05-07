import * as migration_20260507_061502 from './20260507_061502';

export const migrations = [
  {
    up: migration_20260507_061502.up,
    down: migration_20260507_061502.down,
    name: '20260507_061502'
  },
];
