
import React from 'react';
import { HighScore } from '../types';

interface LeaderboardProps {
  history: HighScore[];
}

const Leaderboard: React.FC<LeaderboardProps> = ({ history }) => {
  return (
    <div className="bg-gray-900/80 p-6 rounded-2xl border border-purple-500/30 flex-grow shadow-[0_0_20px_rgba(168,85,247,0.1)]">
      <h3 className="orbitron text-xl text-purple-400 mb-6 flex items-center gap-2 uppercase tracking-widest">
        <i className="fa-solid fa-trophy text-yellow-500"></i>
        Hall of Fame
      </h3>
      
      {history.length === 0 ? (
        <p className="text-gray-500 text-sm italic text-center py-4">No records yet. Be the first!</p>
      ) : (
        <div className="w-full">
          {/* Table Header */}
          <div className="grid grid-cols-12 gap-2 text-[10px] uppercase font-black text-gray-500 border-b border-white/10 pb-2 mb-2 px-2 orbitron tracking-tighter">
            <div className="col-span-2">Rank</div>
            <div className="col-span-4">Player</div>
            <div className="col-span-6 text-right pr-4">Score ($ | 🥃)</div>
          </div>
          
          <div className="space-y-2">
            {history.map((entry, idx) => (
              <div key={idx} className="grid grid-cols-12 gap-2 items-center p-2 bg-black/40 rounded-lg border border-white/5 hover:bg-black/60 transition-colors">
                <div className="col-span-2 font-black orbitron text-gray-400">
                  <span className={idx < 3 ? 'text-yellow-500' : ''}>#{idx + 1}</span>
                </div>
                
                <div className="col-span-4">
                  <span className="font-bold text-gray-200 truncate block text-xs">{entry.name}</span>
                </div>
                
                <div className="col-span-6 flex justify-end items-center gap-3">
                  <div className="flex items-center gap-1 min-w-[40px] justify-end">
                    <span className="text-green-400 font-black orbitron text-sm">${entry.money}</span>
                  </div>
                  <div className="h-4 w-px bg-white/10"></div>
                  <div className="flex items-center gap-1 min-w-[30px] justify-end">
                    <span className="text-blue-400 font-black orbitron text-sm">{entry.shots ?? 0}</span>
                    <span className="text-[10px]">🥃</span>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      )}
    </div>
  );
};

export default Leaderboard;
