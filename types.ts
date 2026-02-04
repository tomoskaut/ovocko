
export type SymbolType = '🍇' | '🍉' | '🍒' | '🍋' | '🥃' | '💀';

export interface SymbolData {
  type: SymbolType;
  chance: number;
}

export interface WinResult {
  money: number;
  shotsPlayer: number;
  shotsEveryone: number;
  messages: string[];
}

export interface HighScore {
  name: string;
  money: number; // This will represent peak money reached
  shots: number;
  date: string;
}

export interface GameState {
  grid: SymbolType[][];
  spinning: boolean;
  money: number;
  peakMoney: number; // Track the highest amount reached in the run
  shotsTaken: number;
  lastWin: WinResult | null;
  history: HighScore[];
  isGameOver: boolean;
}
