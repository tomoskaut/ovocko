
import { SymbolData, SymbolType } from './types';

export const INITIAL_CASH = 10;
export const SPIN_COST = 2;

export const SYMBOLS: SymbolData[] = [
  { type: '🍇', chance: 0.195 },
  { type: '🍉', chance: 0.195 },
  { type: '🍒', chance: 0.195 },
  { type: '🍋', chance: 0.195 },
  { type: '🥃', chance: 0.18 },
  { type: '💀', chance: 0.04 },
];

export const FRUITS: SymbolType[] = ['🍇', '🍉', '🍒', '🍋'];

export const REEL_SPEED = 100; // ms between symbol changes
export const SPIN_DURATION = 1500; // ms total spin time

export const getRandomSymbol = (): SymbolType => {
  const rand = Math.random();
  let cumulative = 0;
  for (const sym of SYMBOLS) {
    cumulative += sym.chance;
    if (rand <= cumulative) return sym.type;
  }
  return SYMBOLS[0].type;
};
