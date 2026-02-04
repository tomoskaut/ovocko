
import React from 'react';

interface StatsDisplayProps {
  money: number;
  peakMoney: number;
  shots: number;
}

const StatsDisplay: React.FC<StatsDisplayProps> = ({ money, peakMoney, shots }) => {
  return (
    <div className="flex flex-col gap-4">
      {/* Current Balance - Main Panel */}
      <div className="bg-gray-900 border-2 border-green-500/50 p-5 rounded-2xl flex items-center justify-between gap-4 shadow-[0_0_15px_rgba(34,197,94,0.15)] bg-gradient-to-br from-gray-900 to-black">
        <div>
          <p className="text-[10px] font-black text-green-400 orbitron uppercase tracking-[0.2em] mb-1">Current Balance</p>
          <p className="text-4xl font-black text-white orbitron tracking-tighter">${money}</p>
        </div>
        <div className="text-green-500/30 text-4xl">
          <i className="fa-solid fa-wallet"></i>
        </div>
      </div>

      {/* Best Run Stats - Combined Table View */}
      <div className="bg-gray-900/50 border border-white/10 p-4 rounded-2xl overflow-hidden shadow-inner">
        <p className="text-[9px] font-black text-gray-500 orbitron uppercase tracking-[0.2em] mb-4 text-center">Current Run Score</p>
        <div className="grid grid-cols-2 divide-x divide-white/5">
          <div className="flex flex-col items-center">
            <span className="text-xs text-yellow-500/70 font-bold uppercase orbitron tracking-tighter mb-1">Peak $</span>
            <span className="text-2xl font-black orbitron text-white">${peakMoney}</span>
          </div>
          <div className="flex flex-col items-center">
            <span className="text-xs text-blue-500/70 font-bold uppercase orbitron tracking-tighter mb-1">Shots</span>
            <div className="flex items-center">
              <span className="text-2xl font-black orbitron text-white">{shots}</span>
              <span className="text-base ml-1">🥃</span>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default StatsDisplay;
