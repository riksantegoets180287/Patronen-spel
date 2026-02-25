
import { Level } from './types';
import { DEFAULT_LEVELS } from './constants';

const LEVELS_KEY = 'summa_patroonslots_levels_v1';

export const getLevels = (): Level[] => {
  const stored = localStorage.getItem(LEVELS_KEY);
  if (stored) {
    try {
      return JSON.parse(stored);
    } catch (e) {
      return DEFAULT_LEVELS;
    }
  }
  return DEFAULT_LEVELS;
};

export const saveLevels = (levels: Level[]) => {
  localStorage.setItem(LEVELS_KEY, JSON.stringify(levels));
};

export const resetLevels = () => {
  localStorage.removeItem(LEVELS_KEY);
};
