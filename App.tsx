
import React, { useState, useEffect, useCallback, useRef } from 'react';
import { 
  SymbolType, 
  WinResult, 
  HighScore, 
  GameState 
} from './types';
import { 
  INITIAL_CASH, 
  SPIN_COST, 
  getRandomSymbol, 
  FRUITS, 
  SPIN_DURATION 
} from './constants';
import SlotGrid from './components/SlotGrid';
import StatsDisplay from './components/StatsDisplay';
import Leaderboard from './components/Leaderboard';
import WinModal from './components/WinModal';
import GameOverModal from './components/GameOverModal';

const App: React.FC = () => {
  const [state, setState] = useState<GameState>({
    grid: Array(3).fill(null).map(() => Array(3).fill('🍒')),
    spinning: false,
    money: INITIAL_CASH,
    peakMoney: INITIAL_CASH,
    shotsTaken: 0,
    lastWin: null,
    history: JSON.parse(localStorage.getItem('party_slots_leaderboard') || '[]'),
    isGameOver: false,
  });

  const [showWinModal, setShowWinModal] = useState(false);

  // Check for winning combinations
  const checkWins = (grid: SymbolType[][]): WinResult => {
    let money = 0;
    let shotsPlayer = 0;
    let shotsEveryone = 0;
    const messages: string[] = [];

    const lines = [
      { type: 'row', index: 0, cells: [grid[0][0], grid[0][1], grid[0][2]] },
      { type: 'row', index: 1, cells: [grid[1][0], grid[1][1], grid[1][2]] },
      { type: 'row', index: 2, cells: [grid[2][0], grid[2][1], grid[2][2]] },
      { type: 'diag', index: 0, cells: [grid[0][0], grid[1][1], grid[2][2]] }, // Top-left to bottom-right
      { type: 'diag', index: 1, cells: [grid[0][2], grid[1][1], grid[2][0]] }, // Top-right to bottom-left
    ];

    lines.forEach(line => {
      const { cells, type, index } = line;

      // 1. Check for Jackpot (3x Skull)
      if (cells.every(c => c === '💀')) {
        money += 50;
        messages.push("JACKPOT! $50 won!");
        return;
      }

      // 2. Check for Shots (3x 🥃 OR mixture with 💀)
      if (cells.every(c => c === '🥃' || c === '💀')) {
        if (type === 'row') {
          shotsPlayer += 1;
          messages.push("SHOT! Player drinks!");
        } else {
          shotsEveryone += 1;
          messages.push("PARTY SHOT! Everyone drinks!");
        }
        return;
      }

      // 3. Check for Fruit Wins (with Wilds)
      for (const fruit of FRUITS) {
        const isValid = cells.every(c => c === fruit || c === '💀');
        if (isValid) {
          let winAmount = 0;
          if (type === 'row') {
            if (index === 0 || index === 2) winAmount = 2;
            if (index === 1) winAmount = 6;
          } else {
            winAmount = 15;
          }
          money += winAmount;
          messages.push(`Line win! $${winAmount} with ${fruit}`);
          break;
        }
      }
    });

    return { money, shotsPlayer, shotsEveryone, messages };
  };

  const handleSpin = useCallback(() => {
    if (state.spinning || state.money < SPIN_COST) return;

    setState(prev => ({ 
      ...prev, 
      spinning: true, 
      money: prev.money - SPIN_COST,
      lastWin: null 
    }));

    setTimeout(() => {
      const newGrid = Array(3).fill(null).map(() => 
        Array(3).fill(null).map(() => getRandomSymbol())
      );
      
      const results = checkWins(newGrid);
      
      setState(prev => {
        const newMoney = prev.money + results.money;
        const newShots = prev.shotsTaken + results.shotsPlayer + results.shotsEveryone;
        const newPeak = Math.max(prev.peakMoney, newMoney);
        
        return {
          ...prev,
          grid: newGrid,
          spinning: false,
          money: newMoney,
          peakMoney: newPeak,
          shotsTaken: newShots,
          lastWin: results,
          isGameOver: newMoney < SPIN_COST && !results.money
        };
      });

      if (results.messages.length > 0) {
        setShowWinModal(true);
      }
    }, SPIN_DURATION);
  }, [state.spinning, state.money]);

  const saveHighScore = (name: string) => {
    const newEntry: HighScore = {
      name: name || "Anonymous",
      money: state.peakMoney, // Use peak money achieved
      shots: state.shotsTaken,
      date: new Date().toLocaleDateString(),
    };
    const updated = [...state.history, newEntry]
      .sort((a, b) => b.money - a.money)
      .slice(0, 10);
    
    setState(prev => ({ 
      ...prev, 
      history: updated, 
      isGameOver: false, 
      money: INITIAL_CASH, 
      peakMoney: INITIAL_CASH, 
      shotsTaken: 0 
    }));
    localStorage.setItem('party_slots_leaderboard', JSON.stringify(updated));
  };

  return (
    <div className="min-h-screen bg-black text-white p-4 md:p-8 flex flex-col items-center">
      <header className="mb-8 text-center">
        <h1 className="orbitron text-4xl md:text-6xl font-black neon-text-pink tracking-widest mb-2">
          PARTY SLOTS
        </h1>
        <p className="text-cyan-400 font-bold tracking-widest uppercase">High Stakes Drinking Game</p>
      </header>

      <div className="w-full max-w-6xl grid grid-cols-1 lg:grid-cols-3 gap-8">
        <div className="order-2 lg:order-1 flex flex-col gap-4">
          <StatsDisplay money={state.money} peakMoney={state.peakMoney} shots={state.shotsTaken} />
          <Leaderboard history={state.history} />
        </div>

        <div className="order-1 lg:order-2 flex flex-col items-center gap-6">
          <SlotGrid grid={state.grid} spinning={state.spinning} />
          
          <button
            onClick={handleSpin}
            disabled={state.spinning || state.money < SPIN_COST}
            className={`
              orbitron text-2xl px-12 py-4 rounded-full font-bold transition-all transform active:scale-95
              ${state.spinning || state.money < SPIN_COST
                ? 'bg-gray-800 text-gray-500 cursor-not-allowed border-gray-700'
                : 'bg-gradient-to-r from-pink-600 to-purple-700 hover:from-pink-500 hover:to-purple-600 border-2 border-pink-400 shadow-[0_0_20px_rgba(236,72,153,0.6)]'}
            `}
          >
            {state.spinning ? 'SPINNING...' : `SPIN ($${SPIN_COST})`}
          </button>
          
          {state.money < SPIN_COST && !state.spinning && (
            <p className="text-red-500 animate-pulse font-bold orbitron">OUT OF CASH!</p>
          )}
        </div>

        <div className="order-3 bg-gray-900/50 p-6 rounded-2xl border border-pink-500/30 backdrop-blur-sm h-fit">
          <h2 className="orbitron text-xl text-pink-500 mb-4 border-b border-pink-500/30 pb-2">RULES</h2>
          <ul className="space-y-3 text-sm text-gray-300">
            <li><span className="text-pink-400 font-bold">🍇🍉🍒🍋</span> 3x Row 1/3: <span className="text-green-400">$2</span></li>
            <li><span className="text-pink-400 font-bold">🍇🍉🍒🍋</span> 3x Row 2: <span className="text-green-400">$6</span></li>
            <li><span className="text-pink-400 font-bold">🍇🍉🍒🍋</span> 3x Diagonals: <span className="text-green-400">$15</span></li>
            <li><span className="text-pink-400 font-bold">💀</span> Substitutes for ANY fruit or shot!</li>
            <li><span className="text-yellow-400 font-bold">💀💀💀</span> JACKPOT: <span className="text-yellow-400 font-bold">$50</span></li>
            <li><span className="text-blue-400 font-bold">🥃</span> or <span className="text-blue-400 font-bold">🥃+💀</span> Horizontal: <span className="text-blue-400">YOU DRINK</span></li>
            <li><span className="text-blue-400 font-bold">🥃</span> or <span className="text-blue-400 font-bold">🥃+💀</span> Diagonal: <span className="text-blue-400">EVERYONE DRINKS</span></li>
          </ul>
        </div>
      </div>

      {showWinModal && state.lastWin && (
        <WinModal 
          results={state.lastWin} 
          onClose={() => setShowWinModal(false)} 
        />
      )}

      {state.isGameOver && (
        <GameOverModal 
          peakMoney={state.peakMoney} 
          shots={state.shotsTaken}
          onSave={saveHighScore} 
        />
      )}
    </div>
  );
};

export default App;
