
import React, { useState } from 'react';

interface GameOverModalProps {
  peakMoney: number;
  shots: number;
  onSave: (name: string) => void;
}

const GameOverModal: React.FC<GameOverModalProps> = ({ peakMoney, shots, onSave }) => {
  const [name, setName] = useState('');

  return (
    <div className="fixed inset-0 z-[60] flex items-center justify-center p-4 bg-black/95">
      <div className="max-w-md w-full bg-gray-900 border-4 border-red-600 p-8 rounded-3xl text-center shadow-[0_0_60px_rgba(220,38,38,0.5)]">
        <h2 className="orbitron text-5xl font-black text-red-600 mb-2">GAME OVER</h2>
        <p className="text-gray-400 mb-8 font-bold uppercase tracking-widest text-xs">Run Finished!</p>

        <div className="mb-8 p-6 bg-black/50 rounded-2xl border border-white/5 shadow-inner">
          <p className="text-gray-500 text-[10px] mb-4 uppercase font-black orbitron tracking-[0.2em]">RUN SCORE</p>
          <div className="flex justify-center items-center gap-12">
            <div className="flex flex-col items-center">
              <span className="text-5xl font-black orbitron text-green-400 drop-shadow-[0_0_10px_rgba(74,222,128,0.3)]">${peakMoney}</span>
              <span className="text-[9px] text-gray-600 font-bold uppercase mt-1">Peak Cash</span>
            </div>
            <div className="w-px h-12 bg-white/10"></div>
            <div className="flex flex-col items-center">
              <div className="flex items-center">
                <span className="text-5xl font-black orbitron text-blue-400 drop-shadow-[0_0_10px_rgba(96,165,250,0.3)]">{shots}</span>
                <span className="text-2xl ml-1">🥃</span>
              </div>
              <span className="text-[9px] text-gray-600 font-bold uppercase mt-1">Total Shots</span>
            </div>
          </div>
        </div>

        <div className="space-y-4">
          <label className="block text-left text-[10px] font-black text-gray-500 uppercase orbitron tracking-widest ml-1">
            Enter Nickname
          </label>
          <input 
            type="text" 
            maxLength={12}
            value={name}
            onChange={(e) => setName(e.target.value)}
            placeholder="PARTY ANIMAL"
            className="w-full bg-black border-2 border-red-600/50 p-4 rounded-xl text-white font-bold orbitron focus:border-red-500 outline-none placeholder:text-gray-800 transition-all"
          />
          <button 
            onClick={() => onSave(name)}
            className="w-full bg-red-600 hover:bg-red-500 text-white font-black orbitron py-4 rounded-xl shadow-lg transition-all active:scale-95 text-lg"
          >
            SAVE HIGH SCORE
          </button>
        </div>
      </div>
    </div>
  );
};

export default GameOverModal;
